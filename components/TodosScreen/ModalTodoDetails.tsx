import React from "react";
import { Button, View, Modal } from "react-native";
import styled from 'styled-components/native';
import { ButtonForm, ButtonFormText, StyledText, Title } from '../../constants/StyledComponents'
import todosSlice from "../../state/slices/todos.slice";
import dayjs from 'dayjs';

interface Todo {
    id: string
    title: string
    completed: boolean
    userId: string
    description?: string
    createdAt: Date
    updatedAt?: Date
}

interface Props {
    // isModalVisible: boolean
    setModalVisible(data: boolean): void
    todo: Todo
}

const ModalTodoDetails: React.FC<Props> = ({ setModalVisible, todo }) => {

    return (
        <View >
            <Modal
                // visible={isModalVisible}
                transparent={true}
            >
                <WrapperModal >
                    <ModalView >
                        <Title style={{ color: "navy", textAlign: "center", paddingBottom: 20 }}> {todo.title}</Title>
                        {todo.description ? (<StyledText>Description: {todo.description}</StyledText>) : null}
                        <StyledText>Done: {todo.completed ? "Oh, yes..." : "Not yet..."}</StyledText>
                        {todo.createdAt ? (<StyledText>Created at: {todo.createdAt}</StyledText>) : null}
                        {todo.updatedAt ? (<StyledText>Updated at: {todo.updatedAt}</StyledText>) : null}

                        <Buttons>
                            <ButtonForm style={{ width: 90 }} onPress={() => { setModalVisible(false) }} ><ButtonFormText>Ok</ButtonFormText></ButtonForm>
                        </Buttons>

                    </ModalView>
                </WrapperModal>
            </Modal>
        </View >
    );
}

export default ModalTodoDetails;

const WrapperModal = styled.View`
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
`;

const ModalView = styled.View`
  /* flex: 1; */
  flex-direction: column;
  justify-content: center;
  /* align-items: flex-start; */
  background: greenyellow;
  padding: 20px;
  margin: 50px;
  margin-top: 150;
  margin-bottom: 150;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;
`;

const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;