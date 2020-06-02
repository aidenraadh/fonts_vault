import React from 'react';
import Button_1 from './reusables/Buttons.js';
import {getFontFamValue} from './reusables/FontFileParsers.js';

class DisplaySelectedFam extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.font_files){
            return (
                <>
                {
                this.props.font_files.map((file, idx) => (
                    <section key={idx} className="selectedFamDisplay">
                        <div className="displayHeader">
                            <h6>{getFontFamValue(file.file_name)}</h6>
                            <Button_1
                                tagname = {'a'}
                                data = {{
                                    url: this.props.fontsDir+'/'+file.file_name,
                                    btnIcon: 4,
                                }}
                            />
                        </div>
                        <div className="board" style={{fontFamily: getFontFamValue(file.file_name)}}>
                            {this.props.board}
                        </div>
                    </section>
                ))
                }
                </>
                //
            );
        }
        else{
            return ('');
        }
    }
}

export default DisplaySelectedFam;

