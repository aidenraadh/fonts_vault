import React from 'react';
import {HomeView, EditFontView} from './AdminViews.js';

/*
|--------------------------------------------------------------------------
| AdminApp
|--------------------------------------------------------------------------
|
| This component will serve the views for admin according to 'data-view-name'
| attribute of #AdminApp element.
|
*/

function AdminApp(props){
	const AdminApp = document.getElementById('AdminApp');

	if(AdminApp.classList.contains('home_view')){
		return (
			<HomeView
				fonts = {JSON.parse(document.getElementById('fonts').innerHTML)}
				AppURLs = {props.AppURLs}
				AdminData = {props.AdminData}
			/>			
		);
	}

	else if(AdminApp.classList.contains('edit_font_view')){
		return (
			<EditFontView
				font = {JSON.parse(document.getElementById('font').innerHTML)}
				typefaces = {JSON.parse(document.getElementById('typefaces').innerHTML)}
				AppURLs = {props.AppURLs}
				AdminData = {props.AdminData}
			/>			
		);
	}	
}

export default AdminApp;
