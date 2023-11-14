import ReactDOM from 'react-dom/client';
import Main from './components/Main';
import { BrowserRouter } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("example")).render(
  <BrowserRouter>
    <Main/>
  </BrowserRouter>
);