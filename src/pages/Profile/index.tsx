import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';

import {AuthContext} from '../../contexts/auth';

export default function Profile() {
  const {signOut} = useContext(AuthContext);

  async function logOut() {
    await signOut();
  }
  return (
    <View>
      <Text>Profile</Text>
      <Button title="Sair" onPress={logOut} />
    </View>
  );
}
