import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components/native';

import { addTodo } from '../../state/slices/todos.slice';
import { RootState } from '../../state/root.reducer';
import { addTodoFunc } from '../../initializeApp'
import { View, Modal } from 'react-native';
import { ButtonForm, ButtonFormText, Input, InputContainer, InputIcon, StyledText } from '../../constants/StyledComponents';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  isModalVisible: boolean
  setModalVisible(boolean): void
}

const ModalAddTodo: React.FC<Props> = ({ setModalVisible, isModalVisible }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUrgent, setUrgent] = useState(false);

  console.log(isUrgent)


  const { me } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    const todo = { title: title, description: description, userId: me.email, important: isUrgent };

    addTodoFunc(todo)
      .then(res => {
        const todo = res.data;
        dispatch(addTodo(todo));
        setTitle('');
        setDescription('');
        setModalVisible(false);
      })
      .catch((error) => {
        alert("something went wrong")
      });
  }

  return (
    <View >
      <Modal
        visible={isModalVisible}
        transparent={true}
      >
        <WrapperModal >
          <ModalView >
            <Box>
              <InputContainer>
                <InputIcon name='plus' />
                <Input
                  placeholder="Title"
                  onChangeText={text => setTitle(text)}
                  defaultValue={title}
                />
              </InputContainer>

              <InputContainer>
                <InputIcon name='comment' />
                <Input
                  placeholder="Description"
                  onChangeText={text => setDescription(text)}
                  defaultValue={description}
                />
              </InputContainer>
            </Box>

            <Row style={{ justifyContent: "flex-start" }}>
              <IsImportantBox onPress={() => setUrgent(!isUrgent)}>
                {isUrgent ? (<BtnText><FontAwesome name='check' /> </BtnText>) : null}
              </IsImportantBox>
              <StyledText style={{ color: "greenyellow", fontSize: 18, marginTop: 10 }}>Important</StyledText>
            </Row>

            <Row>
              <ButtonForm style={{ width: 90 }} onPress={() => setModalVisible(false)} ><ButtonFormText>Cancel</ButtonFormText></ButtonForm>
              <ButtonForm style={{ width: 90 }} onPress={handleAddTodo} ><ButtonFormText>Add</ButtonFormText></ButtonForm>
            </Row>

          </ModalView>
        </WrapperModal>
      </Modal>
    </View >
  );
}

export default ModalAddTodo;

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


const Box = styled.View`
  color: white;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
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


