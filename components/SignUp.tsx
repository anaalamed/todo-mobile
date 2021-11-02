import React from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import styled from 'styled-components/native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

interface Props {
    setLogIn: void
}
export default function SignUp() {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert('something went wrong');
            });

    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    return (
        <Box>
            <Title>Sign Up</Title>

            <Controller
                control={control}
                rules={{
                    required: true,
                    minLength: 8,
                    pattern: emailRegex
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
                    required: true,
                    maxLength: 100,
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


            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </Box>
    );
}


const Box = styled.View`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const Input = styled.TextInput`
  background: gray;
  color: white;
  padding: 20px;
  width: 85%;
  margin: 10px;
`;