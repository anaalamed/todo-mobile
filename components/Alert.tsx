import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";
import styled from 'styled-components/native';


function ModalTester() {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={{ flex: 1 }}>
            <Button title="Show modal" onPress={toggleModal} />

            <MyModal isVisible={isModalVisible}
                backdropColor='greenyellow'
                // backdropOpacity={0.9}
                // coverScreen={false}
                // style={width}
                deviceHeight={0.5}
            >
                <View >
                    <Text>Hello!</Text>
                    <Button title="Hide modal" onPress={toggleModal} />
                </View>
            </MyModal>
        </View>
    );
}

export default ModalTester;

const MyModal = styled(Modal)`
  /* width: 70%;
  height: 10px;
  background: pink; */
  
`;