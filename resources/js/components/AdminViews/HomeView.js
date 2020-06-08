import React from 'react';
import {Header, SectionHeader, Table} from './../reusables/SectionsAndWidgets.js';
import {Button_1, Button_2} from './../reusables/Buttons.js';
import Dropdown from './../reusables/Dropdown.js';
import {Checkbox, Select_3, Input_3, FileInput, LARAVEL_CSRF_TOKEN} from './../reusables/Forms.js';
import {Modal_1,Modal_2} from './../reusables/Modal.js';



export default class HomeView extends React.Component{
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
						attr = {{type: 'submit', style: {display: 'block', margin: '0 auto', minWidth: '14rem'}}}
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