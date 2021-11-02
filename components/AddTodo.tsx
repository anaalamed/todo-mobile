import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components/native';
import { getFirestore, collection, addDoc } from "firebase/firestore";


import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { addTodo } from '../state/slices/todos.slice';
import { RootState } from '../state/root.reducer';



export default function AddTodo() {
  const [text, setText] = useState('');
  const { me } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const handleAddTodo = async () => {
    try {
      const db = getFirestore();
      const todo = { title: text, completed: true, userId: me.uid };

      const docRef = await addDoc(collection(db, "todos"), todo);
      dispatch(addTodo(todo));
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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

