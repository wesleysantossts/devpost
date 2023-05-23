/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {ActivityIndicator} from 'react-native';
import {Text} from 'react-native';
import {
  Container,
  Title,
  Input,
  Button,
  ButtonText,
  SignupButton,
  SignupText,
} from './styles';

import {AuthContext} from '../../contexts/auth';

type UserType = {
  nome: string;
  email: string;
  senha: string;
};

export default function Login() {
  const {signUp, signIn, loadingAuth} = useContext(AuthContext);
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState<UserType>({
    nome: '',
    email: '',
    senha: '',
  });

  function toggleLogin() {
    setLogin(!login);
    setUser({
      nome: '',
      email: '',
      senha: '',
    });
  }

  async function handleSignin() {
    if (!user.email || !user.senha) {
      return console.log('Insira o email e a senha');
    }

    await signIn(user.email, user.senha);
  }

  async function handleSignup() {
    if (!user.nome || !user.email || !user.senha) {
      return console.log('Insira o todos os campos');
    }
    await signUp(user.nome, user.email, user.senha);
  }

  if (login) {
    return (
      <Container>
        <Title>
          Dev<Text style={{color: '#E52246'}}>Post</Text>
        </Title>
        <Input
          placeholder="seuemail@teste.com"
          value={user.email}
          onChangeText={(text: any) =>
            setUser(item => ({...item, email: text}))
          }
        />
        <Input
          placeholder="******"
          value={user.senha}
          onChangeText={(text: any) =>
            setUser(item => ({...item, senha: text}))
          }
        />
        <Button onPress={handleSignin}>
          {loadingAuth ? (
            <ActivityIndicator size={22} color="#fff" />
          ) : (
            <ButtonText>Acessar</ButtonText>
          )}
        </Button>
        <SignupButton onPress={toggleLogin}>
          <SignupText>Criar uma conta</SignupText>
        </SignupButton>
      </Container>
    );
  }

  return (
    <Container>
      <Title>
        Dev<Text style={{color: '#E52246'}}>Post</Text>
      </Title>
      <Input
        placeholder="Seu nome"
        value={user.nome}
        onChangeText={(text: any) => setUser(item => ({...item, nome: text}))}
      />
      <Input
        placeholder="seuemail@teste.com"
        value={user.email}
        onChangeText={(text: any) => setUser(item => ({...item, email: text}))}
      />
      <Input
        placeholder="******"
        value={user.senha}
        onChangeText={(text: any) => setUser(item => ({...item, senha: text}))}
      />
      <Button onPress={handleSignup}>
        {loadingAuth ? (
          <ActivityIndicator size={22} color="#fff" />
        ) : (
          <ButtonText>Cadastrar</ButtonText>
        )}
      </Button>
      <SignupButton onPress={toggleLogin}>
        <SignupText>Já tenho uma conta</SignupText>
      </SignupButton>
    </Container>
  );
}
