import React from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import styled from 'styled-components/native';
import { ButtonForm, ButtonFormText, Input } from '../constants/StyledComponents';
import { registerFunc } from '../initializeApp'

export default function SignupScreen({ navigation }) {

    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
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

    return (
        <Box>
            <Form>
                <Controller
                    control={control}
                    rules={{
                        // required: true,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            onChangeText={onChange}
                            value={value}
                            placeholder='name'
                        />
                    )}
                    name="name"
                    defaultValue=""
                />
                {errors.name && <Text>This is not valid.</Text>}

                <Controller
                    control={control}
                    rules={{
                        // required: true,
                        // minLength: 8,
                        // pattern: emailRegex
                    }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            onChangeText={onChange}
                            value={value}
                            placeholder='email'
                        />
                    )}
                    name="email"
                    defaultValue=""
                />
                {errors.email && <Text>This is not valid.</Text>}

                <Controller
                    control={control}
                    rules={{
                        // required: true,
                        // maxLength: 100,
                        // pattern: passwordRegex
                    }}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            onChangeText={onChange}
                            value={value}
                            placeholder='password'
                        />
                    )}
                    name="password"
                    defaultValue=""
                />
                {errors.password && <Text>This is not valid.</Text>}


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

