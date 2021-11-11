import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components/native';
import { ScrollView, Image } from 'react-native';

import AddTodo from '../components/TodosScreen/SearchTodo';
import Todo from '../components/TodosScreen/Todo';
import ModalAddTodo from '../components/TodosScreen/ModalAddTodo';

import { Title, Separator, Button, ButtonText } from '../constants/StyledComponents';

import { getTodos } from '../state/slices/todos.slice';
import { getTodosFunc } from '../initializeApp';
import { RootState } from '../state/root.reducer';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  setModalAddVisible(boolean): void
}

export default function TodosScreen() {
  // const TodosScreen: React.FC<Props> = ({ setModalAddVisible }) => {

  const dispatch = useDispatch();
  const { todos, filteredTodos, is_loading, error_msg } = useSelector((state: RootState) => state.todos);
  const { me } = useSelector((state: RootState) => state.users);

  const [isModalAddVisible, setModalAddVisible] = useState(false);

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
        <Row>
          <Title >Todos</Title>
          {me.email ? (
            <Button style={{ width: 40 }} onPress={() => setModalAddVisible(true)} >
              <ButtonText><FontAwesome name='plus' style={{ fontSize: 20 }} /></ButtonText>
            </Button>
          ) : null}

        </Row>

        {me.email !== undefined ? (
          <AddTodo></AddTodo>
        ) : null}
        {isModalAddVisible ? <ModalAddTodo isModalVisible={isModalAddVisible} setModalVisible={setModalAddVisible}></ModalAddTodo> : null}


        <Separator />
        <Section>
          {me.email && todos.length !== 0 ?
            (
              <>
                {/* <Title style={{ color: "navy" }}>To Do</Title> */}
                {filteredTodos.filter(todo => todo.completed === false).map((todo, i) => (<Todo key={i} order={i} todo={todo}></Todo>))}
                {todos.length === 0 ? null : <Separator></Separator>}
                {/* <Title style={{ color: "navy" }}>Done</Title> */}
                {filteredTodos.filter(todo => todo.completed === true).map((todo, i) => (<Todo key={i} order={i} todo={todo}></Todo>))}
              </>
            ) :
            (<MyText>Please log in to see your todos here! </MyText>)}

          {me.email && todos.length === 0 ? <MyText>There is no to do yet... Please add!</MyText> : null}
        </Section>

        <Image source={require('../assets/images/todo.png')} />
      </Box>
    </ScrollView>
  );
}

// export default TodosScreen;

const Box = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background: navy;
`;

const Row = styled.View`
  flex-direction: row;
  padding: 10px;
  padding-bottom: 20px;
  justify-content: space-between;
  width: 50%;
  margin-left: 25%;
`;

const Section = styled.View`
  /* background: greenyellow; */
  align-items: center;
  width: 95%;
  padding: 10px;
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
  color: navy;
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

