import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getFirestore, collection, getDocs, getDoc, query, where } from 'firebase/firestore'
import styled from 'styled-components/native';
import { ScrollView, Image } from 'react-native';

import AddTodo from '../components/AddTodo';
import Todo from '../components/Todo';
import HelloUser from '../components/HelloUser';
import { getTodos } from '../state/slices/todos.slice';

import { Text, View } from '../components/Themed';
import { RootState } from '../state/root.reducer';
import { Title, Separator } from '../constants/StyledComponents';

export default function TodosScreen() {
  const dispatch = useDispatch();
  const { todos, is_loading, error_msg } = useSelector((state: RootState) => state.todos);
  const { me } = useSelector((state: RootState) => state.users);

  // useEffect(() => {
  //   const func = async () => {
  //     const db = getFirestore();
  //     const q = query(collection(db, "todos"), where("userId", "==", me.email));
  //     const querySnapshot = await getDocs(q);
  //     let arr: any = [];
  //     querySnapshot.forEach((doc) => {
  //       arr.push({ id: doc.id, ...doc.data() });
  //     });
  //     dispatch(getTodos(arr));
  //   }
  //   func();
  // }, []);

  return (
    <ScrollView style={{ backgroundColor: 'navy' }}
      centerContent={true}
    >

      <Box >
        <HelloUser></HelloUser>
        <Title >Todos</Title>
        {me.email !== undefined ? <AddTodo></AddTodo> : null}

        <Separator />
        <Section>
          {me.email ?
            (todos?.map((todo, i) => (<Todo key={i} todo={todo}></Todo>))) :
            (<Text>Please log in to see your todos here! </Text>)}
        </Section>
        <Image source={require('../assets/images/todo.png')} />
      </Box>
    </ScrollView>
  );
}

const Box = styled.View`
  display: flex;
  /* flex: 1; */
  align-items: center;
  justify-content: center;
  background: navy;
  /* height: 100%; */
`;

const Section = styled.View`
  background: greenyellow;
  width: 80%;
  padding: 10px;
  margin: 10px;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;
`;