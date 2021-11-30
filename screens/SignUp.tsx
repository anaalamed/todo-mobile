import React from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import styled from 'styled-components/native';
import { ButtonForm, ButtonFormText, Input, InputContainer, InputIcon, StyledText } from '../constants/StyledComponents';
import { registerFunc } from '../initializeApp'

export default function SignupScreen({ navigation }) {

    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        registerFunc(data)
            .then(res => {
                console.log(res);
                alert('registration successfuly')
                navigation.push('Root');
            })
            .catch((error) => {
                alert('something went wrong');
            });
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const phoneRegex = /^[0-9()-]+$/;


    return (
        <Box>
            <Form>
                <Controller
                    name="name"
                    defaultValue=""
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <InputContainer>
                            <InputIcon name='user' style={{ fontSize: 23 }} />
                            <Input
                                onChangeText={onChange}
                                value={value}
                                placeholder='name'
                            />
                        </InputContainer>
                    )}
                />
                {errors.name && <Error>Name is required.</Error>}

                <Controller
                    name="email"
                    defaultValue=""
                    control={control}
                    rules={{
                        required: true,
                        minLength: 8,
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
                        maxLength: 100,
                        pattern: passwordRegex
                    }}
                    render={({ field: { onChange, value } }) => (
                        <InputContainer>
                            <InputIcon name='lock' style={{ fontSize: 25 }} />
                            <Input
                                onChangeText={onChange}
                                value={value}
                                placeholder='password'
                            />
                        </InputContainer>
                    )}

                />
                {errors.password && <Error>Password must be at least 6 characters long, contain at least one number and one letter.</Error>}

                <ButtonForm title="Submit" onPress={handleSubmit(onSubmit)} ><ButtonFormText>Sign Up</ButtonFormText></ButtonForm>
            </Form>
        </Box>
    );
}


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

