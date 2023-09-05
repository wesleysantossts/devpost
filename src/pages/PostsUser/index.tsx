import React, {useState, useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

export default function PostsUser() {
  const route = useRoute();
  const navigation = useNavigation();
  const [title, setTitle] = useState(route.params?.title);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title ?? '',
    });
  }, [navigation, title]);

  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
