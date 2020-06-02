import React from 'react';
import Header from './reusables/Header.js';
import Checkbox from './reusables/Checkbox.js';
import Table from './reusables/Table.js';
import {Modal_1,Modal_2} from './reusables/Modal.js';
import LARAVEL_CSRF_TOKEN from './reusables/LARAVEL_CSRF_TOKEN.js';

class AdminApp extends React.Component{
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
				font.font_name,
				'12',
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
				body = {'test'}
				getToggleModal = {this.getToggleModal}
			/>
			</>
			//
		);
	}
}

export default AdminApp;
