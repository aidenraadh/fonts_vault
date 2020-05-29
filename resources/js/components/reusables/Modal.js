import React from 'react';

class Modal extends React.Component{

    constructor(props){
        super(props);
        this.modalRef = React.createRef();

        this.toggleModal = this.toggleModal.bind(this);

    }

    toggleModal(isShown){
        if(isShown){
            this.modalRef.current.classList.add('shown');
            this.modalRef.current.offsetHeight;
            this.modalRef.current.classList.add('darkBG');
            this.modalRef.current.addEventListener('transitionend', function(){
                this.children[0].classList.add('shown');
            });
        }
        else{
            const modalRef = this.modalRef.current;
            this.modalRef.current.children[0].classList.remove('shown');
            this.modalRef.current.children[0].addEventListener('transitionend', function(){
                modalRef.classList.remove('darkBG', 'shown');
            });
        }
    }

    componentDidMount(){
        this.props.modalCallback(this.toggleModal);
    }

    render(){

        return (
            <>
            <section className="modal" ref={this.modalRef}>
              <div className="content">
                <div className="header section_padding cols_container space_between">
                  <h6>{this.props.heading}</h6>
                  <button type="button" onClick={() => this.toggleModal(false)}>&times;</button>
                </div>
                <div className="body section_padding">
                    {this.props.body}
                </div>
                <div className="footer section_padding"></div>
              </div>
            </section>
            </>
            //
        );
    }
}

export default Modal;
