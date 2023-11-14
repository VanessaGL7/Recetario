<<<<<<< HEAD
import ReactDOM from 'react-dom/client';
import Main from './components/Main';
import { BrowserRouter } from "react-router-dom";
import './bootstrap';
import '../css/app.css'



ReactDOM.createRoot(document.getElementById("example")).render(
  <BrowserRouter>
    <Main></Main>
  </BrowserRouter>
);
=======
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
 //import './bootstrap';

 import '../css/app.css';
 import ReactDom from 'react-dom/client';
 import Example from './components/Example';
 import NavBar from './components/App';
 import App from './components/App';
 
 ReactDom.createRoot(document.getElementById('aplication')).render(<App />);


//require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//require('./components/Example');
>>>>>>> 6ebaa07140d136a9a3c7849c82cf29d4bce5d21d
