import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #353840;
  padding-top: 40px;
`;
export const AreaInput = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f1f1f1;
  padding: 5px 10px;
  margin: 0 10px;
  margin-bottom: 10px;
  border-radius: 12px;
`;
export const Input = styled.TextInput`
  width: 90%;
  margin: 0 0 0 8px;
  font-size: 16px;
  color: #121212;
`;

export const List = styled.FlatList`
  flex: 1;
  margin: 0 10px;
`;
