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
const AdminData = JSON.parse(document.getElementById('AdminData').innerHTML);

function AdminApp(props){
	const viewName = props.viewName;

	if(viewName === 'home'){
		return (
			<HomeView
				fonts = {JSON.parse(document.getElementById('fonts').innerHTML)}
				AppURLs = {AppURLs}
				AdminData = {AdminData}
			/>			
		);
	}

	else if(viewName === 'edit_font'){
		return (
			<EditFontView
				font = {JSON.parse(document.getElementById('font').innerHTML)}
				typefaces = {JSON.parse(document.getElementById('typefaces').innerHTML)}
				AppURLs = {AppURLs}
				AdminData = {AdminData}
			/>			
		);
	}	
}

export default AdminApp;
