import React from 'react';

export function Button_1(props){
	let iconPosition;

	switch(props.icon.position){
		case 1: iconPosition = '0 0'; break;
		case 2: iconPosition = '14.2% 0'; break;
		case 3: iconPosition = '28.4% 0'; break;
		case 4: iconPosition = '42.6% 0'; break;
		case 5: iconPosition = '56.8% 0'; break;
		case 6: iconPosition = '71% 0'; break;
		case 7: iconPosition = '85.2% 0'; break;
		case 8: iconPosition = '100% 0'; break;
		default: iconPosition = '0 0';
	}

	switch(props.tagname){
		case 'a':
			return (
				<>
				<a className="btn_1" {...props.attr} {...props.events}>
					<span className={'sprite '+props.icon.color} style={{backgroundPosition: iconPosition}}></span>
				</a>
				</>
				//
			); break;
		case 'button':
			return (
				<>
				<button className="btn_1" {...props.attr} {...props.events}>
					<span className={'sprite '+props.icon.color} style={{backgroundPosition: iconPosition}}></span>
				</button>
				</>//
			); break;
		default: return ('');
	}
}

export function Button_2(props){
	switch(props.tagname){
		case 'a':
			return (
				<>
				<a className={"btn_2 "+props.color+(props.isActive ? ' active':'')} {...props.attr} {...props.events}>
					{props.text}
				</a>
				</>
				//
			); break;
		case 'button':
			return (
				<>
				<button className={"btn_2 "+props.color+(props.isActive ? ' active':'')} {...props.attr} {...props.events}>
					{props.text}
				</button>
				</>
			); break;
		default: return ('');
	}
}