import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

export default function PostsList({data, userId}) {
  const [likePost, setLikePost] = useState(Number(data.likes));

  function formatTimePost() {
    const datePost = new Date(data.created.seconds * 1000);

    return formatDistance(new Date(), datePost, {
      locale: ptBR,
    });
  }

  return (
    <Container>
      <Header>
        <Avatar source={require('../../assets/img/avatar.png')} />
        <Name>{data?.autor}</Name>
      </Header>
      <ContentView>
        <Content>{data?.content}</Content>
      </ContentView>
      <Actions>
        <LikeButton>
          <Like>{likePost === 0 ? '' : likePost}</Like>
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
