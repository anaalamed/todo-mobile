import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { TouchableOpacity, TextInput, Button } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { loggedOut } from "../state/slices/users.slice";
import { removeTodos } from "../state/slices/todos.slice";
import { ButtonForm, ButtonFormText } from '../constants/StyledComponents';



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
            dispatch(removeTodos());
            setProfile(false);
            setStart(true);
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleUpdateProfile = () => {

    }

    return (
        <Box>
            <Text>Name: {me.displayName}</Text>
            <Text>Email: {me.email}</Text>
            <Text>Phone: {me.phoneNumber}</Text>

            <Buttons>

                {/* <ButtonForm disabled={true} onPress={handleUpdateProfile} ><ButtonFormText>Update</ButtonFormText></ButtonForm> */}
                <ButtonForm onPress={handleLogOut} ><ButtonFormText>Log Out</ButtonFormText></ButtonForm>
            </Buttons>

        </Box>
    );
}

export default Profile;

const Box = styled.View`
  color: white;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
`;

const Buttons = styled.View`
  flex-direction: row;
  width: 90%;
  justify-content: space-around;
`;

