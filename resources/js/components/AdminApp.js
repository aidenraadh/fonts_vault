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

const AppURLs = JSON.parse(document.getElementById('AppURLs').innerHTML);

function AdminApp(props){
	const viewName = props.viewName;

	if(viewName === 'home'){
		return (
			<HomeView
				fonts = {JSON.parse(document.getElementById('fonts').innerHTML)}
				AppURLs = {AppURLs}
			/>			
		);
	}

	else if(viewName === 'edit_font'){
		return (
			<EditFontView
				font = {JSON.parse(document.getElementById('font').innerHTML)}
				typefaces = {JSON.parse(document.getElementById('typefaces').innerHTML)}
				AppURLs = {AppURLs}
			/>			
		);
	}	
}

export default AdminApp;
