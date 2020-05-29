import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import AdminApp from './AdminApp.js';

const AppURLs = JSON.parse(document.getElementById('AppURLs').innerHTML);

if(document.getElementById('App')){
	ReactDOM.render(
		<App
			filteredFonts={JSON.parse(document.getElementById('filteredFonts').innerHTML)}
			AppURLs = {AppURLs}
		/>,
		document.getElementById('App')
	);
}

else if(document.getElementById('AdminApp')){
	ReactDOM.render(
		<AdminApp
			fonts = {JSON.parse(document.getElementById('fonts').innerHTML)}
			AppURLs = {AppURLs}
		/>,
		document.getElementById('AdminApp')
	);
}