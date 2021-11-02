import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getFirestore, collection, getDocs, getDoc, query, where } from 'firebase/firestore'
import styled from 'styled-components/native';

import EditScreenInfo from '../components/EditScreenInfo';
import AddTodo from '../components/AddTodo';
import Todo from '../components/Todo';
import { getTodos } from '../state/slices/todos.slice';

import { Text, View } from '../components/Themed';
import { RootState } from '../state/root.reducer';


export default function TodosScreen() {
  const dispatch = useDispatch();
  const { todos, is_loading, error_msg } = useSelector((state: RootState) => state.todos);
  const { me } = useSelector((state: RootState) => state.users);


  useEffect(() => {
    const func = async () => {
      const db = getFirestore();
      const q = query(collection(db, "todos"), where("userId", "==", me.uid));

      const querySnapshot = await getDocs(q);
      let arr: any = [];
      querySnapshot.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() });
      });
      dispatch(getTodos(arr));
    }
    func();
  }, [todos])

  return (
    <Box >
      <Title >Todos</Title>
      <AddTodo />

      <Separator />
      <Section>
        {todos.map((todo, i) => (<Todo key={i} todo={todo}></Todo>))}
      </Section>
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

const Section = styled.View`
  background: greenyellow;
  width: 80%;
  padding: 10px;
  margin: 10px;
`;

const Separator = styled.View`
  margin-top: 10px;
  height: 1px;
  width: 80%;
  color: black;
  background: #7c7a7aaa;
`;


