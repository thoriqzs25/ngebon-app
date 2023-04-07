export const userLogin = ({ token, email }: { token?: string | null; email?: string | null }) => ({
  type: 'USER_LOGIN',
  token: token,
  email: email,
});

export const userLogout = () => ({
  type: 'USER_LOGOUT',
});
