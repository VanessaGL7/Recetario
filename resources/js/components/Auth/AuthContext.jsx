import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  // State de login
  const [userLogged, setUserLogged] = useState(false);

  // State del token
  const [token, setToken] = useState('');

  useEffect(() => {
    // Recuperar token de sessionStorage
    const storedToken = sessionStorage.getItem('token');

    if (storedToken) {
        const decodedToken = decodeToken(storedToken);

        if(decodedToken.exp *1000 > Date.now()){
            setUserLogged(true);
            setToken(storedToken); 
        }else{
            logout();
        }
    }
  }, []);

  const decodeToken = (token) => {
    return jwt-decode(token);
  }

  // Función para iniciar sesión y establecer el token en sessionStorage
  const login = (newToken) => {
    const decodedToken = decodeToken(newToken);

    sessionStorage.setItem('token', newToken);
    setUserLogged(true);
    setToken(newToken);
  };

  // Función para cerrar sesión y limpiar el token en sessionStorage
  const logout = () => {
    sessionStorage.removeItem('token');
    setUserLogged(false);
    setToken('');
  };

  return (
    <AuthContext.Provider
      value={{
        userLogged,
        setUserLogged,
        token,
        setToken,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
