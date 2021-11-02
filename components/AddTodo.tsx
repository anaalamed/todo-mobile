import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components/native';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { addTodo } from '../state/slices/todos.slice';


export default function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    const todo = { title: text, completed: true, user: 'aaaa' };
    dispatch(addTodo(todo));
    setText('');
  }

  return (
    <Box>
      <Input
        placeholder="Type here your new todo!"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Button onPress={handleAddTodo} >
        <Text>Add</Text>
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
  color: white;
  padding: 20px;
  width: 70%;
`;

const Button = styled.TouchableOpacity`
  background: green;
  padding: 20px;
`;

