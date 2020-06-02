import React from 'react';
import Checkbox from './reusables/Checkbox';

class FontFilter extends React.Component{
	constructor(props){
		super(props);
		this.filters = [
			{attr: {name: '', value: ''}, label: 'Serif'},
			{attr: {name: '', value: ''}, label: 'Sans Serif'},
			{attr: {name: '', value: ''}, label: 'Monospace'},
			{attr: {name: '', value: ''}, label: 'Script'},
			{attr: {name: '', value: ''}, label: 'Display'},
		];
	}

	render(){
		return (
			<>
			<section id="FontFilter" className={(this.props.fontFilterShown ? 'shown' : '')}>
			    <button className="clsFontFilter" aria-describedby="Close"
			        aria-label="FontFilter" type="button" onClick={this.props.toggleFontFilter}
			    >
			       &times;
			    </button>
			    {
			    	this.filters.map((filter, idx) => (
			    	<Checkbox key={idx} attr = {filter.attr} label = {filter.label} />
			    	))
			    }
			</section>
			</>
		);
	}
}

export default FontFilter;


