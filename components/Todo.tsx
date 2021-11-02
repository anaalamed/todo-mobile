import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch } from "react-redux";
import { Checkbox } from 'react-native-paper';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { deleteTodo, toggleComplete, updateTodo } from "../state/slices/todos.slice";


interface Todo {
    id: string
    title: string
    completed: boolean
}

export default function Todo({ todo }: { todo: Todo }) {
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const handleDelete = () => {
        console.log(todo.id);
        dispatch(deleteTodo(todo.id));
    }

    const handleToggleComplete = () => {
        console.log(todo.id);
        dispatch(toggleComplete({ id: todo.id, completed: !todo.completed }));
    }

    const [checked, setChecked] = React.useState(false);

    return (
        <Box>
            <>
                <IsDoneBox>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                            handleToggleComplete();
                        }}
                    />
                </IsDoneBox>

                <Text>{todo.title} - </Text>
                <Text>{todo.id} - </Text>
                <Text>{todo.completed ? "done" : "need to do"}</Text>
            </>

            <Tools>
                <Button onPress={handleDelete}><Text>X</Text></Button>
            </Tools>
        </Box>
    );
}

const Box = styled.View`
  color: white;
  flex-direction: row;
  justify-content: space-between;
  background: grey;
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
`;

const Input = styled.TextInput`
  background: greenyellow;
  color: white;
  padding: 20px;
`;

const IsDoneBox = styled.View`
  background: white;
  width: 30px;
  height: 30px;
`;

const Tools = styled.View`
`;

const Button = styled.TouchableOpacity`
  background: green;
  padding: 2px;
`;

