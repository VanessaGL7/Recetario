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
