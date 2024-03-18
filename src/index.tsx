import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import { ErrorPage } from './Error';
import Signup from './pages/Signup';
import User from './pages/User';
import Signin from './pages/Signin';
import Forgotpassword from './pages/Forgotpassword';
import Changepassword from './pages/Changepassword';
import Settings from './pages/Settings';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage/>
	},
	{
		path: "signup",
		element: <Signup/>
	},
	{
		path: "signin",
		element: <Signin/>
	},
	{
		path: "user",
		element: <User/>
	},
	{
		path: "forgotpassword",
		element: <Forgotpassword/>
	},
	{
		path: "changepassword",
		element: <Changepassword/>
	},
	{
		path: "settings",
		element: <Settings/>
	}
]);

const root = ReactDOM.createRoot(
  	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
