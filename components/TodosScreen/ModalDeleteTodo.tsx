import React from "react";
import { Button, View, Modal } from "react-native";
import styled from 'styled-components/native';
import { ButtonForm, ButtonFormText, StyledText } from '../../constants/StyledComponents'

interface Props {
    isModalVisible: boolean
    setModalVisible(data: boolean): void
    title: string
    handleDelete(): void
}

const ModalDeleteTodo: React.FC<Props> = ({ isModalVisible, setModalVisible, handleDelete, title }) => {

    return (
        <View >
            <Modal
                visible={isModalVisible}
                transparent={true}
            >
                <WrapperModal >
                    <ModalView >
                        <StyledText>Are you sure you want to delete this todo: {title}?</StyledText>

                        <Buttons>
                            <ButtonForm onPress={() => { handleDelete(), setModalVisible(false) }} ><ButtonFormText>Yes</ButtonFormText></ButtonForm>
                            <ButtonForm onPress={() => setModalVisible(false)} ><ButtonFormText>No</ButtonFormText></ButtonForm>
                        </Buttons>

                    </ModalView>
                </WrapperModal>
            </Modal>
        </View >
    );
}

export default ModalDeleteTodo;

const WrapperModal = styled.View`
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
`;

const ModalView = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: greenyellow;
  padding: 20px;
  margin: 50px;
  margin-top: 250;
  margin-bottom: 250;

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