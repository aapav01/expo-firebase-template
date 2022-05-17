import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Layout, Input, Button, Icon } from '@ui-kitten/components';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) navigation.replace("Home");
    });
  });

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('Signed Up with: ' + user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('Logged In with: ' + user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  return (
    <Layout flex>
      <KeyboardAvoidingView style={styles.container} behavior="padding" >
        <Layout style={styles.inputContainer}>
          <Input
            placeholder='Email'
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          />
          <Input
            placeholder='Password'
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </Layout>
        <Layout style={styles.buttonContainer}>
          <Button style={styles.button} appearance='outline' onPress={handleSignIn} status='success' accessoryRight={<Icon {...props} name='edit-2-outline' />}>Login</Button>
          <Button style={styles.button} appearance='outline' onPress={handleSignUp} status='danger' accessoryRight={<Icon {...props} name='file-text-outline' />}>Register</Button>
        </Layout>
      </KeyboardAvoidingView>
    </Layout>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '80%',
    // flex: 1,
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  buttonContainer: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  button: {
    marginTop: 4,
    minWidth: '100%'
  }
});