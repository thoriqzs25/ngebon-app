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

export const resetAssignedFriends = () => ({
  type: 'RESET_ASSIGNED_FRIENDS',
});

export const setTaxAndService = ({
  tax,
  service,
  totalAmount,
}: {
  tax: number;
  service: number;
  totalAmount: number;
}) => ({
  type: 'SET_TAX_AND_SERVICE',
  tax: tax,
  service: service,
  totalAmountOfDivide: totalAmount,
});
