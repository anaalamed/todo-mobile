import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from "react-redux";
import { getFirestore, collection, getDocs, getDoc, query, where } from 'firebase/firestore'
import styled from 'styled-components/native';

import EditScreenInfo from '../components/EditScreenInfo';
import AddTodo from '../components/AddTodo';
import Todo from '../components/Todo';


import { Text, View } from '../components/Themed';

export default function TodosScreen() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const func = async () => {
  //     const db = getFirestore();
  //     const q = query(collection(db, "todos"), where("user", "==", me.uid));

  //     const querySnapshot = await getDocs(q);
  //     console.log(querySnapshot);
  //     let arr = [];
  //     querySnapshot.forEach((doc) => {
  //       arr.push({ id: doc.id, ...doc.data() });
  //     });
  //     dispatch(getTodos(arr));
  //   }
  //   func();
  // }, [])

  const todos = [{ title: 'aaaa', completed: false }, { title: 'bbb', completed: false },];

  return (
    <Box >
      <Title >Todos</Title>
      <AddTodo />

      {/* <Separator /> */}
      {todos.map(todo => (<Todo todo={todo}></Todo>))}
    </Box>
  );
}

const Box = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const Separator = styled.View`
  margin-top: 30px;
  height: 10px;
  width: 80%;
  color: black;
`;
