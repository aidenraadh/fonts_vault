import React from 'react';
import Header from './reusables/Header.js';
import Checkbox from './reusables/Checkbox.js';
import Table from './reusables/Table.js';
import {Modal_1,Modal_2} from './reusables/Modal.js';
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
				<><a href="#">Edit</a><a href="#">Delete</a></>,
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
				subHeader = {null}
				AppURLs = {this.props.AppURLs}
			/>

			<section className="section_1" style={{marginTop: '15rem'}}>
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

		this.font_info = this.props.font.font_info;
		this.font_files = this.props.font.font_files;
	}

	render(){
		return (
			<>
			<input form="updateFont" type="text" name="family_name" defaultValue={this.font_info.family_name} required /><br/><br/>
			<select form="updateFont" name="typeface" defaultValue={this.font_info.typeface} required>
			{this.props.typefaces.map((typeface, idx) => (
				<option key={idx} value={typeface}>{typeface}</option>
			))}
			</select><br/><br/>
			{
				this.font_files.map((file, idx) => (
				<div key={idx}>
					{file.file_name}<br/>
					<input form="updateFont" type="file" name={'updatedFiles[]['+file.file_name+']'} /><br/>
					{file.file_name === this.font_info.default_file ?
					(<input form="updateFont" type="radio" name="default_file" value={file.file_name} defaultChecked required/>) : 
					(<input form="updateFont" type="radio" name="default_file" value={file.file_name} required />)
					}default file<br/>
					<input form="updateFont" type="checkbox" name="deleted_files[]" value={file.file_name} />delete file<br/>
				</div>
				))
			}
			<form id="updateFont" method="POST" action={this.props.AppURLs.updateFontURL}>
				<LARAVEL_CSRF_TOKEN />
				<button type="submit">update</button>
			</form>
			</>
		);
	}
}

/*
input file, the value is the family name of the font
*/