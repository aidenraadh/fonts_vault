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
		<input className="form_1" {...props.attr} {...props.events} />	
	);
}

export function Input_2(props){
	return (
		<>
		<div className="form_2">
		  <label className="label">
		    {props.label}
		  </label>
		  <input className="form" {...props.attr} {...props.events} />
		</div>
		</>
	);
}

export function Select_1(props){
	return (
		<select className="form_1" {...props.attr} {...props.events}>
			{props.options.map((option, idx) => (
			<option key={idx} {...option.attr}>{option.optionText}</option>
			))}
		</select>	
	);
}
