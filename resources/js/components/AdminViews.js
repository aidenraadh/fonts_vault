import React from 'react';
import Header from './reusables/Header.js';
import {Checkbox, Select_1, Input_1} from './reusables/Forms.js';
import Table from './reusables/Table.js';
import {Modal_1,Modal_2} from './reusables/Modal.js';
import {Button_2} from './reusables/Buttons.js';
import Dropdown from './reusables/Dropdown.js';
import LARAVEL_CSRF_TOKEN from './reusables/LARAVEL_CSRF_TOKEN.js';


/*
|
| Below are all view components for admin
|
*/


export class HomeView extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			toggleModal: {
				deleteFontsMdl: null,
				uploadFontMdl: null,
			},
		};

		this.TableHeadData = [
			<Checkbox cbData = {[{name: 'test[]', value: 'haha'}]} />,
			'Family Name',
			'Total Fonts',
			'Inserted At',
			'Updated At',
			'Actions',		
		];

		this.TableBodyData = this.props.fonts.map((font) => (
			[
				<Checkbox attr = {{name: 'selectedFams[]', value: font.id, form: 'deleteFonts'}} />,
				font.family_name,
				font.num_of_files,
				font.created_at,
				font.updated_at,
				<><a href={this.props.AppURLs.domain+'admin/fonts/edit/'+font.id}>Edit</a>
				<a href="#">Delete</a></>,
			]
		));

		this.getToggleModal = this.getToggleModal.bind(this);
		//
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

	render(){
		return (
			<>
			<Header
				subHeader = {{
					leftCol: <>
						<h1 className="mainHeading">Dashboard</h1>
						<Dropdown
							DDTag = {'div'}
							DDToggleText = {'Hello, '+this.props.AdminData.name}
							DDItems = {[
								{tag: 'a', text: 'Action 1', attr: {href: '#'}},
								{tag: 'a', text: 'Action 2', attr: {href: '#'}},
								{tag: 'a', text: 'Action 3', attr: {href: '#'}},
							]}
						/>
					</>,
					rightCol: null,
				}}
				AppURLs = {this.props.AppURLs}
			/>

			<section className="section_1">
  				<div className="section_padding cols_container space_between align_center" style={{marginBottom: '4rem', borderBottom: '1px solid #ebedf2'}}>
  				  <h1 className="heading">All Fonts</h1>
  				  <button type="button" onClick={() => this.state.toggleModal.uploadFontMdl(true)}>add</button>
  				  <button type="button" onClick={() => this.state.toggleModal.deleteFontsMdl(true)}>delete</button>
  				</div>
				<Table
					headData = {this.TableHeadData}
					bodyData = {this.TableBodyData}				
				/>  							
			</section>

			<Modal_2
				modalid = {"deleteFontsMdl"}
				messages = {
                  <div style={{textAlign: 'center'}}>
                    Are you sure want to delete the following fonts?
                    <form id="deleteFonts" method="POST" action={this.props.AppURLs.deleteFontsURL}>
                    	<LARAVEL_CSRF_TOKEN />
                    	<button type="submit">DELETE</button>
                    </form>
                  </div>					
				}
				getToggleModal = {this.getToggleModal}
			/>
			<Modal_1
				modalid = {'uploadFontMdl'}
				heading = {'test'}
				body = {
				<form method="POST" action={this.props.AppURLs.domain+'admin/fonts/store'} encType="multipart/form-data">
					<LARAVEL_CSRF_TOKEN />
					<input type="text" name="family_name" placeholder="family_name" required/><br/>
					<select name="typeface" required>
						<option value="serif">serif</option>
						<option value="sans serif">sans serif</option>
						<option value="monospace">monospace</option>
						<option value="display">display</option>
						<option value="script">script</option>
					</select><br />	
					<input type="file" name="font_files[]" multiple required/><br/>
					<button type="submit">SUBMIT</button>
				</form>
				}			
				getToggleModal = {this.getToggleModal}
			/>
			</>
			//
		);
	}
}


