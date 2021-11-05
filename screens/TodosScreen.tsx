import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getFirestore, collection, getDocs, getDoc, query, where } from 'firebase/firestore'
import styled from 'styled-components/native';
import { ScrollView, Image } from 'react-native';

import AddTodo from '../components/TodosScreen/AddTodo';
import Todo from '../components/TodosScreen/Todo';
import HelloUser from '../components/HelloUser';
import Alert from '../components/TodosScreen/Alert';

import { Title, Separator } from '../constants/StyledComponents';

import { getTodos } from '../state/slices/todos.slice';
import { RootState } from '../state/root.reducer';

export default function TodosScreen() {
  const dispatch = useDispatch();
  const { todos, is_loading, error_msg } = useSelector((state: RootState) => state.todos);
  const { me } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    const func = async () => {
      if (me.email) {
        const db = getFirestore();
        const q = query(collection(db, "todos"), where("userId", "==", me.email));
        const querySnapshot = await getDocs(q);
        let arr: any = [];
        querySnapshot.forEach((doc) => {
          arr.push({ id: doc.id, ...doc.data() });
        });
        dispatch(getTodos(arr));
      }
    }
    func();
  }, [me]);

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
            (
              <>
                {todos.filter(todo => todo.completed === false).map((todo, i) => (<Todo key={i} todo={todo}></Todo>))}
                {todos.filter(todo => todo.completed === true).map((todo, i) => (<Todo key={i} todo={todo}></Todo>))}
              </>
            ) :
            (<MyText>Please log in to see your todos here! </MyText>)}

          {me.email && todos.length === 0 ? <MyText>There is no to do yet... Please add!</MyText> : null}
        </Section>

        {/* <Alert></Alert> */}

        <Image source={require('../assets/images/todo.png')} />
      </Box>
    </ScrollView>
  );
}

const Box = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background: navy;
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

const MyText = styled.Text`
  text-align: center;
  color: navy;
  font-weight: bold;
`;

