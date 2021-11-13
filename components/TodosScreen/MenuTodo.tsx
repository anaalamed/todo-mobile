import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from "react-redux";
import { FontAwesome } from '@expo/vector-icons';

import UpdateTodo from './ModalUpdateTodo';
import ModalDelete from './ModalDeleteTodo';
import { deleteTodo } from "../../state/slices/todos.slice";
import { deleteTodoFunc } from '../../initializeApp';
import { Todo } from '../../types';


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
            <Button style={{ backgroundColor: "greenyellow" }} onPress={handleToggleComplete}><BtnText>
              {todo.completed ? (<FontAwesome name='times' />) : (<FontAwesome name='check' />)}
            </BtnText></Button>
            <Button style={{ backgroundColor: "yellow" }} onPress={() => setUpdate(true)}><BtnText ><FontAwesome name='pencil' /> </BtnText></Button>
            <Button style={{ backgroundColor: "red" }} onPress={() => setModalVisible(true)}><BtnText><FontAwesome name='trash' /> </BtnText></Button>
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
  /* background: #49499c; */
  position: relative;
  /* position: absolute; */
  top: 10px;
  right: 35px;
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
  /* background: greenyellow; */
  padding: 2px;
  border-radius: 10px;
  width: 20px;
  /* height: 30px; */
  margin: 2px;
  border: 1px solid navy;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;
`;



