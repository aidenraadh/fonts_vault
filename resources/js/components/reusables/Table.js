import React from 'react';

class Table extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<>
  				<table className="table">
  				  <thead>
  				  	<tr>
  				  	{this.props.headData.map((data, idx) => (
  				  		<th key={idx}>{data}</th>
  				  	))}
  				  	</tr>
  				  </thead>
  				  <tbody>
  				  	{this.props.bodyData.map((row, rowidx) => (
  				  	<tr key={rowidx}>
  				  		{row.map((col, colidx) => (
  				  		<td key={colidx}>{col}</td>
  				  		))}
  				  	</tr>
  				  	))}			             
  				  </tbody>
  				</table>
			</>
			//
		);
	}
}

export default Table;


