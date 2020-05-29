import React from 'react';

import Header from './reusables/Header.js';
import Modal from './reusables/Modal.js';
import {getFontFace} from './reusables/FontFileParsers.js';
import {AJAXPostRequest} from './reusables/AJAXRequest.js';

import FontFilter from './FontFilter.js';
import FontConfig from './FontConfig.js';
import FontDisplay from './FontDisplay.js';

const fontFaces = document.getElementById('fontFaces');
const selectedFamFontFaces = document.getElementById('selectedFamFontFaces');

const generateFontFaces = function(filteredFonts, storageLink){
	let rules = '';
	filteredFonts.forEach((filteredFont) => {
		rules += getFontFace(filteredFont.font_name, filteredFont.default_file, storageLink);
	});
	return rules;
}

function DisplaySelectedFam(props){
	return (
	<>
	{(
		props.selectedFamily ? 
			props.selectedFamily.map((font, idx) => (
				<div key={idx}>{font.file_name}</div>
			)) : ''
	)}
	</>
	//
	);
}

class App extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			filteredFonts: this.props.filteredFonts,

			selectedFamily: null,

			board: 'Valar Morghulis',

			fontConfig: {
				fontSize: '26px',
				letterSpacing: 'auto',
				wordSpacing: 'auto',
				lineHeight: 'auto',
			},

			fontFilterShown: false,
			toggleModal: null,
		};

		fontFaces.innerHTML += generateFontFaces(this.state.filteredFonts, this.props.AppURLs.storageLink);

		this.changefilteredFonts = this.changefilteredFonts.bind(this);
		this.updateSelectedFam = this.updateSelectedFam.bind(this);
		this.configureFont = this.configureFont.bind(this);
		this.writeText = this.writeText.bind(this);
		this.toggleFontFilter = this.toggleFontFilter.bind(this);
		this.modalCallback = this.modalCallback.bind(this);

	}

	changefilteredFonts(){
		;
	}

	updateSelectedFam(font_id, family_name){
		const storageLink = this.props.AppURLs.storageLink;

		AJAXPostRequest(
			'font_id='+font_id,
			this.props.AppURLs.getFontFamilyURL,
			(response, callingComponent) => {
				const font_files = JSON.parse(response);

				let rules = '';
				font_files.forEach((file_name) => {
					rules += getFontFace(family_name, file_name['file_name'], storageLink);
				});
				selectedFamFontFaces.innerHTML = rules;

				callingComponent.setState({
					selectedFamily: font_files,
				});				
			},
			this
		);		
	}

	configureFont(e, configKey){
		const value = e.target.value;
		this.setState(function(state){
			let newConfig = {...state.fontConfig};
			Object.keys(newConfig).forEach((key) => {
				if(key === configKey){
					newConfig[configKey] = value+'px';
				}
			});
			return {fontConfig: newConfig};
		});
	}

	writeText(event){
		this.setState({board: event.target.value});
	}

	toggleFontFilter(){
		this.setState((state) => ({
			fontFilterShown: !state.fontFilterShown
		}));
	}

	modalCallback(toggleModalFunc){
		this.setState({
			toggleModal: toggleModalFunc
		});
	}

	componentDidUpdate(prevProps, prevState){
		if(this.state.selectedFamily !== prevState.selectedFamily){
			console.log(this.state.selectedFamily);
			this.state.toggleModal(true);
		}
	}

	render(){
		return (
			<>
				<Header
					headerWidget = <FontFilter
						toggleFontFilter = {this.toggleFontFilter} 
						fontFilterShown = {this.state.fontFilterShown}
					/>

					headerWidgetBtn =
					<button className="btn" aria-describedby="Open"
					aria-label="FontFilter" type="button" onClick={this.toggleFontFilter}>
			        	<span className="sprite"></span>
			        </button>

					subHeader = {{
						leftCol: <FontConfig
							configureFont = {this.configureFont}
							writeText = {this.writeText}
						/>,
						rightCol: null
					}}

					AppURLs = {this.props.AppURLs}
				/>

				<FontDisplay
					filteredFonts = {this.state.filteredFonts}
					updateSelectedFam = {this.updateSelectedFam}
					fontConfig = {this.state.fontConfig}
					board = {this.state.board}
				/>

				<Modal
					heading = {'leehoo'}
					body = <DisplaySelectedFam
						selectedFamily = {this.state.selectedFamily}
					/>
					modalCallback = {this.modalCallback}
				/>			
			</>
			//
		);
	}
}

export default App;
