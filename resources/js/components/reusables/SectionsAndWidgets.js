import React from 'react';

export default function SectionHeader(props){
	const HeadingTag = props.headingTag;
	return (
		<div className="sectionHeader section_padding cols_container space_between align_center">
		    <div className="rows_container">
		        <HeadingTag className="heading">{props.headingText}</HeadingTag>
		        {(
		        	props.subHeadingText ?
		        	<span className="subHeading">{props.subHeadingText}</span> : ''
		        )}
		    </div>
		    <div className="cols_container">
		        {props.headerActions}
		    </div>
		</div>
	);
}