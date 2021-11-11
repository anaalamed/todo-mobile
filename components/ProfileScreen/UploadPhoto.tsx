import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { getStorage, ref, uploadBytes } from "firebase/storage";


export default function ImagePickerExample() {
    const [imageUri, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

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
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const uploadImage = async () => {
        console.log(imageUri);
        const filename = imageUri.substring(imageUri.lastIndexOf("/") + 1);
        const uploadUri = Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri;

        // const storageRef = ref(storage);
        // const imagesRef = ref(storageRef, '../../assets/images');
        console.log(uploadUri);

        const storage = getStorage();
        console.log(storage);
        const pic = ref(storage, '../../assets/images/todo.png');
        // const pic = ref(storage, uploadUri);
        // const pic = ref(storage, '');


        // console.log(storage);
        // console.log(pic);

        // let file = put(pic);


        // uploadBytes(pic, file).then(snapshot => {
        //     console.log('Uploaded a blob or file!');
        // })




    };

    return (
        <View >
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {imageUri && <Image source={{ uri: imageUri || '' }} style={{ width: 200, height: 200 }} />}
            {/* <Image source={require('../../assets/images/todo.png')} /> */}
            <Button title="Upload" onPress={uploadImage} />

        </View>
    );
}