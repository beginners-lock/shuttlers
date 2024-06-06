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
import SignupD from './pages/SignupD';
import SigninD from './pages/SigninD';
import Documentation from './pages/Documentation';
import Driver from './pages/Driver';
import DSettings from './pages/DSettings';
import DTrips from './pages/DTrips';
import Routes from './pages/Routes';
import SigninA from './pages/SigninA';
import Admin from './pages/Admin';
import AdminUsersTable from './pages/AdminUserstable';
import AdminEmissionTable from './pages/AdminEmissiontable';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage/>
	},
	{
		path: "/user/signup",
		element: <Signup/>
	},
	{
		path: "/user/signin",
		element: <Signin/>
	},
	{
		path: "/user/dashboard",
		element: <User/>
	},
	{
		path: "/user/forgotpassword",
		element: <Forgotpassword/>
	},
	{
		path: "/user/changepassword",
		element: <Changepassword/>
	},
	{
		path: "/user/routes",
		element: <Routes/>
	},
	{
		path: "/user/settings",
		element: <Settings/>
	},
	{
		path: "/driver/signup",
		element: <SignupD/>
	},
	{
		path: "/driver/signin",
		element: <SigninD/>
	},
	{
		path: "/driver/dashboard",
		element: <Driver/>
	},
	{
		path: "/driver/trips",
		element: <DTrips/>
	},
	{
		path: "/driver/settings",
		element: <DSettings/>
	},
	{
		path: "/admin",
		element: <SigninA/>
	},
	{
		path: "/admin/signin",
		element: <SigninA/>
	},
	{
		path: "/admin/dashboard",
		element: <Admin/>
	},
	{
		path: "/admin/userstable",
		element: <AdminUsersTable/>
	},
	{
		path: "/admin/emissiontable",
		element: <AdminEmissionTable/>
	},
	{
		path: "/docs",
		element: <Documentation/>
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
