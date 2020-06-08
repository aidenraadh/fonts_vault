import React from 'react';

import {Header} from './reusables/SectionsAndWidgets.js';
import {Modal_1} from './reusables/Modal.js';
import {getFontFace} from './reusables/FontFileParsers.js';
import {AJAXPostRequest} from './reusables/AJAXRequest.js';

import FontFilter from './FontFilter.js';
import FontConfig from './FontConfig.js';
import FontDisplay from './FontDisplay.js';
import DisplaySelectedFam from './DisplaySelectedFam.js';
import {Button_1} from './reusables/Buttons.js';

const fontFaces = document.getElementById('fontFaces');
const selectedFamFontFaces = document.getElementById('selectedFamFontFaces');

const generateFontFaces = function(displayedFonts, storageLink){
	let rules = '';
	displayedFonts.forEach((displayedFont) => {
		rules += getFontFace(displayedFont.font_name, displayedFont.default_file, storageLink);
	});
	return rules;
}

class App extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			displayedFonts: this.props.displayedFonts,

			selectedFamily: {
				family_name: null,
				font_files: null
			},

			board: 'Valar Morghulis',

			fontConfig: {
				fontSize: '26px',
				letterSpacing: 'auto',
				wordSpacing: 'auto',
				lineHeight: 'auto',
			},

			fontFilterShown: false,
			toggleModal: {
				selectedFamily: null,
			},
		};

		fontFaces.innerHTML += generateFontFaces(this.state.displayedFonts, this.props.AppURLs.storageLink);

		this.changeDisplayedFonts = this.changeDisplayedFonts.bind(this);
		this.updateSelectedFam = this.updateSelectedFam.bind(this);
		this.configureFont = this.configureFont.bind(this);
		this.writeText = this.writeText.bind(this);
		this.toggleFontFilter = this.toggleFontFilter.bind(this);
		this.getToggleModal = this.getToggleModal.bind(this);

	}

	changeDisplayedFonts(){
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
					selectedFamily: {
						family_name: family_name,
						font_files: font_files
					},
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

	getToggleModal(modalid, toggleModalFunc){

		this.setState(function(state){
			let newToggleMdl = {...state.toggleModal};
			Object.keys(newToggleMdl).forEach((key) => {
				if(key === modalid){
					newToggleMdl[modalid] = toggleModalFunc;
				}
			});
			return {toggleModal: newToggleMdl};
		});		
	}

	componentDidUpdate(prevProps, prevState){
		if(this.state.selectedFamily !== prevState.selectedFamily){
			this.state.toggleModal.selectedFamily(true);
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

					headerWidgetBtn = <Button_1
						tagname = {'button'}
						icon = {{position: 1, color: 'blue'}}
						attr = {{type: 'submit'}}
						events = {{
							onClick: this.toggleFontFilter,
						}}
					/>

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
					displayedFonts = {this.state.displayedFonts}
					updateSelectedFam = {this.updateSelectedFam}
					fontConfig = {this.state.fontConfig}
					board = {this.state.board}
				/>

				<Modal_1
					modalid = {'selectedFamily'}
					heading = {this.state.selectedFamily.family_name}
					body = <DisplaySelectedFam
						font_files = {this.state.selectedFamily.font_files}
						fontsDir = {this.props.AppURLs.storageLink+this.state.selectedFamily.family_name}
						board = {this.state.board}
					/>
					getToggleModal = {this.getToggleModal}
				/>			
			</>
			//
		);
	}
}

export default App;
