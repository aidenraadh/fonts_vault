import React from 'react';

class Navbar extends React.Component{
        constructor(props){
                super(props);
        }

        render(){
                return (
                        <nav id="Navbar" className="cols_container space_between align_center">
                            <a href="#" className="brand">
                            Fonts Vault
                            </a>
                            <div className="cols_container">
                                <div></div>
                                <div id="navbarLinks">
                                    <div></div>
                                    <ul className="cols_container">
                                    {
                                        this.props.navbarLinks.map((link, idx) => (
                                        <li key={idx}>
                                            <a href={link.URL}>{link.text}</a>
                                        </li>
                                        ))
                                    }
                                    </ul>
                                </div>                                
                            </div>
                        </nav>                        
                );
        }        

}

export default Navbar;

