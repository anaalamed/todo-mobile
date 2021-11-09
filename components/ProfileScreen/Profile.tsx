import React from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";

import { loggedOut } from "../../state/slices/users.slice";
import { removeTodos } from "../../state/slices/todos.slice";
import { RootState } from '../../state/root.reducer';
import { ButtonForm, ButtonFormText } from '../../constants/StyledComponents';

interface Props {
  navigation: any
}

const Profile: React.FC<Props> = ({ navigation }) => {

  const dispatch = useDispatch();
  const { me } = useSelector((state: RootState) => state.users);
  const auth = getAuth();
  const defaultProfileImage = 'https://sharedigitalcard.com/user/uploads/user.png';

  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(loggedOut());
      dispatch(removeTodos());
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <Box>
      <StyledImage source={{ uri: me.photoURL || defaultProfileImage }} />

      <Field>Name: <ValueField>{me.name}</ValueField> </Field>
      <Field>Email: <ValueField>{me.email}</ValueField> </Field>
      <Field>Phone: <ValueField>{me.phoneNumber}</ValueField></Field>

      <Buttons>
        <Button onPress={() => { navigation.push('UpdateProfile') }} ><ButtonTxt>Update</ButtonTxt></Button>
        <Button onPress={handleLogOut} ><ButtonTxt>Log Out</ButtonTxt></Button>
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

const StyledImage = styled.Image`
  height: 100px;
  width: 100px;
  margin-bottom: 10px;
  border-radius: 50;
`;

const Field = styled.Text`
  color: navy;
`;

const ValueField = styled.Text`
  font-size: 25px;
`;

const Buttons = styled.View`
  flex-direction: row;
  width: 90%;
  justify-content: space-around;
`;

const Button = styled(ButtonForm)`
  background: navy;
  width: 40%;
`;

const ButtonTxt = styled(ButtonFormText)`
  color: yellowgreen;
`;
