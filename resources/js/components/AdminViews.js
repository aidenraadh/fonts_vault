import React from 'react';
import Header from './reusables/Header.js';
import {Checkbox, Select_1, Input_1, Input_3, Select_3, FileInput} from './reusables/Forms.js';
import Table from './reusables/Table.js';
import {Modal_1,Modal_2} from './reusables/Modal.js';
import {Button_1, Button_2} from './reusables/Buttons.js';
import Dropdown from './reusables/Dropdown.js';
import {SectionHeader, ListWidget_1} from './reusables/SectionsAndWidgets.js';
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
			deletedFonts: [],
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
				<Checkbox attr = {{name: 'selectedFams', value: font.id}} />,
				font.family_name,
				font.num_of_files,
				font.created_at,
				font.updated_at,
				<>
				<Button_1
					tagname = {'a'}
					icon = {{position: 8, color: 'blue'}}
					attr = {{
						href: this.props.AppURLs.domain+'admin/fonts/edit/'+font.id,
						style: {width: '3.8rem', height: '3.8rem'}
					}}
				/>
				<Button_1
					tagname = {'button'}
					icon = {{position: 7, color: 'red'}}
					attr = {{type: 'submit', style: {width: '3.8rem', height: '3.8rem'}}}
					events = {{onClick: () => this.addDeletedFont('insert',font.id)}}
				/>
				</>//,
			]
		));

		this.getToggleModal = this.getToggleModal.bind(this);
		this.addDeletedFont = this.addDeletedFont.bind(this);
		//
	}

	addDeletedFont(action, font_id){
		if(action === 'append'){
			const checkedFonts = document.querySelectorAll('[name="selectedFams"]:checked');
			let deletedFonts  = [];
			checkedFonts.forEach((checked, idx) => {
				deletedFonts.push(checked.value);
			});
			this.setState({
				deletedFonts: deletedFonts
			});			
			this.state.toggleModal.deleteFontsMdl(true);
		}
		else{
			this.setState({
				deletedFonts: [font_id]
			});
			this.state.toggleModal.deleteFontsMdl(true);
		}
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

	componentDidUpdate(){
		console.log(this.state.deletedFonts);
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
					headingText = {'All Fonts'}
					headerActions = {<>
    					<Button_2
    					    tagname = {'button'}
    					    text = {'New'}
    					    color = {'green'}
    					    attr = {{type: 'button', style: {marginLeft: '1.4rem'}}}
    					    events = {{onClick: () => this.state.toggleModal.uploadFontMdl(true)}}
    					/>
    					<Button_2
    					    tagname = {'button'}
    					    text = {'Delete'}
    					    color = {'red'}
    					    attr = {{type: 'button', style: {marginLeft: '1.4rem'}}}
    					    events = {{onClick: () => this.addDeletedFont('append')}}                     
    					/>						
					</>}
				/>
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
                    	<input type="hidden" name="deletedFonts"
                    		value={JSON.stringify(this.state.deletedFonts)}
                    	/>
                    	<button type="submit">DELETE</button>
                    </form>
                  </div>					
				}
				getToggleModal = {this.getToggleModal}
			/>
			<Modal_1
				modalid = {'uploadFontMdl'}
				heading = {'Add New Font'}
				body = {
				<form method="POST"
					action={this.props.AppURLs.domain+'admin/fonts/store'}
					encType="multipart/form-data"
				>
					<LARAVEL_CSRF_TOKEN />
					<Input_3
						label = {'Family name'}
						wrapperAttr = {{style: {width: '100%', marginBottom: '2rem'}}}
						inputAttr = {{type: 'text', name: 'family_name', required:'required'}}
					/>
					<Select_3
						label = {'Typeface'}
						wrapperAttr = {{style: {width: '100%', marginBottom: '3rem'}}}
						selectAttr = {{name:"typeface", required: 'required'}}
						options = {[
							{attr: {value:'serif'}, optionText: 'Serif'},
							{attr: {value:'sans serif'}, optionText: 'Sans Serif'},
							{attr: {value:'monospace'}, optionText: 'Monospace'},
							{attr: {value:'display'}, optionText: 'Display'},
							{attr: {value:'script'}, optionText: 'Script'},
						]}

					/>
					<FileInput
						label = {{inputLabel: 'Font files', actionLabel: 'Browse'}}
						wrapperAttr = {{style: {width: '100%', marginBottom: '2rem'}}}
						inputAttr = {{name: 'font_files[]', multiple: 'multiple', required: 'required'}}
					/>
					<Button_2
						tagname = {'button'} text = {'Upload font'}
						color = {'blue'} isActive = {true}
						attr = {{type: 'submit', style: {margin: '0 auto'}}}
					/>
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

	componentDidMount(){
		console.log(this.state.defaultFile);
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
    				    text = {'Save'}
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
						required: 'required', form: 'updateFont'	
					}}
				/>
				<Select_3
					label = {'Typeface'}
					selectAttr = {{name: 'typeface', form: 'updateFont', defaultValue: this.font_info.typeface}}
					attr = {{name: 'typeface'}}
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
			</>
		);
	}
}