import styled from 'styled-components/native';


export const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: greenyellow;
`;

export const Button = styled.TouchableOpacity`
  background-color: greenyellow;
  padding: 10px;
  border-radius: 10px;
  width: 100px;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;
`;

export const ButtonText = styled.Text`
  align-items: center;
  color: navy;
  text-align: center;
  font-weight: bold;
`;

export const ButtonForm = styled.TouchableOpacity`
  background: navy;
  padding: 10px;
  border-radius: 10px;
  width: 80px;
  margin-top: 10px;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;
`;

export const ButtonFormText = styled.Text`
  align-items: center;
  color: greenyellow;
  text-align: center;
  font-weight: bold;
`;

export const Separator = styled.View`
  margin-top: 10px;
  height: 1px;
  width: 80%;
  color: black;
  background: #7c7a7aaa;
`;

export const Input = styled.TextInput`
  background: #d5f6c6;
  border: 1px solid navy ;
  color: navy;
  padding: 20px;
  width: 85%;
  margin: 10px;
  border-radius: 10px;
`;
