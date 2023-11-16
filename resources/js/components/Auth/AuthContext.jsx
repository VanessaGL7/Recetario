import React, { createContext, useContext, useReducer } from 'react';

// Definir el contexto
const AuthContext = createContext();

// Definir un proveedor que utilizará el contexto
export const AuthProvider = ({ children }) => {
  const [userId, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_USER_ID':
        return action.payload;
      default:
        return state;
    }
  }, null);

  const setUserId = (id) => {
    dispatch({ type: 'SET_USER_ID', payload: id });
  };

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

// Crear un hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
