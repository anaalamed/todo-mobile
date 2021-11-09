import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from "react-redux";
import { FontAwesome } from '@expo/vector-icons';

import UpdateTodo from './UpdateTodo';
import ModalDelete from './ModalDeleteTodo';
import { deleteTodo, toggleComplete } from "../../state/slices/todos.slice";
import { deleteTodoFunc, toggleCompleteTodoFunc } from '../../initializeApp';

interface Todo {
  id: string
  title: string
  completed: boolean
  userId: string
}

interface Props {
  todo: Todo
  order: number
}

const Profile: React.FC<Props> = ({ todo, order }) => {

  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  // console.log(order);
  const color = order % 2 ? "blueviolet" : "coral"

  const handleDelete = () => {
    deleteTodoFunc(todo)
      .then(res => {
        dispatch(deleteTodo(todo.id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleToggleComplete = async () => {
    toggleCompleteTodoFunc(todo)
      .then(res => {
        dispatch(toggleComplete({ id: todo.id, completed: !todo.completed }));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {update ? (<UpdateTodo id={todo.id} title={todo.title} setUpdate={setUpdate}></UpdateTodo>) : (
        <Box color={color}>
          <Main>
            <IsDoneBox done={todo.completed} onPress={handleToggleComplete}>
              {todo.completed ? (<BtnText><FontAwesome name='check' /> </BtnText>) : null}
            </IsDoneBox>

            <TodoText>{todo.title} </TodoText>
          </Main>

          <Tools>
            <Button onPress={() => setUpdate(true)}><BtnText><FontAwesome name='pencil' /> </BtnText></Button>
            <Button onPress={() => setModalVisible(true)}><BtnText><FontAwesome name='trash' /> </BtnText></Button>
          </Tools>

          {isModalVisible ? <ModalDelete isModalVisible={isModalVisible} setModalVisible={setModalVisible} handleDelete={handleDelete} title={todo.title}></ModalDelete> : null}

        </Box>

      )}
    </>
  );
}

export default Profile;

const Box = styled.View`
  color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #49499c;
  background: ${props => props.color};

  width: 100%;
  padding: 10px;
  padding-left: 20px;
  padding-right: 15px;
  margin-bottom: 5px;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;
`;

const Main = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IsDoneBox = styled.TouchableOpacity`
  background: ${props => (props.done ? "lightgreen" : "white")};
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 8px;
`;

const TodoText = styled.Text`
  color: greenyellow;
  font-size: 20px;
  width: 70%;
`;

const BtnText = styled.Text`
  color: navy;
  font-weight: bold;
  text-align: center;
`;

const Tools = styled.View`
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  background: greenyellow;
  padding: 2px;
  border-radius: 10px;
  width: 20px;
  margin-right: 5px;
`;



