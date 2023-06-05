import React from 'react';
import {Text} from 'react-native';
import {Container, Button, ButtonText} from './styles';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();
  return (
    <Container>
      <Button>
        <ButtonText onPress={() => navigation.navigate('HomeTab')}>
          Dev <Text style={{fontStyle: 'italic', fontWeight: 'bold', color: '#E52246'}}>Posts</Text>
        </ButtonText>
      </Button>
    </Container>
  );
}
