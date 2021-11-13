import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components/native';

import { addTodo } from '../../state/slices/todos.slice';
import { RootState } from '../../state/root.reducer';
import { addTodoFunc } from '../../initializeApp'
import { View, Modal } from 'react-native';
import { ButtonForm, ButtonFormText, Input, InputContainer, InputIcon, ModalView, Row, StyledText, WrapperModal } from '../../constants/StyledComponents';
import { FontAwesome } from '@expo/vector-icons';
import ChooseColor from './ChooseColor'


export default function ModalAddTodo({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUrgent, setUrgent] = useState(false);
  const [isError, setError] = useState(false);
  const [color, setColor] = useState('lightcyan');


  const { me } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (title) setError(false);
  }, [title])

  const handleAddTodo = () => {
    const todo = { title: title, description: description, userId: me.email, important: isUrgent, color: color };
    if (title === '') setError(true);

    if (title) {

      addTodoFunc(todo)
        .then(res => {
          const todo = res.data;
          dispatch(addTodo(todo));
          setTitle('');
          setDescription('');
          navigation.goBack();
        })
        .catch((error) => {
          alert("something went wrong")
        });
    }
  }

  return (
    <View >
      <Modal
        transparent={true}
      >
        <WrapperModal >
          <ModalView >
            <InputContainer>
              <InputIcon name='plus' />
              <Input
                placeholder="Title"
                onChangeText={text => setTitle(text)}
                defaultValue={title}
              />
            </InputContainer>

            <InputContainer>
              <InputIcon name='comment' />
              <Input
                placeholder="Description"
                onChangeText={text => setDescription(text)}
                defaultValue={description}
              />
            </InputContainer>

            <Row style={{ justifyContent: "flex-start" }}>
              <IsImportantBox onPress={() => setUrgent(!isUrgent)}>
                {isUrgent ? (<BtnText><FontAwesome name='check' /> </BtnText>) : null}
              </IsImportantBox>
              <StyledText style={{ color: "greenyellow", fontSize: 18, marginTop: 10 }}>Important</StyledText>
            </Row>

            <ChooseColor currentColor={color} setColor={setColor}></ChooseColor>

            {isError ? <StyledText style={{ color: "red" }}>Title is required!</StyledText> : null}

            <Row>
              <ButtonForm style={{ width: 90, backgroundColor: "grey" }} onPress={() => { navigation.goBack() }}
              ><ButtonFormText>Cancel</ButtonFormText></ButtonForm>
              <ButtonForm style={{ width: 90 }} onPress={handleAddTodo} ><ButtonFormText>Add</ButtonFormText></ButtonForm>
            </Row>

          </ModalView>
        </WrapperModal>
      </Modal>
    </View >
  );
}

const IsImportantBox = styled.TouchableOpacity`
  background: ${props => (props.done ? "lightgreen" : "white")};
  width: 30px;
  height: 20px;
  margin: 12px;
  /* margin-left: 10px; */
  align-self: flex-start;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;
`;

const BtnText = styled.Text`
  color: navy;
  font-weight: bold;
  text-align: center;
`;


