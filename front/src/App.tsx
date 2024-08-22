import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '@pages/Home';
import { OrdersPage } from '@pages/Orders';
import { MenuPage } from '@pages/Menu';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {

  return (
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Home/>}>
              <Route path={'/orders'} element={<OrdersPage/>}/>
              <Route path={'/menu'} element={<MenuPage/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
};
