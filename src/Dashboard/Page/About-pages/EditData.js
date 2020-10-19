import React from 'react';
import axios from 'axios';
import { Col, Row, Form, FormGroup, Label, Input , Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import SaveIcon from '@material-ui/icons/Save';
import Buton from '@material-ui/core/Button';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import SweetAlert from 'react-bootstrap-sweetalert';

import CKEditor from "react-ckeditor-component";
export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      alert: null,
      about: {
        activation:'',
        text:'',
      },
    };
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(key, e) {
    var state = Object.assign({}, this.state.about);
    if (key==='text') {
      state[key] = e.editor.getData();
    }else {
      state[key] = e.target.value;
    }
    this.setState({about: state});
    // console.log(this.state.about);
  }
  handleSubmit(e) {
    e.preventDefault();
    var index=this.props.dataFromParent;
    const dataabout = this.state.about;
    const getAlertUpdated = () => (
      <SweetAlert
        success
        title="Success Updated"
        onConfirm={() => this.hideAlert()}
      >
        Data dengan id : {index} telah diupdate.
      </SweetAlert>
    );
    this.setState({
      alert: getAlertUpdated()
    });
    this.props.action(index,dataabout);
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
    var index=this.props.dataFromParent;

    axios.get('https://powerful-headland-43561.herokuapp.com/api/about/edit/'+index)
    .then(res => {
      var state = Object.assign({}, this.state.about);
      state['activation']=res.data.activation;
      state['text']=res.data.text;
      this.setState({about: state});
      // console.log(this.state.about);
        this.setState({
          modal: !this.state.modal
        });
    })
}

  render() {

    return (
      <div>
      <Buton variant="outlined" size="small" color="primary" onClick={this.toggle}>
        <SystemUpdateAltIcon />
      </Buton>
          <Modal isOpen={this.state.modal} size="lg" style={{position: 'relative',marginTop:100}}>
            <Form onSubmit={this.handleSubmit}>
              <ModalHeader>New Data</ModalHeader>
              <ModalBody>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="exampleEmail">Title about</Label>
                      <Input type="text" value={this.state.about.activation} onChange={(e)=>this.handleInput('activation',e)}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <CKEditor
                        activeClass="p10"
                        content={this.state.about.text}
                        events={{
                          "blur": this.onBlur,
                          "afterPaste": this.afterPaste,
                          "change": (e)=>this.handleInput('text',e)
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
