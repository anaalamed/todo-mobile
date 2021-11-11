import React from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import styled from 'styled-components/native';
import { ButtonForm, ButtonFormText, Input, InputContainer, InputIcon } from '../constants/StyledComponents';
import { registerFunc } from '../initializeApp'

export default function SignupScreen({ navigation }) {

    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        registerFunc(data)
            .then(res => {
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
                        // required: true,
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
                {errors.name && <Text>This is not valid.</Text>}

                <Controller
                    name="email"
                    defaultValue=""
                    control={control}
                    rules={{
                        // required: true,
                        // minLength: 8,
                        // pattern: emailRegex
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
                {errors.email && <Text>This is not valid.</Text>}

                <Controller
                    name="password"
                    defaultValue=""
                    control={control}
                    rules={{
                        // required: true,
                        // maxLength: 100,
                        // pattern: passwordRegex
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
                {errors.password && <Text>This is not valid.</Text>}

                {/* <Controller
                    control={control}
                    rules={{
                        minLength: 8,
                        pattern: phoneRegex
                    }}
                    render={({ field: { onChange, value } }) => (
                        <InputContainer>
                            <InputIcon name='mobile' />
                            <Input
                                onChangeText={onChange}
                                value={value}
                                placeholder='mobile'
                            />
                        </InputContainer>
                    )}
                    name="phoneNumber"
                    defaultValue=""
                />
                {errors.phoneNumber && <Text>This is not valid.</Text>} */}

                {/* <Controller
                    control={control}
                    rules={{}}
                    render={({ field: { onChange, value } }) => (
                        <InputContainer>
                            <InputIcon name='info' />
                            <Input
                                onChangeText={onChange}
                                value={value}
                                placeholder='about'
                                multiline={true}
                                numberOfLines={4}
                            />
                        </InputContainer>
                    )}
                    name="about"
                    defaultValue=""
                />
                {errors.about && <Text>This is not valid.</Text>} */}


                <ButtonForm title="Submit" onPress={handleSubmit(onSubmit)} ><ButtonFormText>Sign Up</ButtonFormText></ButtonForm>
            </Form>
        </Box>
    );
}

// export default SignUp;


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

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

