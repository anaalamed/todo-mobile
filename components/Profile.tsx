import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { TouchableOpacity, TextInput, Button } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { loggedOut } from "../state/slices/users.slice";

interface Props {
    setProfile(data: boolean): void
    setStart(data: boolean): void
}

import { Text, View } from './Themed';
import { RootState } from '../state/root.reducer';
import ProfileScreen from '../screens/ProfileScreen';

const Profile: React.FC<Props> = ({ setProfile, setStart }) => {

    const dispatch = useDispatch();

    const { me } = useSelector((state: RootState) => state.users);

    const auth = getAuth();

    const handleLogOut = () => {
        signOut(auth).then(() => {
            dispatch(loggedOut());
            setProfile(false);
            setStart(true);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Box>
            <Text>Name: {me.displayName}</Text>
            <Text>Email: {me.email}</Text>
            <Text>Phone: {me.phoneNumber}</Text>


            <Button title="Log Out" onPress={handleLogOut} />

        </Box>
    );
}

export default Profile;

const Box = styled.View`
  color: white;
  justify-content: space-between;
  background: grey;
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
`;


