import React, {useState, useCallback, useContext} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Container, ButtonPost, ListPosts} from './styles';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import PostsList from '../../components/PostsList';
import Header from '../../components/Header';

import {AuthContext} from '../../contexts/auth';

export default function Home() {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<any>([]);
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [lastItem, setLastItem] = useState('');
  const [emptyList, setEmptyList] = useState(false);

  let isActive = true;
  async function fetchPosts() {
    try {
      const postsDb: any = await firestore()
        .collection('posts')
        .orderBy('created', 'desc')
        .limit(5)
        .get();

      if (isActive) {
        setPosts([]);
        const postList: any[] = [];

        postsDb.docs.map((item: any) => {
          postList.push({
            ...item.data(),
            id: item.id,
          });
        });

        setEmptyList(!!postsDb.empty);
        setPosts(postList);
        setLastItem(postsDb.docs[postsDb.docs.length - 1]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRefreshPosts() {
    try {
      setLoadingRefresh(true);
      const postsDb: any = await firestore()
        .collection('posts')
        .orderBy('created', 'desc')
        .limit(5)
        .get();

      setPosts([]);
      const postList: any[] = [];

      postsDb.docs.map((item: any) => {
        postList.push({
          ...item.data(),
          id: item.id,
        });
      });

      setEmptyList(false);
      setPosts(postList);
      setLastItem(postsDb.docs[postsDb.docs.length - 1]);
      setLoading(false);
      setLoadingRefresh(false);
    } catch (error) {
      console.log(error);
    }
  }

  // Só vai ser chamado se for a primeira renderização OU se o usuário sair da tela e entrar na tela de novo
  useFocusEffect(
    useCallback(() => {
      fetchPosts();

      // usado para ser mostrado só quando o componente é desmontado
      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <Container>
      <Header />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={50} color={'#E52246'} />
        </View>
      ) : (
        <ListPosts
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({item}: any) => (
            <PostsList data={item} userId={user?.uid} />
          )}
          refreshing={loadingRefresh}
          onRefresh={handleRefreshPosts}
        />
      )}
      <ButtonPost
        activityOpacity={0.8}
        onPress={() => navigation.navigate('NewPost')}>
        <Feather name="edit-2" size={36} color="white" />
      </ButtonPost>
    </Container>
  );
}
