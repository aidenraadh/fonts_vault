import React from 'react';

function Dropdown(props){
    const DDTag = props.DDTag;

    let DDItems = props.DDItems.map((item, idx) => {
        let ItemTag = item.tag;
        return (
            <>
            <ItemTag key={idx} className="item" {...item.attr}>
                {item.text}
            </ItemTag>
            </>
        );
    });

	return (
        <DDTag className="dropdown">
            <button type="button" className="toggle">{props.DDToggleText}</button>
            <section className="menu">
                {DDItems}
                <div className="footer">
                </div>
            </section>
        </DDTag>
    );

}
export default Dropdown;