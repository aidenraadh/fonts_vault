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

export function Select_1(props){
	return (
		<select className="form_1" {...props.attr} {...props.events}>
			{props.options.map((option, idx) => (
			<option key={idx} {...option.attr}>{option.optionText}</option>
			))}
		</select>	
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

export function FileInput(props){
	return (
		<>
 		<label className="file_input cols_container" {...props.wrapperAttr}>
 		   <span className="inputLabel">{props.label.inputLabel}</span>
 		   <span className="actionLabel">{props.label.actionLabel}</span>    
 		   <input type="file" {...props.inputAttr} {...props.inputEvents} />
 		</label>
 		</>
	);
}


export function Input_3(props){
	return (
 		<label className="form_3 rows_container" {...props.wrapperAttr}>
 		   <span className="label">{props.label}</span>    
 		   <input className="form" {...props.inputAttr} {...props.inputEvents} />
 		</label>
 		//
	);
}

export function Select_3(props){
	return (
 		<label className="form_3 rows_container" {...props.wrapperAttr}>
 		   <span className="label">{props.label}</span>    
			<select className="form" {...props.selectAttr} {...props.selectEvents}>
				{props.options.map((option, idx) => (
				<option key={idx} {...option.attr}>{option.optionText}</option>
				))}
			</select> 		   
 		</label>		
	);
}