import React from 'react';

export function SectionHeader(props){
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

export function ListWidget_1(props){
	const ListTag = props.listTag;
	return (
		<>
		<ListTag className="list_widget_1 section_padding cols_container space_between" {...props.attr}>
		    <div className="cols_container align_center">
		        <div className={'bar '+props.barColor}></div>
		        <div className="text rows_container">
		            <span className="mainText">{props.text.mainText}</span>
		            {(props.text.subText ?
		            <span className="subText">{props.text.subText}</span> : ''
		            )}
		        </div>
		    </div>
		    <section className="cols_container align_center list_actions">
		    	{props.listActions}
		    </section>
		</ListTag>		
		</>
		//
	);
}