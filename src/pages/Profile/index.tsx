import React, {useState, useContext} from 'react';
import {View, Text} from 'react-native';
import {AuthContext} from '../../contexts/auth';
import {
  Container,
  Nome,
  Email,
  Button,
  ButtonText,
  UploadButton,
  UploadText,
  Avatar,
} from './styles';
import Header from '../../components/Header';

export default function Profile() {
  const {signOut, user} = useContext(AuthContext);
  const [url, setUrl] = useState('');

  async function logOut() {
    await signOut();
  }
  return (
    <Container>
      <Header />
      {url ? (
        <UploadButton>
          <UploadText>+</UploadText>
          <Avatar source={{uri: url}} />
        </UploadButton>
      ) : (
        <UploadButton>
          <UploadText>+</UploadText>
        </UploadButton>
      )}
      <Nome>{user.name}</Nome>
      <Email>{user.email}</Email>
      <Button bg={'#428cfd'}>
        <ButtonText>Atualizar Perfil</ButtonText>
      </Button>
      <Button bg={'#bbb'} onPress={logOut}>
        <ButtonText color={'#353840'}>Sair</ButtonText>
      </Button>
    </Container>
  );
}
