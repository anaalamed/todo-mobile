import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from "react-redux";
import { FontAwesome } from '@expo/vector-icons';

import UpdateTodo from './ModalUpdateTodo';
import ModalDelete from './ModalDeleteTodo';
import MenuTodo from './MenuTodo';

import { deleteTodo, toggleComplete } from "../../state/slices/todos.slice";
import { deleteTodoFunc, toggleCompleteTodoFunc } from '../../initializeApp';
import ModalTodoDetails from './ModalTodoDetails';

interface Todo {
  id: string
  title: string
  completed: boolean
  userId: string
  description?: string
  createdAt: Date
  updatedAt?: Date
}

interface Props {
  todo: Todo
  order: number
}

const Profile: React.FC<Props> = ({ todo, order }) => {

  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);


  const color = order % 2 ? "gainsboro" : "lightcyan"

  const handleToggleComplete = async () => {
    toggleCompleteTodoFunc(todo)
      .then(res => {
        dispatch(toggleComplete({ id: todo.id, completed: !todo.completed, updatedAt: res.data.updatedAt }));
        setMenuVisible(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Box color={color}>
        <Main>
          <IsDoneBox done={todo.completed} onPress={handleToggleComplete}>
            {todo.completed ? (<BtnText><FontAwesome name='check' /> </BtnText>) : null}
          </IsDoneBox>

          <TodoText onPress={setModalVisible}>{todo.title} </TodoText>
        </Main>

        {isModalVisible ? <ModalTodoDetails todo={todo} setModalVisible={setModalVisible}></ModalTodoDetails> : null}


        {isMenuVisible ? <MenuTodo todo={todo} isMenuVisible={isMenuVisible} setMenuVisible={setMenuVisible} handleToggleComplete={handleToggleComplete}></MenuTodo> : null}
        <Button style={{ position: "absolute", right: 0, top: 3 }} onPress={() => setMenuVisible(!isMenuVisible)}><BtnText><FontAwesome name='ellipsis-h' /> </BtnText></Button>

      </Box>
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
  color: navy;
  font-size: 20px;
  width: 70%;
  font-weight: bold;
`;

const BtnText = styled.Text`
  color: navy;
  font-weight: bold;
  text-align: center;
`;

const Button = styled.TouchableOpacity`
  background: greenyellow;
  padding: 2px;
  border-radius: 10px;
  width: 20px;
  margin-right: 5px;
`;



