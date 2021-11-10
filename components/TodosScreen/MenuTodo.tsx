import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from "react-redux";
import { FontAwesome } from '@expo/vector-icons';

import UpdateTodo from './ModalUpdateTodo';
import ModalDelete from './ModalDeleteTodo';
import { deleteTodo, toggleComplete } from "../../state/slices/todos.slice";
import { deleteTodoFunc, toggleCompleteTodoFunc } from '../../initializeApp';
import { useRef } from 'react';
import { useEffect } from 'react';

interface Todo {
  id: string
  title: string
  completed: boolean
  userId: string
  description?: string
}

interface Props {
  todo: Todo
  isMenuVisible: boolean
  setMenuVisible(boolean): void
  handleToggleComplete(): void
}

const MenuTodo: React.FC<Props> = ({ todo, isMenuVisible, setMenuVisible, handleToggleComplete }) => {

  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    deleteTodoFunc(todo)
      .then(res => {
        dispatch(deleteTodo(todo.id));
        setMenuVisible(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {update ? (<UpdateTodo todo={todo} setMenuVisible={setMenuVisible} isModalVisible={update} setModalVisible={setUpdate}></UpdateTodo>) : (
        <Box >
          <Tools>
            <Button onPress={handleToggleComplete}><BtnText><FontAwesome name='check' /> </BtnText></Button>
            <Button onPress={() => setUpdate(true)}><BtnText><FontAwesome name='pencil' /> </BtnText></Button>
            <Button onPress={() => setModalVisible(true)}><BtnText><FontAwesome name='trash' /> </BtnText></Button>
          </Tools>

          {isModalVisible ? <ModalDelete isModalVisible={isModalVisible} setModalVisible={setModalVisible} setMenulVisible={setMenuVisible} handleDelete={handleDelete} title={todo.title}></ModalDelete> : null}
        </Box>

      )}
    </>
  );
}

export default MenuTodo;

const Box = styled.View`
  justify-content: space-between;
  align-items: center;
  background: #49499c;
  position: relative;
  /* position: absolute; */
  /* top: 20px; */
  right: 20px;
  z-index: 100;

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
  /* flex-direction: row; */
  /* z-index: 100; */
`;

const Button = styled.TouchableOpacity`
  background: greenyellow;
  padding: 2px;
  border-radius: 10px;
  width: 20px;
  margin: 2px;
`;



