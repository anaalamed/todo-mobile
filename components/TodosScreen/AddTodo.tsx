import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

import { addTodo } from '../../state/slices/todos.slice';
import { RootState } from '../../state/root.reducer';
import { addTodoFunc } from '../../initializeApp'

export default function AddTodo() {
  const [text, setText] = useState('');
  const { me } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    const todo = { title: text, completed: false, userId: me.uid };

    addTodoFunc(todo)
      .then(res => {
        const id = res.data._path.segments[1];
        dispatch(addTodo({ id: id, ...todo }));
      })
      .catch((error) => {
        console.log(error);
      });

    setText('');
  }

  return (
    <Box>
      <Input
        placeholder="Type here your new todo!"
        onChangeText={text => setText(text)}
        defaultValue={text}
        onSubmitEditing={handleAddTodo}
      />
      <Button onPress={handleAddTodo} >
        <BtnText><FontAwesome name='plus' style={{ fontSize: 30 }} /></BtnText>
      </Button>
    </Box>
  );
}

const Box = styled.View`
  color: white;
  flex-direction: row;
`;

const Input = styled.TextInput`
  background: greenyellow;
  color: navy;
  padding: 20px;
  width: 70%;

  border-top-left-radius: 50px;
  border-bottom-left-radius: 20px;
`;

const Button = styled.TouchableOpacity`
  background: #6CBF40;
  padding: 13px;

  border-top-right-radius: 20px;
  border-bottom-right-radius: 50px;
`;

const BtnText = styled.Text`
  color: navy;
  font-weight: bold;
`;

