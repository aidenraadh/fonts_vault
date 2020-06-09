import React from 'react';
import LandingView from './UserViews/LandingView.js';
import FontsView from './UserViews/FontsView.js';

/*
|--------------------------------------------------------------------------
| UserApp
|--------------------------------------------------------------------------
|
| This component will serve the views for admin according to the view name
| defined in the class of #UserApp element.
|
*/

function UserApp(props){
	const UserApp = document.getElementById('UserApp');

	if(UserApp.classList.contains('landing_view')){
		return (
			<LandingView
				AppURLs = {props.AppURLs}
			/>			
		);
	}
	else if(UserApp.classList.contains('fonts_view')){
		return (
			<FontsView
				displayedFonts={JSON.parse(document.getElementById('displayedFonts').innerHTML)}			
				AppURLs = {props.AppURLs}
			/>			
		);
	}
}

export default UserApp;
