import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components/native';
import { getFirestore, collection, updateDoc, doc } from "firebase/firestore";
import { FontAwesome } from '@expo/vector-icons';

import { updateTodo } from '../../state/slices/todos.slice';
import { RootState } from '../../state/root.reducer';
import { updateTodoFunc } from '../../initializeApp'
import { Modal, View } from 'react-native';
import { ButtonForm, ButtonFormText, Buttons, Input, InputContainer, InputIcon, ModalView, Row, StyledText, Title, WrapperModal } from '../../constants/StyledComponents';
import { Todo } from '../../types';
import ChooseColor from './ChooseColor';


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
  const [color, setColor] = useState(todo.color);

  const { me } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  let handleUpdate = async () => {

    updateTodoFunc({ id: todo.id, title: title, description: description, important: isUrgent, color: color })
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

            <ChooseColor setColor={setColor} currentColor={color}></ChooseColor>

            <Buttons>
              <ButtonForm style={{ width: 90, backgroundColor: "grey" }} onPress={() => { setModalVisible(false), setMenuVisible(false) }} ><ButtonFormText>Cancel</ButtonFormText></ButtonForm>
              <ButtonForm style={{ width: 90 }} onPress={handleUpdate} ><ButtonFormText>Update</ButtonFormText></ButtonForm>
            </Buttons>

          </ModalView>
        </WrapperModal>
      </Modal>
    </View >
  );
}

export default ModalUpdateTodo;


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