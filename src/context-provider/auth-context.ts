import React from "react";
import { AuthContextInterface } from "../type/data";

const AuthContext = React.createContext<AuthContextInterface>({
    loggedIn: false,
    setLoggedIn: () => {},
    user: {email: '', username: '', id: ''},
    loading: true,
    error: null,
});

export default AuthContext;