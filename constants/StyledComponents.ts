import styled from 'styled-components/native';
import { FontAwesome } from "@expo/vector-icons";


export const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: greenyellow;
  margin: 5px;
`;

export const Button = styled.TouchableOpacity`
  background-color: greenyellow;
  padding: 10px;
  border-radius: 10px;
  width: 100px;
  border: 1px solid navy;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;

  box-shadow: 10px 5px 5px yellow;
`;

export const ButtonText = styled.Text`
  align-items: center;
  color: navy;
  text-align: center;
  font-weight: bold;
`;

export const ButtonForm = styled.TouchableOpacity`
  background: greenyellow;
  padding: 15px;
  border-radius: 10px;
  /* width: 80px; */
  width: 90%;
  margin-top: 10px;
  border: 1px solid navy;
  margin: 20px;


  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;

  box-shadow: 10px 5px 5px yellow;
`;

export const ButtonFormText = styled.Text`
  align-items: center;
  color: navy;
  text-align: center;
  font-weight: bold;
`;

export const Separator = styled.View`
  margin: 10px;
  height: 2px;
  width: 80%;
  color: black;
  background: #7c7a7aaa;
`;

export const Input = styled.TextInput`
  background: #d5f6c6;
  border: 1px solid navy ;
  color: navy;
  padding: 15px;
  padding-left: 50px;
  width: 85%;
  margin: 10px;
  border-radius: 10px;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;

  box-shadow: 10px 5px 5px greenyellow;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  justify-content: center;

`;

export const InputIcon = styled(FontAwesome)`
  position: absolute;
  z-index: 100;
  top: 23px;
  font-size: 20px;
  left: 30px;
  color: navy;
`;

export const StyledText = styled.Text`
  font-weight: bold;
  color: greenyellow;
  text-align: center;
  padding-bottom: 10px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: center;
`;


// ------------------------------------ Modal ------------------------------------
export const WrapperModal = styled.View`
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
`;

export const ModalView = styled.View`
  /* flex: 1; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: navy;
  padding: 20px;
  margin: 50px;
  margin-top: 150px;
  margin-bottom: 150px;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;
`;

export const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;