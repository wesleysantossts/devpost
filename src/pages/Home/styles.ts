import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const ButtonPost = styled.TouchableOpacity`
  position: absolute;
  bottom: 5%;
  right: 5%;
  background-color: #36393f;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

export const ListPosts = styled.FlatList`
  flex: 1;
  background-color: #f1f1f1;
`;
