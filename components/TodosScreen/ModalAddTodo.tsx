import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

import { addTodo } from '../../state/slices/todos.slice';
import { RootState } from '../../state/root.reducer';
import { addTodoFunc } from '../../initializeApp'
import { View, Modal } from 'react-native';
import { ButtonForm, ButtonFormText, StyledText, Title, Input } from '../../constants/StyledComponents';

interface Props {
  isModalVisible: boolean
  setModalVisible(boolean): void
}

const ModalAddTodo: React.FC<Props> = ({ setModalVisible, isModalVisible }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { me } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    const todo = { title: title, description: description, userId: me.email };

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
              <Input
                placeholder="Title"
                onChangeText={text => setTitle(text)}
                defaultValue={title}
              />

              <Input
                placeholder="Description"
                onChangeText={text => setDescription(text)}
                defaultValue={description}
              />
            </Box>

            <Buttons>
              <ButtonForm style={{ width: 90 }} onPress={() => setModalVisible(false)} ><ButtonFormText>Cancel</ButtonFormText></ButtonForm>
              <ButtonForm style={{ width: 90 }} onPress={handleAddTodo} ><ButtonFormText>Add</ButtonFormText></ButtonForm>
            </Buttons>

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

const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;


