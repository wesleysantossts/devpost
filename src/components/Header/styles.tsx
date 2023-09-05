import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  width: 100%;
  height: 80px;
  background-color: #353840;
  padding-bottom: 15px;
  padding-top: 8px;
  border-bottom-width: 1px;
  border-bottom-color: #c7c7c7;
  justify-content: center;
  align-items: center;
`;
export const Button = styled.TouchableOpacity`
  height: 100%;
  padding-top: 25px;
  justify-content: center;
  align-items: center;
`;
export const ButtonText = styled.Text`
  font-size: 28px;
  font-weight: bold;
`;
