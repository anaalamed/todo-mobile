import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

import { filterTodos } from '../../state/slices/todos.slice';
import { RootState } from '../../state/root.reducer';


export default function SearchTodo() {
  const { todos } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const handleSearch = (text) => {

    let filtered = todos.filter(todo =>
      todo.title.toLowerCase().includes(text.toLowerCase())
    )
    dispatch(filterTodos(filtered));
  }

  return (
    <Box>
      <Input
        placeholder="Type here to search your todo..."
        onChangeText={text => { handleSearch(text) }}
        defaultValue={""}
      />
      <Button onPress={handleSearch} >
        <BtnText><FontAwesome name='search' style={{ fontSize: 23, alignSelf: "flex-end" }} /></BtnText>
      </Button>
    </Box>
  );
}

const Box = styled.View`
  color: white;
  flex-direction: row;

`;

const Input = styled.TextInput`
  background: #d5f6c6;
  color: navy;
  /* padding: 10px; */
  padding-left: 20px;
  width: 70%;
  border: 1px solid navy;


  border-top-left-radius: 50px;
  border-bottom-left-radius: 20px;
`;

const Button = styled.TouchableOpacity`
  background: #6CBF40;
  padding: 10px;
  border: 1px solid navy;


  border-top-right-radius: 20px;
  border-bottom-right-radius: 50px;
`;

const BtnText = styled.Text`
  color: navy;
  font-weight: bold;
`;