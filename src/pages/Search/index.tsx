import React, {useEffect, useState} from 'react';
import {Container, AreaInput, Input, List} from './styles';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import SearchList from '../../components/SearchList';

export default function Search() {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (function subscribe() {
      if (input === '' || input === undefined) {
        setUsers([]);
        return;
      }
      firestore()
        .collection('users')
        .where('name', '>=', input)
        .where('name', '<=', input + '\uf8ff')
        .onSnapshot(
          (snapshot: any) => {
            const listUsers: any = [];
            snapshot.forEach((doc: any) => {
              listUsers.push({
                ...doc.data(),
                id: doc.id,
              });
            });

            setUsers(listUsers);
          },
          error => setUsers([]),
        );
    })();
  }, [input]);

  return (
    <Container>
      <AreaInput>
        <Feather name="search" size={20} color="#e52246" />
        <Input
          placeholder="Procurando alguém?"
          value={input}
          onChangeText={item => setInput(item)}
          placeholderTextColor="#353840"
        />
      </AreaInput>
      <List
        data={users}
        renderItem={({item}: any) => <SearchList data={item} />}
      />
    </Container>
  );
}
