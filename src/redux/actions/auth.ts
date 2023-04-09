export const currentUser = ({ uid, email }: { uid?: string | null; email?: string | null }) => ({
  type: 'CURRENT_USER',
  uid: uid,
  email: email,
});

export const userLogin = () => ({
  type: 'USER_LOGIN',
});

export const userLogout = () => ({
  type: 'USER_LOGOUT',
});
