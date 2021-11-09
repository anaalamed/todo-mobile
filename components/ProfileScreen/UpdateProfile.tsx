import React from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import styled from 'styled-components/native';
import { getAuth } from "firebase/auth";
import { ButtonForm, ButtonFormText, Input } from '../../constants/StyledComponents';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/root.reducer";
import { loggedIn, updatedProfile } from "../../state/slices/users.slice";
import { updateUserFunc } from '../../initializeApp'


interface Props {
    setProfile(data: boolean): void
    setUpdateProfile(data: boolean): void
}

const SignUp: React.FC<Props> = ({ setProfile, setUpdateProfile }) => {
    const dispatch = useDispatch();
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { me } = useSelector((state: RootState) => state.users);

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const phoneRegex = /^[0-9()-]+$/;
    const urlRegex = /^(https?:\/\/)?[0-9a-zA-Z]+\.[-_0-9a-zA-Z]+\.[0-9a-zA-Z]+$/;

    const onSubmit = (data) => {
        const auth = getAuth();

        updateUserFunc({ id: me.id, ...data })
            .then(res => {
                dispatch(updatedProfile({ id: me.id, email: me.email, ...data }))
                setUpdateProfile(false);
                setProfile(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Box>
            <Title>Update Profile</Title>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, value } }) => (
                    <Input
                        onChangeText={onChange}
                        value={value}
                        placeholder='name'
                    />
                )}
                name="name"
                defaultValue={me.name}
            />
            {errors.name && <Text>This is not valid.</Text>}

            {/* <Controller
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
                defaultValue={me.email}
            />
            {errors.email && <Text>This is not valid.</Text>} */}

            <Controller
                control={control}
                rules={{
                    minLength: 8,
                    pattern: phoneRegex
                }}
                render={({ field: { onChange, value } }) => (
                    <Input
                        onChangeText={onChange}
                        value={value}
                        placeholder='mobile'
                    />
                )}
                name="phoneNumber"
                defaultValue={me.phoneNumber}
            />
            {errors.phoneNumber && <Text>This is not valid.</Text>}

            <Controller
                control={control}
                rules={{
                    minLength: 8,
                    // pattern: urlRegex
                }}
                render={({ field: { onChange, value } }) => (
                    <Input
                        onChangeText={onChange}
                        value={value}
                        placeholder='avatar url'
                    />
                )}
                name="photoURL"
                defaultValue={me.photoURL}
            />
            {errors.photoURL && <Text>This is not valid.</Text>}

            <ButtonForm title="Submit" onPress={handleSubmit(onSubmit)} ><ButtonFormText>Update</ButtonFormText></ButtonForm>

        </Box>
    );
}

export default SignUp;


const Box = styled.View`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

