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
        console.log(uploadUri);

        const storage = getStorage();
        // console.log(storage);

        const pic = ref(storage, 'todo.png');

        // const picRef = ref(storage, uploadUri);
        // const pic = ref(storage, '');


        // console.log(storage);
        // console.log(pic);

        // let file = put(pic);

        const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
        var file = new File(bytes, uploadUri, {
            type: "image/jpeg",
        });

        console.log(file);


        uploadBytes(pic, file).then(snapshot => {
            console.log('Uploaded a blob or file!');
        })




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