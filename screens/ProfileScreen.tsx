import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { ScrollView, Image } from 'react-native';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

import Profile from '../components/ProfileScreen/Profile';
import SignUp from '../components/ProfileScreen/SignUp';
import LogIn from '../components/ProfileScreen/LogIn';
import HelloUser from '../components/HelloUser';
import UpdateProfile from '../components/ProfileScreen/UpdateProfile';
import { Title, Button, ButtonText, Separator } from '../constants/StyledComponents';

import { RootState } from '../state/root.reducer';
import { Text } from '../components/Themed'; // learn about it ! 


export default function ProfileScreen() {
  const { me } = useSelector((state: RootState) => state.users);

  // set display components 
  const [start, setStart] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [profile, setProfile] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);

  return (
    <ScrollView style={{ backgroundColor: 'navy' }}
      centerContent={true}
    >
      <Box >
        <Button onPress={() => setProfile(true)} ><ButtonText>Profile</ButtonText></Button>

        {/* back button */}
        {(signUp || logIn || UpdateProfile) ? (
          <BtnBack style={{ alignSelf: "start" }}
            onPress={() => {
              setStart(true);
              setLogIn(false);
              setProfile(false);
              setSignUp(false);
            }} ><ButtonText><FontAwesome name='arrow-left' /></ButtonText></BtnBack>
        ) : null}

        {/* log in/sign up buttons */}
        <Start display={start}>
          <Title >My Profile</Title>
          <Separator />

          {me.email ? null : (
            <Buttons>
              <Button onPress={() => {
                setStart(false)
                setSignUp(true)
              }}
              ><ButtonText>Sign Up</ButtonText></Button>

              <Button onPress={() => {
                setStart(false)
                setLogIn(true)
              }} ><ButtonText>Log In</ButtonText></Button>
            </Buttons>
          )}
        </Start>

        <Section>
          {me.email && profile ? <Profile setProfile={setProfile} setStart={setStart} setUpdateProfile={setUpdateProfile}></Profile> : null}
          {signUp ? <SignUp setSignUp={setSignUp} setLogIn={setLogIn}></SignUp> : null}
          {logIn ? <LogIn setLogIn={setLogIn} setProfile={setProfile}></LogIn> : null}
          {updateProfile ? (<UpdateProfile setProfile={setProfile} setUpdateProfile={setUpdateProfile}></UpdateProfile>) : null}
        </Section>

        <Image source={require('../assets/images/todo.png')} />
      </Box>
    </ScrollView>
  );
}

const Box = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: navy;
  /* margin: 100px; */
`;

const BtnBack = styled(Button)`
  width: 30px;
  margin-left: 10px;
`;

const Start = styled.View`
  display: flex;
  align-items: center;
  display: ${props => (props.display ? "flex" : "none")};
  width: 100%;
`;

const Buttons = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin: 10px;
`;

const Section = styled.View`
  background: greenyellow;
  /* border-radius: 10px; */
  width: 80%;
  margin: 10px;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;
`;



