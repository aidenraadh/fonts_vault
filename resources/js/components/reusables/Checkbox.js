import React from 'react';

/*
cbData = [
	{name: (str)name, value: (str)value, label: (str)label},
	...,
]
*/

class Checkbox extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<>
			{
			this.props.cbData.map((data, idx) => (
				<label key={idx} className="cb">
				  {data.label}
				  <input type="checkbox" name={data.name} value={data.value} />
				  <span className="checkmark"></span>
				</label>
			))
			}
			</>
			//
		);
	}
}

export default Checkbox;
