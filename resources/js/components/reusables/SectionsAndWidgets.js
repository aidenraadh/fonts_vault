import React from 'react';

export function Navbar(props){
	return (
		<>
		<nav id="Navbar" className="cols_container space_between align_center">
		    <a href="#" className="brand">
		    Fonts Vault
		    </a>
		    <div className="cols_container">
		        <div></div>
		        <div id="navbarLinks">
		            <div></div>
		            <ul className="cols_container">
		            {
		                props.navbarLinks.map((link, idx) => (
		                <li key={idx}>
		                    <a href={link.URL}>{link.text}</a>
		                </li>
		                ))
		            }
		            </ul>
		        </div>                                
		    </div>
		</nav>
		</>
	);
}

/*
headerWidget = JSX 
headerWidgetBtn = JSX btn

subHeader = {
	leftCol: JSX,
	rightCol: JSX
}
*/

export class Header extends React.Component{
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
			</>	//
		);
	}
}

export function Table(props){
	return (
		<>
		<table className="table">
			<thead>
				<tr>
					{props.headData.map((data, idx) => (

					<th key={idx}>{data}</th>

					))}				
				</tr>
			</thead>
			<tbody>
				{props.bodyData.map((row, rowidx) => (

				<tr key={rowidx}>
					{row.map((col, colidx) => (
					<td key={colidx}>{col}</td>
					))}
				</tr>

				))}				
			</tbody>
		</table>
		</>//
	);
}

export function SectionHeader(props){
	const HeadingTag = props.headingTag;
	return (
		<div className="sectionHeader section_padding cols_container space_between align_center">
		    <div className="rows_container">
		        <HeadingTag className="heading">{props.headingText}</HeadingTag>
		        {(
		        	props.subHeadingText ?
		        	<span className="subHeading">{props.subHeadingText}</span> : ''
		        )}
		    </div>
		    <div className="cols_container">
		        {props.headerActions}
		    </div>
		</div>
	);
}

export function ListWidget_1(props){
	const ListTag = props.listTag;
	return (
		<>
		<ListTag className="list_widget_1 section_padding cols_container space_between" {...props.attr}>
		    <div className="cols_container align_center">
		        <div className={'bar '+props.barColor}></div>
		        <div className="text rows_container">
		            <span className="mainText">{props.text.mainText}</span>
		            {(props.text.subText ?
		            <span className="subText">{props.text.subText}</span> : ''
		            )}
		        </div>
		    </div>
		    <section className="cols_container align_center list_actions">
		    	{props.listActions}
		    </section>
		</ListTag>		
		</>
		//
	);
}