import React, {useState, useLayoutEffect, useCallback, useContext} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import PostsList from '../../components/PostsList';
import {Container, ListPosts} from './styles';
import {AuthContext} from '../../contexts/auth';

export default function PostsUser() {
  const {user} = useContext(AuthContext);
  const route = useRoute();
  const navigation = useNavigation();
  const [title, setTitle] = useState(route.params?.title);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title ?? '',
    });
  }, [navigation, title]);

  useFocusEffect(
    useCallback((): any => {
      let isActive = true;

      const postsRef = firestore().collection('posts');
      postsRef
        .where('userId', '==', route.params?.userId)
        .orderBy('created', 'desc')
        .get()
        .then(snapshot => {
          const postList: any = [];
          snapshot.docs.map((u, i) => {
            postList.push({
              ...u.data(),
              id: u.id,
            });
          });
          if (isActive) {
            console.log(postList);
            setPosts(postList);
            setLoading(false);
          }
        });

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <Container>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={50} color="#e52246" />
        </View>
      ) : (
        <ListPosts
          showsVerticalIndicator={false}
          data={posts}
          renderItem={({item}) => <PostsList data={item} userId={user.uid} />}
        />
      )}
    </Container>
  );
}
