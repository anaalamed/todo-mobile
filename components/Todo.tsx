import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch } from "react-redux";
import { Checkbox } from 'react-native-paper';
import { getFirestore, doc, deleteDoc, updateDoc } from "firebase/firestore";

import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { deleteTodo, toggleComplete, updateTodo } from "../state/slices/todos.slice";


interface Todo {
    id: string
    title: string
    completed: boolean
    userId: string
}

export default function Todo({ todo }: { todo: Todo }) {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const db = getFirestore();


    const handleDelete = async () => {
        // console.log(todo.id);
        await deleteDoc(doc(db, "todos", todo.id));
        dispatch(deleteTodo(todo.id));
    }

    const handleToggleComplete = async () => {
        // console.log(todo.id);
        await updateDoc(doc(db, "todos", todo.id), {
            completed: !todo.completed
        });
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

                <TodoText>{todo.title} </TodoText>
                {/* <Text>{todo.userId} - </Text> */}
                <TodoText>{todo.completed ? "done" : "to do"}</TodoText>
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
  justify-content: space-around;
  background: #49499c;
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;
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
  border-radius: 10px;
`;

const Tools = styled.View`
`;

const Button = styled.TouchableOpacity`
  background: greenyellow;
  padding: 2px;
  border-radius: 10px;
`;

const TodoText = styled.Text`
  color: greenyellow;
  font-size: 20px;
 
`;

