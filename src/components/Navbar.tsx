import React, { useEffect } from 'react';
import { PRIMARY800, NEUTRAL700 } from '../theme/colors'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
	const url = window.location.href;

	useEffect(()=>{
		console.log(url)
	}, [url]);

	return (
		<div className="w-full flex flex-row items-center justify-between font-poppins">
			<img alt="userimage" src="userimg.png" style={{display:url.slice(url.lastIndexOf('/')+1)==='user'?'flex':'none'}}/>
			
			<img style={{width:'45px', height:'45px'}} alt="logo" src='logo.png'/>
			
			<div className="text-md" style={{display:url.slice(url.lastIndexOf('/')+1)==='signup'?'flex':'none', color: NEUTRAL700}}>
				Already have an account? <Link to="/signin" style={{color: PRIMARY800, fontWeight:'bold', cursor:'pointer', marginLeft:'5px'}}>Login</Link>
			</div>
			
			<div className="text-md" style={{display:url.slice(url.lastIndexOf('/')+1)==='signin'?'flex':'none', color: NEUTRAL700}}>
				Don't have an account? <Link to="/signup" style={{color: PRIMARY800, fontWeight:'bold', cursor:'pointer', marginLeft:'5px'}}>Create an account</Link>
			</div>

			<img alt="settings" src="settings.png" style={{display:url.slice(url.lastIndexOf('/')+1)==='user'?'flex':'none'}}/>
		</div>
	)
}

export default Navbar