import { UserDocument } from './usersCollection';

export type FriendDocument = {
  allFriends: Friend[] | [];
  ownRequests: Friend[] | [];
  friendRequests: Friend[] | [];
};

export type Friend = {
  status: string;
  user: UserDocument;
};
