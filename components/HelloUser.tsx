import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components/native';
import { Title } from '../constants/StyledComponents';


import { Text, View } from './Themed';
import { RootState } from '../state/root.reducer';

export default function HelloUser() {
  const { me } = useSelector((state: RootState) => state.users);

  return (
    <Box >
      <Title>Hi, {me?.displayName ? me.displayName : 'guest'}</Title>
    </Box>
  );
}

const Box = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;