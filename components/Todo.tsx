import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from "react-redux";
import { getFirestore, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { FontAwesome } from '@expo/vector-icons';

import { deleteTodo, toggleComplete, updateTodo } from "../state/slices/todos.slice";
import UpdateTodo from '../components/UpdateTodo';

interface Todo {
  id: string
  title: string
  completed: boolean
  userId: string
}

export default function Todo({ todo }: { todo: Todo }) {
  const dispatch = useDispatch();
  const db = getFirestore();
  const [update, setUpdate] = useState(false);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "todos", todo.id));
    dispatch(deleteTodo(todo.id));
  }

  const handleToggleComplete = async () => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed
    });
    dispatch(toggleComplete({ id: todo.id, completed: !todo.completed }));
  }



  return (
    <>
      {update ? (<UpdateTodo id={todo.id} setUpdate={setUpdate}></UpdateTodo>) : (
        <Box>
          <Main>
            <IsDoneBox done={todo.completed} onPress={handleToggleComplete}>
              {todo.completed ? (<BtnText><FontAwesome name='check' /> </BtnText>) : null}
            </IsDoneBox>

            <TodoText>{todo.title} </TodoText>
          </Main>

          <Tools>
            <Button onPress={() => setUpdate(true)}><BtnText><FontAwesome name='pencil' /> </BtnText></Button>
            <Button onPress={handleDelete}><BtnText><FontAwesome name='trash' /> </BtnText></Button>
          </Tools>

        </Box>

      )}
    </>
  );
}

const Box = styled.View`
  color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #49499c;
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



