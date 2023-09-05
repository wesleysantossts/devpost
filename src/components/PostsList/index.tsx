import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

import {
  Container,
  Header,
  Avatar,
  Name,
  ContentView,
  Content,
  Actions,
  LikeButton,
  Like,
  TimePost,
} from './styles';

import {formatDistance} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import {useNavigation} from '@react-navigation/native';

export default function PostsList({data, userId}: any) {
  const navigation = useNavigation();
  const [likePost, setLikePost] = useState(data?.likes);

  async function handleLikePost(id: any, likes: any) {
    const docId = `${userId}_${id}`;
    const postsRef = firestore().collection('posts');
    const likesRef = firestore().collection('likes');

    const doc = await likesRef.doc(docId).get();
    const postDoc = postsRef.doc(id);
    const postData: any = (await postDoc.get()).data();

    // remover o like se ele já existir
    if (doc.exists) {
      if (postData.likes === 0) {
        await likesRef.doc(docId).delete();

        // dar like se ele não existir
        await likesRef.doc(docId).set({
          postId: id,
          userId: userId,
        });

        await postDoc.update({
          likes: likes + 1,
        });
        setLikePost(likes + 1);
        return;
      }
      await postDoc.update({
        likes: likes - 1,
      });

      await likesRef.doc(docId).delete();
      setLikePost(likes - 1);
      return;
    }

    // dar like se ele não existir
    await likesRef.doc(docId).set({
      postId: id,
      userId: userId,
    });

    await postDoc.update({
      likes: likes + 1,
    });
    setLikePost(likes + 1);
    return;
  }

  function formatTimePost() {
    const datePost = new Date(data.created.seconds * 1000);

    return formatDistance(new Date(), datePost, {
      locale: ptBR,
    });
  }

  return (
    <Container>
      <Header
        onPress={() =>
          navigation.navigate('PostsUser', {
            title: data.autor,
            userId,
          })
        }>
        {data.avatarUrl ? (
          <Avatar source={{uri: data.avatarUrl}} />
        ) : (
          <Avatar source={require('../../assets/img/avatar.png')} />
        )}
        <Name>{data?.autor}</Name>
      </Header>
      <ContentView>
        <Content>{data?.content}</Content>
      </ContentView>
      <Actions>
        <LikeButton onPress={() => handleLikePost(data.id, likePost)}>
          <Like>{likePost}</Like>
          <Icon
            name={likePost === 0 ? 'heart-plus-outline' : 'cards-heart'}
            size={20}
            color="#e52246"
          />
        </LikeButton>
        <TimePost>{formatTimePost()}</TimePost>
      </Actions>
    </Container>
  );
}