export class EditFontView extends React.Component{
	constructor(props){
		super(props);

		this.state = {
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
						/>
					</>,
					rightCol: null,
				}}
				AppURLs = {this.props.AppURLs}
			/>			
			<section className="section_1">
			<Input_1 attr = {
				{type:"text", name:"family_name", defaultValue: this.font_info.family_name, required: 'required'}
			}/><br/><br/>
			<Select_1
				attr = {{name: 'typeface'}}
				options = {this.props.typefaces.map((typeface) => (
					{attr: {value: typeface}, optionText: typeface}
				))}
			/><br/><br/>	
			<input form="updateFont" type="file" name="newFiles" multiple onChange={(e) => this.addFile(e)} />

			{this.state.addedFiles.map((file_name, idx) => (
				<section key={idx} className="FilesList list_widget_1 cols_container space_between section_padding">
				  <div className="cols_container align_center">
				    <div className="icon">
				    	<span className="sprite" style={{backgroundPosition: '50% 0'}}></span>
				    </div>
				    <div className="text">
				      <div className="main">{file_name}</div>
				      <div className="sub">Test</div>
				    </div>
				  </div>
				  <section className="cols_container center align_center">
					<Button_2
						tagname = {'button'}
						text = {'Default'}
						color = {'blue'}
						isActive = {false}
						attributes = {{type: 'submit', style: {marginLeft: '1.8rem'}}}
					/>
					<Button_2
						tagname = {'button'}
						text = {'Remove'}
						color = {'red'}
						isActive = {false}
						attributes = {{type: 'submit', style: {marginLeft: '1.8rem'}}}
						events = {{onClick:() => this.removeAddedFile(file_name)}}
					/>
				  </section>
				</section>				
			))}

			<hr/>
			{this.font_files.map((file, idx) => {
				if(!this.state.deletedFiles.includes(file.file_name)){
					return (
					<section key={idx} className="FilesList list_widget_1 cols_container space_between section_padding">
					  <div className="cols_container align_center">
					    <div className="icon">
					    	<span className="sprite" style={{backgroundPosition: '0 0'}}></span>
					    </div>
					    <div className="text">
					      <div className="main">{file.file_name}</div>
					      <div className="sub">Test</div>
					    </div>
					  </div>
					  <section className="cols_container center align_center">
						<Button_2
							tagname = {'button'}
							text = {'Default'}
							color = {'blue'}
							isActive = {false}
							attributes = {{type: 'submit', style: {marginLeft: '1.8rem'}}}
						/>
						<Button_2
							tagname = {'button'}
							text = {'Remove'}
							color = {'red'}
							isActive = {false}
							attributes = {{type: 'submit', style: {marginLeft: '1.8rem'}}}
							events = {{onClick:() => this.toggleDelFiles(true, file.file_name)}}
						/>
					  </section>
					</section>
					)			
				}
			})}

			<hr/>

			{this.state.deletedFiles.map((file_name, idx) => (
				<section key={idx} className="FilesList list_widget_1 cols_container space_between section_padding">
				  <div className="cols_container align_center">
				    <div className="icon">
				    	<span className="sprite" style={{backgroundPosition: '100% 0'}}></span>
				    </div>
				    <div className="text">
				      <div className="main">{file_name}</div>
				      <div className="sub">Test</div>
				    </div>
				  </div>
				  <section className="cols_container center align_center">
					<Button_2
						tagname = {'button'}
						text = {'Add back'}
						color = {'green'}
						isActive = {false}
						attributes = {{type: 'submit', style: {marginLeft: '1.8rem'}}}
						events = {{onClick:() => this.toggleDelFiles(false, file_name)}}
					/>
				  </section>
				</section>				
			))}
					
			<form id="updateFont" method="POST" action={this.props.AppURLs.updateFontURL} encType="multipart/form-data">
				<LARAVEL_CSRF_TOKEN />
				<input type="hidden" name="addedFiles" value={JSON.stringify(this.state.addedFiles)} />
				<input type="hidden" name="deletedFiles" value={JSON.stringify(this.state.deletedFiles)} />
				<input type="hidden" value={this.font_info.id} />
			</form>			
			</section>
			</>
		);
	}
}

/*
input file, the value is the family name of the font
*/