export const userLogin = ({ uid, email }: { uid?: string | null; email?: string | null }) => ({
  type: 'USER_LOGIN',
  uid: uid,
  email: email,
});

export const userLogout = () => ({
  type: 'USER_LOGOUT',
});
