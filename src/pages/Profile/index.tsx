import React, {useState, useContext} from 'react';
import {View, Text, Modal, Platform} from 'react-native';
import firestore from '@react-native-firebase/firestore';
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
  ModalContainer,
  ButtonBack,
  Input,
} from './styles';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';

export default function Profile() {
  const {signOut, user, setUser, storageUser} = useContext(AuthContext);
  const [url, setUrl] = useState('');
  const [nome, setNome] = useState(user.name);
  const [open, setOpen] = useState(false);

  async function logOut() {
    await signOut();
  }

  async function updateProfile() {
    if (nome === '') {
      return;
    }

    await firestore().collection('users').doc(user.uid).update({
      name: nome,
    });

    const postDocs = await firestore()
      .collection('posts')
      .where('userId', '==', user.uid)
      .get();

    if (postDocs.empty) return;

    postDocs.docs.forEach(async doc => {
      await firestore().collection('posts').doc(doc.id).update({
        autor: nome,
      });
    });

    const data = {
      uid: user.uid,
      name: nome,
      email: user.email,
    };

    setUser(data);
    storageUser(data);
    setOpen(false);
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
      <Button bg={'#428cfd'} onPress={() => setOpen(true)}>
        <ButtonText>Atualizar Perfil</ButtonText>
      </Button>
      <Button bg={'#bbb'} onPress={logOut}>
        <ButtonText color={'#353840'}>Sair</ButtonText>
      </Button>

      <Modal visible={open} animationType="slide" transparent={true}>
        <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
          <ButtonBack onPress={() => setOpen(false)}>
            <Feather name="arrow-left" size={22} color="#121212" />
            <ButtonText color="#121212">Voltar</ButtonText>
          </ButtonBack>
          <Input
            placeholder="Digite seu nome"
            value={nome}
            onChangeText={item => setNome(item)}
          />
          <Button bg={'#428cfd'} onPress={() => updateProfile()}>
            <ButtonText>Salvar</ButtonText>
          </Button>
        </ModalContainer>
      </Modal>
    </Container>
  );
}
