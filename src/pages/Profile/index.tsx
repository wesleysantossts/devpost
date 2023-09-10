import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Modal, Platform} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
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
import {launchImageLibrary} from 'react-native-image-picker';

export default function Profile() {
  const {signOut, user, setUser, storageUser} = useContext(AuthContext);
  const [url, setUrl] = useState('');
  const [nome, setNome] = useState(user.name);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async function avatarUrl() {
      try {
        const response = await storage().ref('users').child(user.uid).getDownloadURL();
        setUrl(response);
      } catch (error) {
        console.log('Foto do usuário não encontrada');
      }
    })();
  }, [])

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

    if (postDocs.empty) {
      return;
    }

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

  async function uploadFile() {
    const options = {
      noData: true,
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Cancelou');
      } else if (response.error) {
        console.log('Erro ao salvar a imagem');
      } else {
        uploadFileFirebase(response).then(() => {
          uploadAvatarPosts();
        });

        setUrl(response.assets[0].uri);
      }
    });
  }

  function getFileLocalPath(response) {
    return response.assets[0].uri;
  }

  async function uploadFileFirebase(response) {
    const fileSource = getFileLocalPath(response);
    const storageRef = storage().ref('users').child(user.uid);
    return await storageRef.putFile(fileSource);
  }

  async function uploadAvatarPosts() {
    const storageRef = storage().ref('users').child(user.uid);
    const url = await storageRef
      .getDownloadURL()
      .then(async image => {
        const postDocs = await firestore()
          .collection('posts')
          .where('userId', '==', user.uid)
          .get();

        postDocs.docs.forEach(async doc => {
          await firestore().collection('posts').doc(doc.id).update({
            avatarUrl: image,
          });
        });
      })
      .catch(error => console.log('Erro ao salvar a foto', error));
  }

  return (
    <Container>
      <Header />
      {url ? (
        <UploadButton onPress={() => uploadFile()}>
          <UploadText>+</UploadText>
          <Avatar source={{uri: url}} />
        </UploadButton>
      ) : (
        <UploadButton onPress={() => uploadFile()}>
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
