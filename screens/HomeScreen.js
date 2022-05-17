import { StyleSheet } from 'react-native';
import React from 'react';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = (props) => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error);
        alert(errorMessage);
      });
  }

  return (
    <Layout flex style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Layout style={styles.buttonContainer}>
        <Button style={styles.button} onPress={handleSignOut} appearance='outline' status='warning' accessoryRight={<Icon {...props} name='lock-outline' />}>
          Log Out
        </Button>
      </Layout>
    </Layout>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    padding: 10,
  },
  buttonContainer: {
    width: '60%',
    marginStart: 'auto',
    marginEnd: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  button: {
    marginTop: 4,
    minWidth: '100%'
  }
})