import { Payment } from '@src/types/collection/usersCollection';

export const setUser = ({
  uid,
  email,
  name,
  username,
  avatar,
  payments,
}: {
  uid?: string | null;
  email?: string | null;
  name?: string | null;
  username?: string | null;
  avatar?: string | null;
  payments?: Payment[] | [] | null;
}) => ({
  type: 'SET_USER',
  uid: uid,
  email: email,
  name: name,
  username: username,
  avatar: avatar,
  payments: payments,
});

export const setAvatar = ({ avatar }: { avatar: string }) => ({
  type: 'SET_AVATAR',
  avatar: avatar,
});

export const setPayments = ({ payments }: { payments: Payment[] }) => ({
  type: 'SET_PAYMENTS',
  payments: payments,
});

export const removeUser = () => ({
  type: 'REMOVE_USER',
});
