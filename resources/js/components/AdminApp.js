import React from 'react';
import Header from './reusables/Header.js';
import Checkbox from './reusables/Checkbox.js';
import Table from './reusables/Table.js';

class AdminApp extends React.Component{
	constructor(props){
		super(props);

	}

	render(){
		const headData = [
			<Checkbox cbData = {[{name: 'test[]', value: 'haha'}]} />,
			'Family Name',
			'Total Fonts',
			'Inserted At',
			'Updated At',
			'Actions',
		];

		const bodyData = this.props.fonts.map((font) => (
			[
				<Checkbox cbData = {[{name: 'test[]', value: font.id}]} />,
				font.font_name,
				'12',
				font.created_at,
				font.updated_at,
				<><a href="#">Edit</a><a href="#">Delete</a></>,
			]
		));
		return (
			<>
			<Header
				subHeader = {null}
				AppURLs = {this.props.AppURLs}
			/>
			<section className="section_1" style={{marginTop: '15rem'}}>
  				<div className="section_padding cols_container space_between align_center" style={{marginBottom: '4rem', borderBottom: '1px solid #ebedf2'}}>
  				  <h1 className="heading">All Fonts</h1>
  				  asd
  				</div>
				<Table
					headData = {headData}
					bodyData = {bodyData}				
				/>  							
			</section>
			</>
			//
		);
	}
}

export default AdminApp;
