import React from "react";
import { Text, View, TextInput, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import styled from 'styled-components/native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";

import { loggedIn } from '../state/slices/users.slice'
import { ButtonForm, ButtonFormText, Input, InputContainer, InputIcon, StyledText } from '../constants/StyledComponents';
import { getUserFunc } from '../initializeApp'
import { FontAwesome } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {

    const dispatch = useDispatch();
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const email = userCredential.user.providerData[0].email;
                getUserFunc(email)
                    .then(res => {
                        let user = res.data;
                        dispatch(loggedIn(user));
                        navigation.push('Root');
                    })
                    .catch((error) => {
                        alert('something went wrong1');
                    });
            })
            .catch((error) => {
                alert('something went wrong2');
            });
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
        <Box>
            <Form>

                <Controller
                    name="email"
                    defaultValue=""
                    control={control}
                    rules={{
                        required: true,
                        pattern: emailRegex
                    }}
                    render={({ field: { onChange, value } }) => (
                        <InputContainer>
                            <InputIcon name='envelope' />
                            <Input
                                onChangeText={onChange}
                                value={value}
                                placeholder='email'
                            />
                        </InputContainer>
                    )}
                />
                {errors.email && <Error>This is not valid.</Error>}

                <Controller
                    name="password"
                    defaultValue=""
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <InputContainer>
                            <InputIcon name='lock' style={{ fontSize: 30 }} />
                            <Input
                                onChangeText={onChange}
                                value={value}
                                placeholder='password'
                            />
                        </InputContainer>
                    )}
                />
                {errors.password && <Error>Password is required.</Error>}

                <ButtonForm title="Submit" onPress={handleSubmit(onSubmit)} ><ButtonFormText>Log In</ButtonFormText></ButtonForm>
            </Form>
        </Box >
    );
}

// export default LogIn;

const Box = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 10px;
  background: navy;
`;

const Form = styled.View`
  margin-top: 100px;
  width: 90%;
  align-items: center;
`;

const Error = styled(StyledText)`
  color: red;
`;
