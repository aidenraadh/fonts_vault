import React from 'react';
import Checkbox from './reusables/Checkbox';

class FontFilter extends React.Component{
	constructor(props){
		super(props);
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
			    <Checkbox
			    	cbData = {[
			    		{name: '', value: '', label: 'Serif'},
			    		{name: '', value: '', label: 'Sans Serif'},
			    		{name: '', value: '', label: 'Monospace'},
			    		{name: '', value: '', label: 'Script'},
			    		{name: '', value: '', label: 'Display'},
			    	]}
			    />
			</section>
			</>
		);
	}
}

export default FontFilter;


