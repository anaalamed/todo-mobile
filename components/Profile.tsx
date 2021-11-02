import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from "react-redux";
import { getFirestore, doc, deleteDoc, updateDoc } from "firebase/firestore";

import { Text, View } from './Themed';
import { RootState } from '../state/root.reducer';

export default function Profile() {
    const dispatch = useDispatch();
    const db = getFirestore();

    const { me } = useSelector((state: RootState) => state.users);

    // console.log(me);


    return (
        <Box>
            <Text>Name: {me.name}</Text>
            <Text>Email: {me.email}</Text>
        </Box>
    );
}

const Box = styled.View`
  color: white;
  justify-content: space-between;
  background: grey;
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
`;


