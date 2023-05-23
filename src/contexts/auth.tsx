import React, {useState, useEffect, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

type UserType = {
  uid: string;
  name: string;
  email: string;
};

export default function AuthProvider({children}: any) {
  const keyStorage = '@devpost';
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);

  async function signUp(
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    setLoadingAuth(true);
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const uid = response.user.uid;
      await firestore().collection('users').doc(uid).set({
        name,
        createdAt: new Date(),
      });

      const data: any = {
        uid,
        name,
        email,
      };

      setUser(data);
      storageUser(data);
      setLoadingAuth(false);
    } catch (error) {
      console.log(error);
      setLoadingAuth(false);
    }
  }

  async function signIn(email: string, password: string) {
    setLoadingAuth(true);
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      const {uid} = response.user;
      const userProfile = await firestore().collection('users').doc(uid).get();
      const {name} = userProfile.data() as any;
      const data = {
        uid,
        name,
        email,
      };
      setUser(data);
      storageUser(data);
      setLoadingAuth(false);
    } catch (error) {
      console.log(error);
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await auth().signOut();
    await AsyncStorage.clear().then(() => setUser(null));
  }

  async function storageUser(data) {
    await AsyncStorage.setItem(keyStorage, JSON.stringify(data));
  }

  async function loadStorage() {
    const storage = await AsyncStorage.getItem(keyStorage);

    if (storage) {
      setUser(JSON.parse(storage));
      setLoading(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{signed: !!user, signUp, signIn, signOut, loadingAuth, loading}}>
      {children}
    </AuthContext.Provider>
  );
}
