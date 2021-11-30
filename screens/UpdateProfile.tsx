import React, { useState } from "react";
import { Text, View, TextInput, Button, Alert, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import styled from 'styled-components/native';
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import { ButtonForm, ButtonFormText, Input, InputContainer, InputIcon } from '../constants/StyledComponents';
import { RootState } from "../state/root.reducer";
import { updatedProfile, bgColorChoosen } from "../state/slices/users.slice";
import { updateUserFunc } from '../initializeApp';
import UploadPhoto from '../components/ProfileScreen/UploadPhoto';
import ColorPicker from '../components/ProfileScreen/ColorPicker';


export default function UpdateProfileScreen({ navigation }) {

    const dispatch = useDispatch();
    const { control, handleSubmit, formState: { errors } } = useForm();
    const { me } = useSelector((state: RootState) => state.users);
    const [color, setColor] = useState(me.bgColor);
    const [photoUrl, setPhotoUrl] = useState(me.photoURL || 'https://sharedigitalcard.com/user/uploads/user.png');


    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const phoneRegex = /^[0-9()-]+$/;
    const urlRegex = /^(https?:\/\/)?[0-9a-zA-Z]+\.[-_0-9a-zA-Z]+\.[0-9a-zA-Z]+$/;

    const onSubmit = (data) => {
        const auth = getAuth();

        updateUserFunc({ id: me.id, bgColor: color, photoURL: photoUrl, ...data })
            .then(res => {
                dispatch(updatedProfile({ id: me.id, email: me.email, photoURL: photoUrl, ...data }))
                dispatch(bgColorChoosen(color));
                navigation.push('Root');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <ScrollView style={{ backgroundColor: 'navy' }}
        // centerContent={true}
        >
            <Box>
                <UploadPhoto photoUrl={photoUrl} setPhotoUrl={setPhotoUrl}></UploadPhoto>
                <Form>

                    <Controller
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
                        defaultValue={me.phoneNumber}
                    />
                    {errors.phoneNumber && <Text>This is not valid.</Text>}

                    {/* <Controller
                        control={control}
                        rules={{
                            minLength: 8,
                            // pattern: urlRegex
                        }}
                        render={({ field: { onChange, value } }) => (
                            <InputContainer>
                                <InputIcon name='camera' />
                                <Input
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder='avatar url'
                                />
                            </InputContainer>
                        )}
                        name="photoURL"
                        defaultValue={me.photoURL}
                    />
                    {errors.photoURL && <Text>This is not valid.</Text>} */}

                    <Controller
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
                        defaultValue={me.about}
                    />
                    {errors.about && <Text>This is not valid.</Text>}


                    <ColorPicker currentColor={color} setColor={setColor}></ColorPicker>

                    <ButtonForm title="Submit" onPress={handleSubmit(onSubmit)} ><ButtonFormText>Update</ButtonFormText></ButtonForm>
                </Form>
            </Box>
        </ScrollView>
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
  width: 90%;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

