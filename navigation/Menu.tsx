import { FontAwesome } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { Divider, Menu } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import HelloUser from "../components/HelloUser";
import { RootState } from "../state/root.reducer";
import { removeTodos } from "../state/slices/todos.slice";
import { loggedOut } from "../state/slices/users.slice";
import styled from 'styled-components/native';


const CustomMenu = ({ navigation }) => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const { me, loggedIn } = useSelector((state: RootState) => state.users);

    const handleLogOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            dispatch(loggedOut());
            dispatch(removeTodos());
            setShowMenu(false);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <View >
            <StyledMenu
                visible={showMenu}
                onDismiss={() => setShowMenu(false)}
                anchor={
                    <TouchableOpacity onPress={() => setShowMenu(true)}
                        style={{ flexDirection: 'row' }} >

                        <HelloUser></HelloUser>
                        {me.photoURL ? (
                            <Image style={{ width: 30, height: 30, borderRadius: 50, margin: 10 }} source={{ uri: me.photoURL }} />
                        ) : (
                                <FontAwesome
                                    name="user-circle"
                                    size={25}
                                    style={{ marginRight: 15, marginLeft: 10 }}
                                />
                            )}

                    </TouchableOpacity>
                }
                contentStyle={styles.content}
            >
                {loggedIn ? (
                    <>
                        <Menu.Item style={styles.item} titleStyle={styles.title} onPress={() => { navigation.navigate('Profile'); setShowMenu(false) }} title="My Profile" />
                        <Menu.Item style={styles.item} titleStyle={styles.title} onPress={handleLogOut} title="Log Out" />
                    </>
                ) : (
                        <>
                            <Menu.Item style={styles.item} titleStyle={styles.title} onPress={() => { navigation.navigate('SignUp'); setShowMenu(false) }} title="Sign Up" />
                            <Menu.Item style={styles.item} titleStyle={styles.title} onPress={() => { navigation.navigate('LogIn'); setShowMenu(false) }} title="Log In" />
                        </>
                    )}
                <Divider />
            </StyledMenu>
        </View >
    );
};

export default CustomMenu;

const StyledMenu = styled(Menu)`
  position: absolute;
  right: 0;
  top: 63px;
  /* border: 1px solid navy; */
  background: navy;
`;

const styles = StyleSheet.create({
    content: {
        backgroundColor: "greenyellow",
    },
    item: {
        backgroundColor: "greenyellow",
    },
    title: {
        color: "navy",
        fontWeight: "bold"
    }
})