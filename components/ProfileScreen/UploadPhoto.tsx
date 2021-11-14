import React, { useState, useEffect } from 'react';
import { Image, View, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styled from 'styled-components/native';


import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { uploadPhotoFunc } from '../../initializeApp'
import { firebase } from '@react-native-firebase/storage';
import { Button, ButtonForm, ButtonText, Row, StyledImage, StyledText } from '../../constants/StyledComponents';
import { UIImagePickerPresentationStyle } from 'expo-image-picker/build/ImagePicker.types';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/root.reducer';

interface Props {
    photoUrl: string
    setPhotoUrl(string): void,
}

const UserImagePicker: React.FC<Props> = ({ setPhotoUrl, photoUrl }) => {
    const [imageUri, setImage] = useState(null);
    const [showProgress, setShowProgress] = useState(0);
    const { id } = useSelector((state: RootState) => state.users.me);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        // choose image
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [2, 2],
            quality: 0.5,
        });

        //resize image
        if (!result.cancelled) {
            const manipResult = await manipulateAsync(
                result.uri,
                [
                    { resize: { width: 200, height: 200 } }
                ],
                { compress: 1, format: SaveFormat.PNG }
            );
            setImage(manipResult.uri);
            uploadImage(manipResult.uri);
        };
    }

    const uploadImage = async (imageUri) => {
        const storage = getStorage();
        const pic = ref(storage, `profilePhotos/${id}-profile.png`);

        const uploadUri = imageUri.replace("file://", "");

        // blob
        const response = await fetch(uploadUri)
        const blob = await response.blob();

        const uploadTask = uploadBytesResumable(pic, blob);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setShowProgress(progress);
                switch (snapshot.state) {
                    case 'paused':
                        // console.log('Upload is paused');
                        break;
                    case 'running':
                        // console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // console.log('File available at', downloadURL);
                    setPhotoUrl(downloadURL);
                });
            }
        );
    };

    return (
        <View >
            <Row>
                <StyledImage source={{ uri: photoUrl }} style={{ alignSelf: "flex-start" }} />
                <Column>
                    <Button onPress={pickImage} style={{ boxShadow: "none", width: 150, marginBottom: 10 }}>
                        <ButtonText>Pick an image</ButtonText>
                    </Button>
                    {showProgress !== 0 ? <StyledText>Upload is {showProgress.toFixed(0)}% done</StyledText> : null}

                </Column>
            </Row>

        </View>
    );
}

export default UserImagePicker;

const Column = styled.View`
  flex-direction: column;
`;

