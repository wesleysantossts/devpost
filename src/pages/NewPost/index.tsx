import React, {useState, useLayoutEffect, useContext} from 'react';
import {View, Text} from 'react-native';
import {Button, ButtonText, Container, Input} from './styles';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../contexts/auth';

import {useNavigation} from '@react-navigation/native';

export default function NewPost() {
  const [post, setPost] = useState('');
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => handlePost()}>
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      ),
    });
  }, [navigation, post]);

  async function handlePost() {
    if (post === '') {
      console.log('Seu post contém conteúdo inválido.');
      return;
    }

    let avatarUrl: any = null;

    try {
      const response = await storage()
        .ref('users')
        .child(user?.uid)
        .getDownloadURL();
      avatarUrl = response;
    } catch (error) {
      avatarUrl = null;
      console.log(error);
    }

    const postCreated = await firestore().collection('posts').add({
      created: new Date(),
      content: post,
      autor: user?.name,
      userId: user.uid,
      likes: 0,
      avatarUrl,
    });

    if (postCreated) {
      console.log('Post criado com sucesso');
      navigation.goBack();
    }
  }

  return (
    <Container>
      <Input
        placeholder="O que está acontecendo?"
        autoCorrect={false}
        multiline={true}
        placeholderTextColor={'#ddd'}
        value={post}
        onChangeText={(text: any) => setPost(text)}
        maxLength={300}
      />
    </Container>
  );
}
