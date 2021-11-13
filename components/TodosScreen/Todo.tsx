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
import { Todo } from '../../types';
import { StyledText } from '../../constants/StyledComponents';

interface Props {
  todo: Todo
  order: number
}

const Profile: React.FC<Props> = ({ todo, order }) => {

  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);

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
      <Box color={todo.color || "lightcyan"}>
        <Main>
          <IsDoneBox done={todo.completed} onPress={handleToggleComplete}>
            {todo.completed ? (<BtnText><FontAwesome name='check' /> </BtnText>) : null}
          </IsDoneBox>

          {todo.important ? <StyledText style={{ color: "red", fontSize: 30, paddingBottom: 0, paddingRight: 5 }}>!</StyledText> : null}

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
  border: 1px solid navy;


  width: 95%;
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
  width: 30px;
  height: 20px;
  border-radius: 10px;
  margin-right: 8px;
  border: 1px solid navy;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;
`;

const TodoText = styled.Text`
  color: navy;
  font-size: 20px;
  width: 75%;
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
  border: 1px solid navy;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;
`;



