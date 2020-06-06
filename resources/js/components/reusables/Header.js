import React from 'react';
import Navbar from './Navbar.js';

/*
headerWidget = JSX 
headerWidgetBtn = JSX btn

subHeader = {
	leftCol: JSX,
	rightCol: JSX
}
*/

class Header extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			navbarShown: false,
		};

		this.toggleNavbar = this.toggleNavbar.bind(this);
	}


	toggleNavbar(){
		this.setState((state) => ({
			navbarShown: !state.navbarShown
		}));
	}	

	render(){
		return (
			<>
			<div className = "Header rows_container">
			    <div className = "row cols_container align_center section_padding">
			        <div className="rows_container center align_center">
			        	{this.props.headerWidgetBtn}
			        </div>
			        <Navbar
			        	navbarShown = {this.state.navbarShown}
			        	navbarLinks = {[
			        		{URL: '#', text: 'Home'},
			        		{URL: '#', text: 'Applications'},
			        		{URL: '#', text: 'Pages'},
			        		{URL: '#', text: 'About'},
			        	]}
			        />          
			    </div>
			    {
			    (this.props.subHeader !== null ?
			    <div className="subHeader cols_container space_between align_center section_padding">
			    	<div className="cols_container align_center">
			    		{this.props.subHeader.leftCol}
			    	</div>
			    	<div className="cols_container align_center">
			    		{this.props.subHeader.rightCol}
			    	</div>
			    </div> : ''
			    )
			    }
			    {this.props.headerWidget}		    
			</div>
			</>	
		);
	}
}

export default Header;

