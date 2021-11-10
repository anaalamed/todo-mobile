import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components/native';
import { getFirestore, collection, updateDoc, doc } from "firebase/firestore";
import { FontAwesome } from '@expo/vector-icons';

import { updateTodo } from '../../state/slices/todos.slice';
import { RootState } from '../../state/root.reducer';
import { updateTodoFunc } from '../../initializeApp'
import { Modal, View } from 'react-native';
import { ButtonForm, ButtonFormText, Input, Title } from '../../constants/StyledComponents';

interface Todo {
  id: string
  title: string
  completed: boolean
  userId: string
  description?: string
}

interface Props {
  isModalVisible: boolean
  setModalVisible(boolean): void
  setMenuVisible(boolean): void
  todo: Todo
}

const ModalAddTodo: React.FC<Props> = ({ setModalVisible, setMenuVisible, isModalVisible, todo }) => {
  const [title, setTitle] = useState(todo.title || '');
  const [description, setDescription] = useState(todo.description || '');

  const { me } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  let handleUpdate = async () => {

    updateTodoFunc({ id: todo.id, title: title, description: description })
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
            <Title>Edit todo: {todo.title}?</Title>
            <Box>
              <Input
                placeholder="Title"
                onChangeText={text => setTitle(text)}
                defaultValue={todo.title}
              />

              <Input
                placeholder="Description"
                onChangeText={text => setDescription(text)}
                defaultValue={todo.description}
              />
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

export default ModalAddTodo;





const Box = styled.View`
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
`;

// const Input = styled.TextInput`
//   color: white;
//   flex-direction: row;
//   justify-content: space-between;
//   background: #49499c;
//   padding: 13px;
//   padding-left: 20px;
//   padding-right: 15px;
//   width: 80%;

//   border-top-left-radius: 50px;
//   border-bottom-left-radius: 20px;
// `;

const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const Button = styled.TouchableOpacity`
  background: #6CBF40;
  background: navy;
  width: 30px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 50px;
`;

const BtnText = styled.Text`
  color: #6CBF40;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
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