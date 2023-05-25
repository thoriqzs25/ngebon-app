import { setUser } from '@src/redux/actions/user';
import { store } from '@src/redux/store';
import { Payment, UserDocument } from '@src/types/collection/usersCollection';
import { RootState } from '@src/types/states/root';
import { db } from 'firbaseConfig';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useSelector } from 'react-redux';

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

export const getUserByUsername = async (uname: string) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', `${uname}`));
  const querySnapshot = await getDocs(q);

  let user = {};
  let id = '';

  if (querySnapshot.docs.length === 1) {
    querySnapshot.forEach((doc) => {
      id = doc.id;
      user = doc.data();
    });
  } else console.log('no user found line 32');

  return { data: user, id: id };
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

export const updateUser = async (name: string, username: string, uid: string) => {
  const user = await updateDoc(doc(db, 'users', `${uid}`), {
    name: name,
    username: username,
  }).then(async () => {
    await getUser(uid);
  });
};

export const addPayment = async (payments: Payment[], uid: string) => {
  const user = await updateDoc(doc(db, 'users', `${uid}`), {
    payments: [...payments],
  });
};

export const checkUsernameRegistered = async (username: string) => {
  let isExists = false;
  const data = await getDocs(collection(db, 'users')).then((user) => {
    user.forEach((_user) => {
      const cred = _user.data() as UserDocument;
      if (cred.username === username) isExists = true;
    });
  });
  return isExists;
};
