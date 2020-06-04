import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import AdminApp from './AdminApp.js';

const AppURLs = JSON.parse(document.getElementById('AppURLs').innerHTML);

if(document.getElementById('App')){
	ReactDOM.render(
		<App
			displayedFonts={JSON.parse(document.getElementById('displayedFonts').innerHTML)}
			AppURLs = {AppURLs}
		/>,
		document.getElementById('App')
	);
}

else if(document.getElementById('AdminApp')){
	ReactDOM.render(
		<AdminApp
			viewName = {document.getElementById('AdminApp').getAttribute('data-view-name')}
		/>,
		document.getElementById('AdminApp')
	);
}