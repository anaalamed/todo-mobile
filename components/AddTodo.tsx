import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components/native';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { FontAwesome } from '@expo/vector-icons';

import { addTodo } from '../state/slices/todos.slice';
import { RootState } from '../state/root.reducer';

export default function AddTodo() {
  const [text, setText] = useState('');
  const { me } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const handleAddTodo = async () => {
    try {
      const db = getFirestore();
      const todo = { title: text, completed: false, userId: me.uid };
      const docRef = await addDoc(collection(db, "todos"), todo);
      dispatch(addTodo({ id: docRef.id, ...todo }));
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
        onSubmitEditing={handleAddTodo}
      />
      <Button onPress={handleAddTodo} >
        <BtnText><FontAwesome name='plus' /></BtnText>
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
  padding: 20px;

  border-top-right-radius: 20px;
  border-bottom-right-radius: 50px;
`;

const BtnText = styled.Text`
  color: navy;
  font-weight: bold;
  font-size: 18px;
`;

