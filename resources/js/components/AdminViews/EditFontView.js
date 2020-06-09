import React from 'react';
import {Header, SectionHeader, ListWidget_1, Footer} from './../reusables/SectionsAndWidgets.js';
import Dropdown from './../reusables/Dropdown.js';
import {Input_3, Select_3, FileInput, LARAVEL_CSRF_TOKEN} from './../reusables/Forms.js';
import {Button_2} from './../reusables/Buttons.js';


export default class EditFontView extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			defaultFile: this.props.font.font_info.default_file,
			addedFiles: [],
			deletedFiles: [],
		};
		this.font_info = this.props.font.font_info;
		this.font_files = this.props.font.font_files;

		this.addFile = this.addFile.bind(this);
		this.removeAddedFile = this.removeAddedFile.bind(this);
	}

	addFile(e){
		const keys = Object.getOwnPropertyNames(e.target.files);
		let inputtedFiles = [];

		keys.forEach((key) => {
			inputtedFiles.push(e.target.files[key].name);
		});

		this.setState({
			addedFiles: inputtedFiles,
			test: e.target
		});
	}

	removeAddedFile(removedFile){
		let newAddedFiles;
		this.setState((state) => {
			newAddedFiles = state.addedFiles.filter((file_name) => (
				file_name !== removedFile
			));
			return {addedFiles: newAddedFiles};
		});
	}

	toggleDelFiles(isDelete, file_name){
		if(isDelete){
			let newDeletedFiles;
			this.setState((state) => {
				newDeletedFiles = state.deletedFiles;
				newDeletedFiles.unshift(file_name);
				return {deletedFiles: newDeletedFiles};
			});
		}
		else{
			let newDeletedFiles;
			this.setState((state) => {
				newDeletedFiles = state.deletedFiles.filter((file) => (
					file_name !== file
				));
				return {deletedFiles: newDeletedFiles};
			});		
		}
	}

	changeDefaultFile(file_name){
		this.setState({
			defaultFile: file_name
		});
	}

	render(){
		return (
			<>
			<Header
				subHeader = {{
					leftCol: <>
						<h1 className="mainHeading">Edit Font</h1>
						<Dropdown
							DDTag = {'div'}
							DDToggleText = {'Hello, '+this.props.AdminData.name}
							DDItems = {[
								{tag: 'a', text: 'Action 1', attr: {href: '#'}},
								{tag: 'a', text: 'Action 2', attr: {href: '#'}},
								{tag: 'a', text: 'Action 3', attr: {href: '#'}},
							]}
							DDFooter = {
								<form method="POST" action={this.props.AppURLs.domain+'admin/logout'}>
								<LARAVEL_CSRF_TOKEN />
								<Button_2 tagname = {'button'} text = {'Sign out'}
									color = {'blue'} attr = {{type: 'submit'}}
								/>								
								</form>
							}							
						/>
					</>,
					rightCol: null,
				}}
				AppURLs = {this.props.AppURLs}
			/>			
			<section className="section_1">
			<SectionHeader
				headingTag = {'h2'}
				headingText = {this.font_info.family_name+' Family'}
				headerActions = {<>
    				<Button_2
    				    tagname = {'button'}
    				    text = {'Save changes'}
    				    color = {'green'}
    				    attr = {{type: 'submit', style: {marginLeft: '1.4rem'}, form: 'updateFont'}}
    				    events = {{}}
    				/>
    				<Button_2
    				    tagname = {'a'}
    				    text = {'Cancel'}
    				    color = {'red'}
    				    attr = {{
    				    	href: this.props.AppURLs.domain+'admin/home',
    				    	style: {marginLeft: '1.4rem'}
    				    }}
    				/>						
				</>}
			/>
			<div className="cols_container space_between align_center" 
					style={{padding: '0 2.2rem 1.4rem', flexWrap: 'wrap'}}
			>
				<Input_3
					label = {'Family name'}
					inputAttr = {{
						type:"text", name:"family_name",
						defaultValue: this.font_info.family_name,
						form: 'updateFont'	
					}}
					wrapperAttr = {{style: {marginBottom: '2rem'}}}
				/>
				<Select_3
					label = {'Typeface'}
					selectAttr = {{name: 'typeface', form: 'updateFont', defaultValue: this.font_info.typeface}}
					wrapperAttr = {{style: {marginBottom: '2rem'}}}
					options = {this.props.typefaces.map((typeface) => (
						{attr: {value: typeface}, optionText: typeface}
					))}
				/>			
			</div>

			<SectionHeader
				headingTag = {'h2'}
				headingText = {'Font Files'}
				headerActions = {<>					
					<FileInput
						label = {{inputLabel: 'New font files', actionLabel: 'Browse'}}
						inputAttr = {{name: 'newFiles[]', multiple: 'multiple', form: 'updateFont'}}
						inputEvents = {{onChange: (e) => this.addFile(e)}}
						wrapperAttr = {{style: {}}}
					/>					
				</>}
			/>

			{this.state.addedFiles.map((file_name, idx) => (

			<ListWidget_1
				listTag = {'section'} text = {{mainText: file_name, subText: 'test'}}
				barColor = {'green'} key={idx}
				listActions = {
					<Button_2
						tagname = {'button'}
						text = {'Remove'}
						color = {'red'}
						isActive = {false}
						attr = {{type: 'submit', style: {marginLeft: '1.4rem'}}}
						events = {{onClick:() => this.removeAddedFile(file_name)}}
					/>
				}
			/>

			))}

			{this.font_files.map((file, idx) => {
			if(!this.state.deletedFiles.includes(file.file_name)){
			return (
			<ListWidget_1
				listTag = {'section'} text = {{mainText: file.file_name, subText: 'test'}}
				barColor = {'blue'} key={idx}
				listActions = {
					<>
					<Button_2
						tagname = {'button'}
						text = {'Default'}
						color = {'blue'}
						isActive = {(file.file_name === this.state.defaultFile ? true : false)}
						attr = {{type: 'submit', style: {marginLeft: '1.4rem'}}}
						events = {{onClick: () => this.changeDefaultFile(file.file_name)}}
					/>
					<Button_2
						tagname = {'button'}
						text = {'Remove'}
						color = {'red'}
						isActive = {false}
						attr = {{type: 'submit', style: {marginLeft: '1.4rem'}}}
						events = {{onClick:() => this.toggleDelFiles(true, file.file_name)}}
					/>
					</>
				}
			/>				
			)}
			})}

			<SectionHeader
				headingTag = {'h3'}
				headingText = {'Removed Files'}
			/>			

			{this.state.deletedFiles.map((file_name, idx) => (

			<ListWidget_1
				listTag = {'section'} text = {{mainText: file_name, subText: 'test'}}
				barColor = {'red'} key={idx}
				listActions = {
					<Button_2
						tagname = {'button'}
						text = {'Add back'}
						color = {'green'}
						isActive = {false}
						attr = {{type: 'submit', style: {marginLeft: '1.8rem'}}}
						events = {{onClick:() => this.toggleDelFiles(false, file_name)}}
					/>
				}
			/>

			))}			

					
			<form id="updateFont" method="POST" action={this.props.AppURLs.updateFontURL}
				encType="multipart/form-data"
			>
				<LARAVEL_CSRF_TOKEN />
				<input type="hidden" name="id" value={this.font_info.id} />
				<input type="hidden" name="default_file" value={this.state.defaultFile} />
				<input type="hidden" name="addedFiles" value={JSON.stringify(this.state.addedFiles)} />
				<input type="hidden" name="deletedFiles" value={JSON.stringify(this.state.deletedFiles)} />
				<input type="hidden" value={this.font_info.id} />
			</form>			
			</section>
			<Footer />
			</>//
		);
	}
}
