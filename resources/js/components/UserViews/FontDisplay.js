import React from 'react';
import {getFontFamValue} from './../reusables/FontFileParsers.js';

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
					this.props.displayedFonts.map((displayedFont, idx) =>	
					<article className="card" key={idx}
						onClick={() => this.props.updateSelectedFam(displayedFont.id, displayedFont.family_name)}
					>
						<div className="head">
							<h6 className="fontName">{displayedFont.family_name}</h6>
							<span className="stylesNumber">{displayedFont.num_of_files} Styles</span>
						</div>
						<div className="body" style={this.props.fontConfig}>
							<div className="board" style={{fontFamily: getFontFamValue(displayedFont.default_file)}}>
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


