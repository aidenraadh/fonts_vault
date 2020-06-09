import React from 'react';
import {Input_1, Input_2} from './../reusables/Forms.js'

class FontConfig extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<>
			<section id="FontConfig" className="row cols_container left">
				<Input_1
					attr = {{
						type: 'text', name: '', placeholder: 'Demo Text',
						defaultValue: 'Valar Morghulis',
					}}
					events = {{onChange: (e) => this.props.writeText(e)}}
				/>
				<Input_2
					label = {<span className="sprite"></span>}
					attr = {{
						type:"number", name:"", min:"0",
						defaultValue: '26',
					}}
					events = {{onChange: (e) => this.props.configureFont(e,'fontSize')}}
				/>
				<Input_2
					label = {<span className="sprite" style={{backgroundPosition: '33% 0'}}></span>}
					attr = {{type:"number", name:"", min:"0",}}
					events = {{onChange: (e) => this.props.configureFont(e,'letterSpacing')}}
				/>
				<Input_2
					label = {<span className="sprite" style={{backgroundPosition: '67.5% 0'}}></span>}
					attr = {{type:"number", name:"", min:"0",}}
					events = {{onChange: (e) => this.props.configureFont(e,'wordSpacing')}}
				/>
				<Input_2
					label = {<span className="sprite" style={{backgroundPosition: '103% 0'}}></span>}
					attr = {{type:"number", name:"", min:"0",}}
					events = {{onChange: (e) => this.props.configureFont(e,'lineHeight')}}
				/>												                  	    
			</section>
			</>
			//
		);
	}
}

export default FontConfig;


