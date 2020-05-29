import React from 'react';

class FontConfig extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<>
			<section id="FontConfig" className="row cols_container left">
			    <input className="Input_1" type="text" name=""
			            onChange={(e) => this.props.writeText(e)}
			            placeholder="Demo Text"
			    />            
			    <div className="input_group">
			      <label className="label">
			        <span className="sprite"></span>
			      </label>
			      <input className="form" type="number" name="" min="0"
			        onChange={(e) => this.props.configureFont(e,'fontSize')}
			      />
			    </div>
			    <div className="input_group">
			      <label className="label">
			        <span className="sprite" style={{backgroundPosition: '33% 0'}}></span>
			      </label>
			      <input className="form" type="number" name="" min="0"
			        onChange={(e) => this.props.configureFont(e,'letterSpacing')}
			      />
			    </div>
			    <div className="input_group">
			      <label className="label">
			        <span className="sprite" style={{backgroundPosition: '67.5% 0'}}></span>
			      </label>
			      <input className="form" type="number" name="" min="0"
			        onChange={(e) => this.props.configureFont(e,'wordSpacing')}
			      />
			    </div>
			    <div className="input_group">
			      <label className="label">
			        <span className="sprite" style={{backgroundPosition: '103% 0'}}></span>
			      </label>
			      <input className="form" type="number" name="" min="0"
			        onChange={(e) => this.props.configureFont(e,'lineHeight')}
			      />
			    </div>                   	    
			</section>
			</>
			//
		);
	}
}

export default FontConfig;


