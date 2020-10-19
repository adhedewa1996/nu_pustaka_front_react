import React from 'react';
import axios from 'axios';
import { Col, Row, Form, FormGroup, Input , Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import SendIcon from '@material-ui/icons/Send';
import Buton from '@material-ui/core/Button';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import ReplyIcon from '@material-ui/icons/Reply';
import SweetAlert from 'react-bootstrap-sweetalert';
export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      alert: null,
      contact: {
        user:'admin',
        text:'',
      },
    };
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(key, e) {
    var state = Object.assign({}, this.state.contact);
      state[key] = e.target.value;
    this.setState({contact: state});
    // console.log(this.state.contact);
  }
  handleSubmit(e) {
    e.preventDefault();
    const data = this.state.contact;
    axios.post('https://powerful-headland-43561.herokuapp.com/api/contact/store', data)
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

  render() {

    return (
      <div>
      <Buton variant="outlined" size="small" color="primary" onClick={this.toggle}>
        <ReplyIcon />
      </Buton>
          <Modal isOpen={this.state.modal} size="lg" style={{position: 'relative',marginTop:100}}>
            <Form onSubmit={this.handleSubmit}>
              <ModalHeader>Reply</ModalHeader>
              <ModalBody>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Input type="hidden" value={this.state.contact.user} onChange={(e)=>this.handleInput('user',e)}/>
                      <Input type="text" onChange={(e)=>this.handleInput('text',e)}/>
                    </FormGroup>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
              {this.state.alert}
                <Button type="submit" color="primary" size="sm"><SendIcon/></Button>{' '}
                <Button color="secondary" size="sm" onClick={this.toggle}><CancelPresentationIcon/></Button>
              </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}
