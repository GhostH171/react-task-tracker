import React, { createContext, useContext, useState } from "react";
const fakeAuth = {
  isAuthenticated: false,
  signin() {
    fakeAuth.isAuthenticated = true;
  },
  signout() {
    fakeAuth.isAuthenticated = false;
  },
};
const authContext = createContext();
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export function useAuth() {
  return useContext(authContext);
}
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const signin = (obj) => {
    setUser(obj);
    return fakeAuth.signin();
  };

  const signout = () => {
    return fakeAuth.signout(() => {
      setUser(null);
    });
  };

  const setListuser = (data) => {
    setUsers(data);
  };

  return {
    users,
    setListuser,
    user,
    signin,
    signout,
  };
}
