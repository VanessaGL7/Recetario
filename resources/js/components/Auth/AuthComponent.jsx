import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthComponent = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    // Hacer una solicitud para obtener el token del servidor
    axios.post('http://localhost/RECETARIO/Recetario/api/token', {
      email: 'tu@email.com',
      password: 'tu_contraseña',
    })
    .then(response => {
      const { token } = response.data;
      setToken(token);
      // Ahora 'token' se almacena en el estado y está disponible para su uso.
    })
    .catch(error => {
      console.error('Error obteniendo el token:', error);
    });
  }, []);

  // Resto de la lógica del componente

  return (
    <div>
      <p>Token: {token}</p>
      {/* Resto del componente */}
    </div>
  );
};

export default AuthComponent;
