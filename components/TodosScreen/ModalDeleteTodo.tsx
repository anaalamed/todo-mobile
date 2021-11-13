import React from "react";
import { View, Modal } from "react-native";
import styled from 'styled-components/native';
import { ButtonForm, ButtonFormText, Buttons, ModalView, StyledText, WrapperModal } from '../../constants/StyledComponents'

interface Props {
    isModalVisible: boolean
    setModalVisible(data: boolean): void
    setMenulVisible(data: boolean): void
    title: string
    handleDelete(): void
}

const ModalDeleteTodo: React.FC<Props> = ({ isModalVisible, setMenulVisible, setModalVisible, handleDelete, title }) => {

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
                            <ButtonForm style={{ width: 90, backgroundColor: "grey" }} onPress={() => { setModalVisible(false), setMenulVisible(false) }} ><ButtonFormText>No</ButtonFormText></ButtonForm>
                            <ButtonForm style={{ width: 90 }} onPress={() => { handleDelete(), setModalVisible(false) }} ><ButtonFormText>Yes</ButtonFormText></ButtonForm>
                        </Buttons>

                    </ModalView>
                </WrapperModal>
            </Modal>
        </View >
    );
}

export default ModalDeleteTodo;