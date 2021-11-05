import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components/native';
import { getFirestore, collection, updateDoc, doc } from "firebase/firestore";
import { FontAwesome } from '@expo/vector-icons';

import { updateTodo } from '../../state/slices/todos.slice';
import { RootState } from '../../state/root.reducer';

interface Props {
  id: string
  title: string
  setUpdate(data: boolean): void
}

const UpdateTodo: React.FC<Props> = ({ id, title, setUpdate }) => {
  const [text, setText] = useState(title);
  const dispatch = useDispatch();

  let handleUpdate = async () => {
    const db = getFirestore();
    await updateDoc(doc(db, "todos", id), {
      title: text
    });
    dispatch(updateTodo({ id: id, title: text }))
    setUpdate(false);
    setText("");
  }

  // prevent warning - Can't perform a React state update on an unmounted component. 
  useEffect(() => {
    return () => {
      handleUpdate
    }
  }, [])

  return (
    <Box>
      <Input
        placeholder="Type here your new todo!"
        onChangeText={text => setText(text)}
        defaultValue={title}
        onSubmitEditing={handleUpdate}
      />
      <Button onPress={handleUpdate}
      >
        <BtnText><FontAwesome name='pencil' /> </BtnText>
      </Button>
    </Box>
  );
}

export default UpdateTodo;

const Box = styled.View`
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;
`;

const Input = styled.TextInput`
  color: white;
  flex-direction: row;
  justify-content: space-between;
  background: #49499c;
  padding: 13px;
  padding-left: 20px;
  padding-right: 15px;
  width: 80%;

  border-top-left-radius: 50px;
  border-bottom-left-radius: 20px;
`;

const Button = styled.TouchableOpacity`
  background: #6CBF40;
  background: navy;
  width: 30px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 50px;
`;

const BtnText = styled.Text`
  color: #6CBF40;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
`;

