import { setUser } from '@src/redux/actions/user';
import { store } from '@src/redux/store';
import { db } from 'firbaseConfig';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const getUser = async (userId: string) => {
  const user = await getDoc(doc(db, 'users', `${userId}`)).then((user) => {
    return user.data();
  });

  if (user) {
    console.log('line 12');
    store.dispatch(setUser({ email: user.email, uid: userId, name: user.name, username: user.username }));
  }

  console.log('line 16');
  return user;
};

export const checkUserRegistered = async (userId: string) => {
  const usersRef = await getDocs(collection(db, 'users'));
  let userExists = false;

  usersRef.forEach((doc) => {
    if (doc.id === userId) {
      userExists = true;
      console.log('User exists!');
      getUser(userId);
    }
  });

  return userExists;
};
