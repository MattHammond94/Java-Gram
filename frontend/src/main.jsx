import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

// redux:
import store from './store';
import { Provider } from 'react-redux';

// Styling:
import './index.css'
import PrivateRoute from './components/PrivateRoute';

//Components:
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import FeedPage from './pages/FeedPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import UserPage from './pages/UserPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/feed' element={<FeedPage />} />
        <Route path='/user/:username' element={<UserPage /> } />
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={ router } />
    </React.StrictMode>
  </Provider>
);
