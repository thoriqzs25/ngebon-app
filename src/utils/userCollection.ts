import { setUser } from '@src/redux/actions/user';
import { store } from '@src/redux/store';
import { UserDocument } from '@src/types/collection/usersCollection';
import { db } from 'firbaseConfig';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const getUser = async (userId: string) => {
  const user = await getDoc(doc(db, 'users', `${userId}`)).then((user) => {
    return user.data() as UserDocument | null;
  });

  if (user) {
    store.dispatch(
      setUser({
        email: user.email,
        uid: userId,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        payments: user.payments,
      })
    );
  }

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

export const getAllUsers = async () => {
  const usersRef = collection(db, 'users');
  const users = await getDocs(usersRef);

  let usersList: UserDocument[] = [];
  users.forEach((user) => {
    if (user.data().username !== '') usersList.push(user.data() as UserDocument);
  });

  return usersList;
};
