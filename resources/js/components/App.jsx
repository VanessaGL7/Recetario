import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './NavBar';
//AUTH
import LoginScreen from './LoginScreen';
import SignInScreen from './Auth/SignIn';
//TABLES
import DoctorsTable from './Tables/ProductTable';
import AlmacenesTable from './Tables/AlmacenesTable';
import JefesTable from './Tables/JefesAlmacenTable';
import AreasTable from './Tables/AreasTable';
//FORMS
import JefesForm from './Forms/JefesAlmacenForm';
import AreasForm from './Forms/AreasForm';
import AlmacenesForm from './Forms/AlmacenesForm';
import ProductForm from './Forms/ProductForm';
import UpdateJefeAlmacen from './Forms/updateJefeAlmacen';
import UpdateAlmacen from './Forms/updateAlmacen';
import UpdateProducts from './Forms/updateProducts';
import UpdateAarea from './Forms/updateArea';
import AuthProvider from './Auth/AuthContext';

function App() {
  /*
          <Route path='web-development/public/' element={<NavBar/>} />
          <Route path='web-development/public/signin' element={<SignInScreen />} />*/
  return (
    <div className='App'>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='web-development/public/' element={<NavBar />}>
            <Route index element={<ProductTable />} />
            <Route path='login' element={<LoginScreen />} />
            <Route path='signin' element={<SignInScreen />} />
            <Route path='almacenes' element={<AlmacenesTable />} />
            <Route path='areas' element={<AreasTable />} />
            <Route path='jefes' element={<JefesTable />} />

            <Route path='almacenes/create-warehouse' element={<AlmacenesForm />} />
            <Route path='jefes/create-jefes' element={<JefesForm />} />
            <Route path='areas/create-area' element={<AreasForm />} />
            <Route path='create-product' element={<ProductForm />} />

            <Route path='jefes/update_manager/:id' element={<UpdateJefeAlmacen />} />
            <Route path='almacenes/update_warehouse/:id' element={<UpdateAlmacen />} />
            <Route path='areas/update_area/:id' element={<UpdateAlmacen />} />
            <Route path='update_product/:id' element={<UpdateProducts />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

if (document.getElementById('App')) {
  const Index = ReactDOM.createRoot(document.getElementById("App"));

  Index.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}