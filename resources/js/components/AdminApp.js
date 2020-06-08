import React from 'react';
import HomeView from './AdminViews/HomeView.js';
import EditFontView from './AdminViews/EditFontView.js';
import LoginView from './AdminViews/LoginView.js';
import RegisterView from './AdminViews/RegisterView.js';

/*
|--------------------------------------------------------------------------
| AdminApp
|--------------------------------------------------------------------------
|
| This component will serve the views for admin according to the view name
| defined in the class of #AdminApp element.
|
*/

function AdminApp(props){
	const AdminApp = document.getElementById('AdminApp');

	if(AdminApp.classList.contains('home_view')){
		return (
			<HomeView
				AppURLs = {props.AppURLs}
				fonts = {JSON.parse(document.getElementById('fonts').innerHTML)}
				AdminData = {JSON.parse(document.getElementById('AdminData').innerHTML)}
			/>			
		);
	}

	else if(AdminApp.classList.contains('edit_font_view')){
		return (
			<EditFontView
				AppURLs = {props.AppURLs}
				font = {JSON.parse(document.getElementById('font').innerHTML)}
				typefaces = {JSON.parse(document.getElementById('typefaces').innerHTML)}
				AdminData = {JSON.parse(document.getElementById('AdminData').innerHTML)}
			/>			
		);
	}
	else if(AdminApp.classList.contains('login_view')){
		return (
			<LoginView
				AppURLs = {props.AppURLs}
			/>			
		);
	}
	else if(AdminApp.classList.contains('register_view')){
		return (
			<RegisterView
				AppURLs = {props.AppURLs}
			/>			
		);
	}
}

export default AdminApp;
