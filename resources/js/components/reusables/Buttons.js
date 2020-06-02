import React from 'react';

function Button_1(props){
	let iconPosition;

	switch(props.data.btnIcon){
		case 1: iconPosition = '0 0'; break;
		case 2: iconPosition = '25% 0'; break;
		case 3: iconPosition = '50% 0'; break;
		case 4: iconPosition = '75% 0'; break;
		case 5: iconPosition = '100% 0'; break;
		default: iconPosition = '0 0';
	}

	switch(props.tagname){
		case 'a':
			return (
				<>
				<a href={props.data.url} className="btn_1">
					<span className="sprite" style={{backgroundPosition: iconPosition}}></span>
				</a>
				</>
				//
			); break;
		case 'button':
			return (
				<>
				<button type="button" className="btn_1" {...props.events}>
					<span className="sprite" style={{backgroundPosition: iconPosition}}></span>
				</button>
				</>
			); break;
		default: return ('');
	}
}

export default Button_1;