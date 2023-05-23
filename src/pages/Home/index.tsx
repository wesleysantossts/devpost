import React from 'react';
import {View, Text} from 'react-native';
import {Container, ButtonPost} from './styles';

import {useNavigation} from '@react-navigation/native';

import Feather from 'react-native-vector-icons/Feather';

export default function Home() {
  const navigation = useNavigation();
  return (
    <Container>
      <Text>Home</Text>
      <ButtonPost
        activityOpacity={0.8}
        onPress={() => navigation.navigate('NewPost')}>
        <Feather name="edit-2" size={36} color="white" />
      </ButtonPost>
    </Container>
  );
}
