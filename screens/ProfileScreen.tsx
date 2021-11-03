import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components/native';
import { Image } from "react-native";

import Profile from '../components/Profile';
import SignUp from '../components/SignUp';
import LogIn from '../components/LogIn';
import HelloUser from '../components/HelloUser';

import { Text } from '../components/Themed'; // learn about it ! 
import { RootState } from '../state/root.reducer';
import { Title, Button, ButtonText, Separator } from '../constants/StyledComponents';
import { loggedOut } from '../state/slices/users.slice';

export default function ProfileScreen() {
  const { me } = useSelector((state: RootState) => state.users);

  const [start, setStart] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [profile, setProfile] = useState(false);


  return (
    <Box >
      <HelloUser></HelloUser>

      {(signUp || logIn) ? (
        <Button style={{ alignSelf: "start" }}
          onPress={() => {
            setStart(true);
            setLogIn(false);
            setProfile(false);
            setSignUp(false);
          }} ><ButtonText>Home</ButtonText></Button>
      ) : null}

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
        {me.email ? <Profile setProfile={setProfile} setStart={setStart}></Profile> : null}
        {signUp ? <SignUp setSignUp={setSignUp} setLogIn={setLogIn}></SignUp> : null}
        {logIn ? <LogIn setLogIn={setLogIn} setProfile={setProfile}></LogIn> : null}
      </Section>

      <Image source={require('../assets/images/todo.png')} />
    </Box>
  );
}

const Box = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: navy;
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



