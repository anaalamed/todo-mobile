import React from 'react';
import { useSelector } from "react-redux";
import { ScrollView, Image } from 'react-native';
import styled from 'styled-components/native';

import Profile from '../components/ProfileScreen/Profile';
import { Title, Button, ButtonText, Separator } from '../constants/StyledComponents';

import { RootState } from '../state/root.reducer';
import { Text } from '../components/Themed'; // learn about it ! 


export default function ProfileScreen({ navigation }) {
  const { me } = useSelector((state: RootState) => state.users);

  return (
    <ScrollView style={{ backgroundColor: 'navy' }}
      centerContent={true}
    >
      <Box >
        <Title style={{ marginTop: 20 }}>My Profile</Title>
        <Separator />

        <Start display={!me.email}>
          <Buttons>
            <Button onPress={() => navigation.push('SignUp')} ><ButtonText>Sign Up</ButtonText></Button>
            <Button onPress={() => navigation.push('LogIn')} ><ButtonText>Log In</ButtonText></Button>
          </Buttons>
        </Start>

        <Section display={me.email}>
          <Profile navigation={navigation}></Profile>
        </Section>

        <Image source={require('../assets/images/todo.png')} />
      </Box>
    </ScrollView >
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
  display: ${props => (props.display ? "flex" : "none")};
  /* border-radius: 10px; */
  width: 80%;
  margin: 10px;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;
`;



