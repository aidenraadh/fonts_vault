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
	const viewName = props.viewName;

	if(viewName === 'home'){
		return (
			<HomeView
				fonts = {JSON.parse(document.getElementById('fonts').innerHTML)}
				AppURLs = {props.AppURLs}
				AdminData = {props.AdminData}
			/>			
		);
	}

	else if(viewName === 'edit_font'){
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
