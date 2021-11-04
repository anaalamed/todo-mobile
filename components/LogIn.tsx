import React from "react";
import { Text, View, TextInput, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import styled from 'styled-components/native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";

import { loggedIn } from '../state/slices/users.slice'
import { ButtonForm, ButtonFormText, Input } from '../constants/StyledComponents';


interface Props {
    setLogIn(data: boolean): void
    setProfile(data: boolean): void
}

const LogIn: React.FC<Props> = ({ setLogIn, setProfile }) => {

    const dispatch = useDispatch();
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.providerData)
                dispatch(loggedIn(user.providerData[0]));
                setLogIn(false);
                setProfile(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert('something went wrong');
            });
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (
        <Box>
            <Title>Log In</Title>

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


            <ButtonForm title="Submit" onPress={handleSubmit(onSubmit)} ><ButtonFormText>Log In</ButtonFormText></ButtonForm>

            <Text>ana@gmail.com</Text>
            <Text>123456</Text>
        </Box >
    );
}

export default LogIn;

const Box = styled.View`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
