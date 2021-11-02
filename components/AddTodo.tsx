import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';

export default function AddTodo({ path }: { path: string }) {
    const [text, setText] = useState('');

    return (
        <Box>
            <Input
                placeholder="Type here your new todo!"
                onChangeText={text => setText(text)}
            />
            <Button>
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
`;

const Button = styled.TouchableOpacity`
  background: green;
  padding: 20px;
`;

