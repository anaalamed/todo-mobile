import React from "react";
import { View, Modal } from "react-native";
import styled from 'styled-components/native';
import { ButtonForm, ButtonFormText, StyledText, Title, Row, ModalView, WrapperModal, Buttons } from '../../constants/StyledComponents'
import { Todo } from '../../types'


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
                        <Row>
                            {todo.important ? <StyledText style={{ color: "red", fontSize: 25, paddingRight: 5 }}>!</StyledText> : null}
                            <Title style={{ textAlign: "center", paddingBottom: 20 }}> {todo.title}</Title>
                        </Row>


                        {todo.description ? (<StyledText>Description: {todo.description}</StyledText>) : null}
                        <StyledText>Done: {todo.completed ? "Oh, yes..." : "Not yet..."}</StyledText>
                        {todo.createdAt ? (<StyledText>Created at: {todo.createdAt}</StyledText>) : null}
                        {todo.updatedAt ? (<StyledText>Updated at: {todo.updatedAt}</StyledText>) : null}

                        <ColorView color={todo.color}></ColorView>
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

const ColorView = styled.View`
  width: 100%;
  height: 15px;
  background: ${(props) => props.color};

  border-top-right-radius: 10px;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 10px;
`;