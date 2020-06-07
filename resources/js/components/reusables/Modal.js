import React from 'react';

export class Modal_1 extends React.Component{

    constructor(props){
        super(props);
        this.modalRef = React.createRef();

        this.toggleModal = this.toggleModal.bind(this);

    }

    toggleModal(modalShown){
        const modal = this.modalRef.current;
        let modalOverlay = modal.children[0];
        let modalContent = modalOverlay.children[0];

        // Show the modal
        if(modalShown){
          modal.classList.add('shown');
          modalOverlay.addEventListener('transitionend', function(){
              modalContent.classList.add('shown');
          }, {once: true});
        }
        // Hide the modal
        else{
          modalContent.classList.remove('shown');
          modalContent.addEventListener('transitionend', function(){
              modal.classList.remove('shown');
          }, {once: true});
        }
    }

    componentDidMount(){
        this.props.getToggleModal(this.props.modalid, this.toggleModal);
    }

    render(){

        return (
            <>
            <section id={this.props.modalid} className="modal_1" ref={this.modalRef}>
                <div className="overlay">
                    <div className="content">
                      <div className="header section_padding cols_container space_between align_center">
                        <h6>{this.props.heading}</h6>
                        <button className="clsModal" type="button" onClick={() => this.toggleModal(false)}>
                          &times;
                        </button>
                      </div>
                      <div className="body section_padding">
                          {this.props.body}
                      </div>
                      <div className="footer section_padding"></div>
                    </div>                
                </div>
            </section>
            </>
            //
        );
    }
}

export class Modal_2 extends React.Component{

    constructor(props){
        super(props);
        this.modalRef = React.createRef();

        this.toggleModal = this.toggleModal.bind(this);

    }

    toggleModal(modalShown){
        // Show the modal
        if(modalShown){
          this.modalRef.current.classList.add('shown');
        }
        // Hide the modal
        else{
          this.modalRef.current.classList.remove('shown');
        }
    }

    componentDidMount(){
        this.props.getToggleModal(this.props.modalid, this.toggleModal);
    }

    render(){

        return (
            <>
            <section id={this.props.modalid} className="modal_2" ref={this.modalRef}>
              <div className="content">
                <button className="clsBtn" type="button" onClick={() => this.toggleModal(false)}>
                  &times;
                </button>
                <div className="body">
                  {this.props.messages}
                </div>
              </div>
            </section>
            </>
            //
        );
    }
}

