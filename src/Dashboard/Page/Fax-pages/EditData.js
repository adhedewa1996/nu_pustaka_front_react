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
      fax: {
        judul:'',
        content:'',
      },
    };
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(key, e) {
    var state = Object.assign({}, this.state.fax);
    if (key==='content') {
      state[key] = e.editor.getData();
    }else {
      state[key] = e.target.value;
    }
    this.setState({fax: state});
    // console.log(this.state.fax);
  }
  handleSubmit(e) {
    e.preventDefault();
    var index=this.props.dataFromParent;
    const datafax = this.state.fax;
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
    this.props.action(index,datafax);
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

    axios.get('https://powerful-headland-43561.herokuapp.com/api/fax/edit/'+index)
    .then(res => {
      var state = Object.assign({}, this.state.fax);
      state['judul']=res.data.judul;
      state['content']=res.data.content;
      this.setState({fax: state});
      // console.log(this.state.fax);
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
                      <Label for="exampleEmail">Title FAX</Label>
                      <Input type="text" value={this.state.fax.judul} onChange={(e)=>this.handleInput('judul',e)}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="examplePassword">Content FAX</Label>
                      <CKEditor
                        activeClass="p10"
                        content={this.state.fax.content}
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
