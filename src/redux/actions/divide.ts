import { AssignFriend, ItemDivide } from '@src/types/states/divide';

export const setDivideItems = ({ title, items }: { title?: string | null; items?: ItemDivide[] | null }) => ({
  type: 'SET_DIVIDE_ITEMS',
  title: title,
  items: items,
});

export const setAssignedFriends = ({ friends }: { friends: AssignFriend[] }) => ({
  type: 'SET_ASSIGNED_FRIENDS',
  friends: friends,
});
