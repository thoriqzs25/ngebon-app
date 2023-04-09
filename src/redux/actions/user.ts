export const setUser = ({
  uid,
  email,
  name,
  username,
}: {
  uid?: string | null;
  email?: string | null;
  name?: string | null;
  username?: string | null;
}) => ({
  type: 'SET_USER',
  uid: uid,
  email: email,
  name: name,
  username: username,
});

export const removeUser = () => ({
  type: 'REMOVE_USER',
});
