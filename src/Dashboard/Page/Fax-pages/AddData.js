import React from 'react';
import axios from 'axios';
import { Col, Row, Form, FormGroup, Label, Input , Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import SweetAlert from 'react-bootstrap-sweetalert';

import CKEditor from "react-ckeditor-component";
class AddData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      alert: null,
      fax: {
        judul:'',
        content:'',
      },
    };
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(key, e){
    if(key==='content'){
      this.setState({content: e.editor.getData()});
    }else{
      this.setState({judul: e.target.value});
    }
    var state = Object.assign({}, this.state.fax);
    state['content']=this.state.content;
    state['judul']=this.state.judul;
    this.setState({fax:state})
  }

  onBlur(evt){
    console.log("onBlur event called with event info: ", evt);
  }

  afterPaste(evt){
    console.log("afterPaste event called with event info: ", evt);
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = this.state.fax;
    axios.post('https://powerful-headland-43561.herokuapp.com/api/fax/store', data)
    const getAlertUpdated = () => (
      <SweetAlert
        success
        title="Success Updated"
        onConfirm={() => this.hideAlert()}
      >
        Data successfully added
      </SweetAlert>
    );
    this.setState({
      alert: getAlertUpdated()
    });
  }
  hideAlert() {
    this.setState({
      alert: null
    });
    this.setState({
      modal: !this.state.modal
    });
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render(){
    return (
      <div>
        <Fab color="primary" aria-label="add" onClick={this.toggle}>
          <AddToQueueIcon />
        </Fab>
          <Modal isOpen={this.state.modal} size="lg" style={{position: 'relative',marginTop:100}}>
            <Form onSubmit={this.handleSubmit}>
              <ModalHeader>New Data</ModalHeader>
              <ModalBody>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="exampleEmail">Title Fax</Label>
                      <Input type="text"  onChange={(e)=>this.handleInput('judul',e)}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                    <CKEditor
                      activeClass="p10"
                      content={this.state.content}
                      events={{
                        "blur": this.onBlur,
                        "afterPaste": this.afterPaste,
                        "change": (e)=>this.handleInput('content',e)
                      }}
                     />
                    </FormGroup>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
              {this.state.alert}
                <Button type="submit" color="primary" size="sm"><SaveIcon/></Button>{' '}
                <Button color="secondary" size="sm" onClick={this.toggle}><CancelPresentationIcon/></Button>
              </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default AddData;
