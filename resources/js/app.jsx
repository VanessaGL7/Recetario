import ReactDOM from 'react-dom/client';
import Main from './components/Main';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import './bootstrap';
import '../css/app.css'
import { store } from './components/store';



ReactDOM.createRoot(document.getElementById("example")).render(
  <Provider store={store}>
  <BrowserRouter>
    <Main></Main>
  </BrowserRouter>
  </Provider>,
document.getElementById("root")
);
