import React from 'react';
import {Button_3} from './../reusables/Buttons.js';
import {Input_4, LARAVEL_CSRF_TOKEN} from './../reusables/Forms.js';

export default function LoginView(props){
	return(
		<>
		<form className="rows_container" method="POST" action={props.AppURLs.login}>
			<img src={props.AppURLs.icons+'logo_2.png'} style={{
				display: 'block', width: '6rem', height: 'auto', margin: '0 auto 3rem',
			}}
			/>
			<h1>Admin Login</h1>
			<LARAVEL_CSRF_TOKEN/>
			<Input_4
				inputAttr = {{
					type: 'email', name: 'email', placeholder: 'Email address',
					required: 'required', spellCheck: 'false',
					autoComplete: 'autocomplete', style: {width: '100%'}
				}}
			/>
			<div style={{padding: '1rem', fontSize: '1.45rem', color: '#fd397a'}}></div>
			<Input_4
				inputAttr = {{
					type: 'password', name: 'password', placeholder: 'Password',
					required: 'required', style: {width: '100%'}
				}}
			/>
			<div style={{padding: '1rem', fontSize: '1.45rem', color: '#fd397a'}}></div>
			<Button_3
				tagname = {'button'} color = {'blue'} text = {'Sign in'}
				attr = {{type: 'submit', style: {display: 'block', minWidth: '14rem', margin: '0 auto'}}}
			/>
			<br />
			<span style={{fontSize: '1.5rem'}}>
				Doesn't have an account? 
				<a style={{display: 'inline', fontWeight: '500'}} href={props.AppURLs.registerPage}>Sign up</a>
			</span>			
		</form>	
		</>
	);
}