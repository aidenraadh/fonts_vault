import React from 'react';

class Checkbox extends React.Component{
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

export default Checkbox;
