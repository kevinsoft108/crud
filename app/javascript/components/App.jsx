import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';

import store from '../redux/store';
import { AuthProvider } from '../services/Auth.context';
import Routing from '../routes/index'
import Header from './Header'

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Header />
          <Routing />
        </Router>
        <ToastContainer />
      </AuthProvider>
    </Provider>
  );
};

export default App;
