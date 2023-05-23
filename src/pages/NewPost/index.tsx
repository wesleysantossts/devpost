import React, {useState, useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {Button, ButtonText, Container, Input} from './styles';

import {useNavigation} from '@react-navigation/native';

export default function NewPost() {
  const [post, setPost] = useState('');
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button>
          <ButtonText>Compartilhar</ButtonText>
        </Button>
      ),
    });
  }, [navigation, post]);
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
