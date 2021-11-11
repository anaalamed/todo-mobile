import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components/native';
import { getFirestore, collection, updateDoc, doc } from "firebase/firestore";
import { FontAwesome } from '@expo/vector-icons';

import { updateTodo } from '../../state/slices/todos.slice';
import { RootState } from '../../state/root.reducer';
import { updateTodoFunc } from '../../initializeApp'
import { Modal, View } from 'react-native';
import { ButtonForm, ButtonFormText, Input, InputContainer, InputIcon, Row, StyledText, Title } from '../../constants/StyledComponents';
import { Todo } from '../../types';


interface Props {
  isModalVisible: boolean
  setModalVisible(boolean): void
  setMenuVisible(boolean): void
  todo: Todo
}

const ModalUpdateTodo: React.FC<Props> = ({ setModalVisible, setMenuVisible, isModalVisible, todo }) => {
  const [title, setTitle] = useState(todo.title || '');
  const [description, setDescription] = useState(todo.description || '');
  const [isUrgent, setUrgent] = useState(todo.important);

  const { me } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  let handleUpdate = async () => {

    updateTodoFunc({ id: todo.id, title: title, description: description, important: isUrgent })
      .then(res => {
        const updatedTodo = res.data;
        dispatch(updateTodo(updatedTodo))
        setModalVisible(false);
        setMenuVisible(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // prevent warning - Can't perform a React state update on an unmounted component. 
  useEffect(() => {
    return () => {
      handleUpdate
    }
  }, [])



  return (
    <View >
      <Modal
        visible={isModalVisible}
        transparent={true}
      >
        <WrapperModal >
          <ModalView >
            <Title>Update todo: "{todo.title}"?</Title>
            <Box>
              <InputContainer>
                <InputIcon name='plus' />
                <Input
                  placeholder="Title"
                  onChangeText={text => setTitle(text)}
                  defaultValue={todo.title}
                />
              </InputContainer>

              <InputContainer>
                <InputIcon name='comment' />
                <Input
                  placeholder="Description"
                  onChangeText={text => setDescription(text)}
                  defaultValue={todo.description}
                />
              </InputContainer>

              <Row style={{ justifyContent: "flex-start" }}>
                <IsImportantBox onPress={() => setUrgent(!isUrgent)}>
                  {isUrgent ? (<BtnText><FontAwesome name='check' /> </BtnText>) : null}
                </IsImportantBox>
                <StyledText style={{ color: "greenyellow", fontSize: 18, marginTop: 10 }}>Important</StyledText>
              </Row>
            </Box>

            <Buttons>
              <ButtonForm style={{ width: 90 }} onPress={() => { setModalVisible(false), setMenuVisible(false) }} ><ButtonFormText>Cancel</ButtonFormText></ButtonForm>
              <ButtonForm style={{ width: 90 }} onPress={handleUpdate} ><ButtonFormText>Update</ButtonFormText></ButtonForm>
            </Buttons>

          </ModalView>
        </WrapperModal>
      </Modal>
    </View >
  );
}

export default ModalUpdateTodo;


const Box = styled.View`
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
`;

const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const WrapperModal = styled.View`
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
`;

const ModalView = styled.View`
  /* flex: 1; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: navy;
  padding: 20px;
  margin: 50px;
  margin-top: 150;
  margin-bottom: 150;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;
`;

const IsImportantBox = styled.TouchableOpacity`
  background: ${props => (props.done ? "lightgreen" : "white")};
  width: 30px;
  height: 20px;
  margin: 12px;
  /* margin-left: 10px; */
  align-self: flex-start;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;
`;

const BtnText = styled.Text`
  color: navy;
  font-weight: bold;
  text-align: center;
`;