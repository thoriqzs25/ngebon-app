import { FriendDocument } from '@src/types/collection/friendsCollection';
import { UserDocument } from '@src/types/collection/usersCollection';
import { UserReducerState } from '@src/types/states/user';
import { db, storage } from 'firbaseConfig';
import { FieldValue, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getAllUsers } from './userCollection';

export const addNewFriend = async ({
  userId,
  friendId,
  userUname,
  friendUname,
}: {
  userId: string;
  friendId: string;
  userUname: string;
  friendUname: string;
}) => {
  const userRef = doc(db, 'friends', `${userId}`);
  const friendRef = doc(db, 'friends', `${friendId}`);

  await updateDoc(userRef, {
    allFriends: arrayUnion(friendUname),
  });

  await updateDoc(friendRef, {
    allFriends: arrayUnion(userUname),
  });
};

export const getFriendCollection = async (userId: string) => {
  const userRef = doc(db, 'friends', `${userId}`);

  const friends = await getDoc(userRef).then((friends) => {
    return friends.data() as FriendDocument | null;
  });

  const users = await getAllUsers();
  let friendList: UserDocument[] = [];

  users.map((user, idx) => {
    if (friends?.allFriends.includes(user.username)) friendList.push(user);
  });

  return friendList;
};
