import React from 'react';
import {getFontFamValue} from './reusables/FontFileParsers.js';

class FontDisplay extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<>
			<section id="FontDisplay">
				<div className="cards_container">
					{
					this.props.filteredFonts.map((filteredFont, idx) =>	
					<article className="card" key={idx}
						onClick={() => this.props.updateSelectedFam(filteredFont.id, filteredFont.font_name)}
					>
						<div className="head">
							<h6 className="fontName">{filteredFont.font_name}</h6>
							<span className="stylesNumber">12 styles</span>
						</div>
						<div className="body" style={this.props.fontConfig}>
							<div className="board" style={{fontFamily: getFontFamValue(filteredFont.default_file)}}>
								{this.props.board}
							</div>
						</div>
					</article>
					)
					}				
				</div>
			</section>
			</>
			//
		);
	}
}

export default FontDisplay;


