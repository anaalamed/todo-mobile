import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getFirestore, collection, getDocs, getDoc, query, where } from 'firebase/firestore'
import styled from 'styled-components/native';

import Profile from '../components/Profile';
import SignUp from '../components/SignUp';
import LogIn from '../components/LogIn';


import { Text, View } from '../components/Themed';
import { RootState } from '../state/root.reducer';


export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { todos, is_loading, error_msg } = useSelector((state: RootState) => state.todos);
  const { me } = useSelector((state: RootState) => state.users);

  const [start, setStart] = useState(true);
  const [signUp, setSignUp] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [profile, setProfile] = useState(false);


  return (
    <Box >
      <Title>Hi, {me?.displayName ? me.displayName : 'guest'}</Title>

      <Start display={start}>
        <Title >My Profile</Title>
        <Separator />

        <Buttons>
          <Button onPress={() => {
            setStart(false)
            setSignUp(true)
          }}
          ><Text>Sign Up</Text></Button>

          <Button onPress={() => {
            setStart(false)
            setLogIn(true)
          }} ><Text>Log In</Text></Button>
        </Buttons>
      </Start>


      <Section>
        {profile ? <Profile setProfile={setProfile} setStart={setStart}></Profile> : null}
        {signUp ? <SignUp setSignUp={setSignUp} setLogIn={setLogIn}></SignUp> : null}
        {logIn ? <LogIn setLogIn={setLogIn} setProfile={setProfile}></LogIn> : null}
      </Section>
    </Box>
  );
}

const Box = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Start = styled.View`
  display: flex;
  align-items: center;
  display: ${props => (props.display ? "flex" : "none")};
  width: 100%;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const Buttons = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin: 10px;
`;

const Button = styled.TouchableOpacity`
  background: greenyellow;
  padding: 10px;
  border-radius: 10px;
  width: 80px;
`;

const Section = styled.View`
  background: greenyellow;
  width: 80%;
  /* padding: 10px; */
  margin: 10px;
`;

const Separator = styled.View`
  margin-top: 10px;
  height: 1px;
  width: 70%;
  color: black;
  background: #7c7a7aaa;
`;


