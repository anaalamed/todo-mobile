import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components/native';
import { ScrollView, Image } from 'react-native';

import SearchTodo from '../components/TodosScreen/SearchTodo';
import Todo from '../components/TodosScreen/Todo';

import { Title, Separator, Button, ButtonText } from '../constants/StyledComponents';

import { getTodos } from '../state/slices/todos.slice';
import { getTodosFunc } from '../initializeApp';
import { RootState } from '../state/root.reducer';
import { FontAwesome } from '@expo/vector-icons';



export default function TodosScreen() {

  const dispatch = useDispatch();
  const { todos, filteredTodos, is_loading, error_msg } = useSelector((state: RootState) => state.todos);
  const { me, loggedIn } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (me.email) {
      const handleGet = () => {
        getTodosFunc(me)
          .then(res => {
            dispatch(getTodos(res.data));
          })
          .catch((error) => {
            console.log('error', error);
          });
      }
      handleGet();
    }
  }, [me]);

  return (
    <ScrollView style={{ backgroundColor: 'navy' }}
      centerContent={true}
    >

      <Box >
        <Title >Todos</Title>

        {me.email ? (<SearchTodo></SearchTodo>) : null}

        <Separator />
        <Section>
          {loggedIn ?
            (
              <>
                {filteredTodos.length !== 0 ? (
                  <>
                    <Title style={{ fontSize: 20 }}>Wait To Do...</Title>
                    {filteredTodos.filter(todo => todo.completed === false).map((todo, i) => (<Todo key={i} order={i} todo={todo}></Todo>))}
                    {todos.length === 0 ? null : <Separator></Separator>}

                    <Title style={{ fontSize: 20 }}>Done!</Title>
                    {filteredTodos.filter(todo => todo.completed === true).map((todo, i) => (<Todo key={i} order={i} todo={todo}></Todo>))}
                  </>
                ) : null}
              </>
            ) :
            (<MyText>Please log in to see your todos here! </MyText>)}

          {loggedIn && todos.length === 0 ? <MyText>There is no to do yet... Please add!</MyText> : null}
        </Section>

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
  /* background: greenyellow; */
  align-items: center;
  width: 95%;
  padding-left: 10px;
  padding-right: 10px;
  margin: 10px;
  border: 1px solid navy;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;

  /* box-shadow: 10px 5px 5px yellow; */
`;

const MyText = styled.Text`
  text-align: center;
  color: greenyellow;
  font-weight: bold;
`;


// const Button = styled.TouchableOpacity`
//   background: #6CBF40;
//   padding: 13px;

//   border-top-right-radius: 20px;
//   border-bottom-right-radius: 50px;
// `;

// const BtnText = styled.Text`
//   color: navy;
//   font-weight: bold;
// `;

