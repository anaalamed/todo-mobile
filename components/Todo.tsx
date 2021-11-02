import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';

interface Todo {
    title: string
    completed: boolean
}

export default function Todo({ todo }: { todo: Todo }) {
    const [text, setText] = useState('');

    return (
        <Box>
            <Text>{todo.title} - </Text>
            <Text>{todo.completed ? "done" : " need to do"}</Text>
        </Box>
    );
}

const Box = styled.View`
  color: white;
  flex-direction: row;
  background: grey;
  width: 80%;
  padding: 10px;
`;

// const Box = styled.View`
//   color: white;
//   flex-direction: row;
// `;

const Input = styled.TextInput`
  background: greenyellow;
  color: white;
  padding: 20px;
`;

const Button = styled.TouchableOpacity`
  background: green;
  padding: 20px;
`;

