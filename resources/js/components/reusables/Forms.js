import React from 'react';

export class Checkbox extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<>
			<label className="cb">
			  {this.props.label}
			  <input type="checkbox" {...this.props.attr} />
			  <span className="checkmark"></span>
			</label>			
			</>
			//
		);
	}
}

export function Input_1(props){
	return (
		<input className="Input_1" {...props.attr} {...props.events} />	
	);
}

export function Select(props){
	return (
		<select className="Select" {...props.attr} {...props.events}>
			{props.options.map((option, idx) => (
			<option key={idx} {...option.attr}>{option.optionText}</option>
			))}
		</select>		
	);
}
