import React, { useEffect } from 'react';
import { PRIMARY800, NEUTRAL700 } from '../theme/colors'; 
import { Link } from 'react-router-dom';

type NavbarProps = {
	showSidebar?: ()=>void
}

const Navbar = ({ showSidebar }: NavbarProps) => {
	const url = window.location.href;

	useEffect(()=>{
		
	}, [url]);

	return (
		<div className="w-full flex flex-row items-center justify-between font-poppins mt-4">
			<img alt="userimage" src="../profilepic.png" style={{display:url.slice(url.lastIndexOf('/')+1)==='user'?'flex':'none', width:'50px'}}/>
			
			<img style={{width:'45px', height:'45px'}} alt="logo" src='../logo.png'/>
			
			<div className="text-md" style={{display:url.slice(url.lastIndexOf('/')+1)==='signup'?'flex':'none', color: NEUTRAL700}}>
				Already have an account? <Link to="/user/signin" style={{color: PRIMARY800, fontWeight:'bold', cursor:'pointer', marginLeft:'5px'}}>Login</Link>
			</div>
			
			<div className="text-md" style={{display:url.slice(url.lastIndexOf('/')+1)==='signin'?'flex':'none', color: NEUTRAL700}}>
				Don't have an account? <Link to="/user/signup" style={{color: PRIMARY800, fontWeight:'bold', cursor:'pointer', marginLeft:'5px'}}>Create an account</Link>
			</div>

			<img alt="settings" src="../settings.png" style={{display:url.indexOf('/user')?'flex':'none'}} onClick={()=>{ if(showSidebar){ showSidebar(); } }}/>

			<img alt="burger" src="../burger.png"  style={{display:url.slice(url.lastIndexOf('/')+1)==='forgotpassword'?'flex':'none'}}/>
		</div>
	)
}

export default Navbar