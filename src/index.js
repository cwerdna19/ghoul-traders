import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App';

import routes from './router';

import './index.css'

const router = routes;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
