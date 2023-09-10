import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #353840;
`;
export const Nome = styled.Text`
  margin: 20px 20px 0 20px;
  font-size: 28px;
  font-weight: bold;
  color: #fff;
`;
export const Email = styled.Text`
  color: #fff;
  margin: 10px 20px 20px 20px;
  font-size: 18px;
  font-style: italic;
`;
export const Button = styled.TouchableOpacity`
  width: 80%;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: ${props => props.bg};
  border-radius: 12px;
  margin: 0 0 10px 0;
`;
export const ButtonText = styled.Text`
  font-size: 18px;
  color: ${props => props.color ?? 'white'};
`;
export const UploadButton = styled.TouchableOpacity`
  background-color: #fff;
  margin-top: 15%;
  width: 165px;
  height: 165px;
  border-radius: 90px;
  justify-content: center;
  align-items: center;
`;
export const UploadText = styled.Text`
  color: black;
  font-size: 55px;
  position: absolute;
  color: #e52246;
  opacity: 0.4;
  z-index: 9;
`;
export const Avatar = styled.Image`
  width: 160px;
  height: 160px;
  z-index: 1;
  border-radius: 80px;
  opacity: 0.9;
`;
