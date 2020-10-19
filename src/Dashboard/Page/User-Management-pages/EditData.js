import React from 'react';
import axios from 'axios';
import { Col, Row, Form, FormGroup, Label, Input , Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import SaveIcon from '@material-ui/icons/Save';
import Buton from '@material-ui/core/Button';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SweetAlert from 'react-bootstrap-sweetalert';

export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      alert: null,
      useSnackbar: false,
      user: {
        name:'',
        email:'',
        phone:'',
        token:'',
      },
    };
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(key, e) {
    var state = Object.assign({}, this.state.user);
    state[key] = e.target.value;
    this.setState({user: state});
    // console.log(this.state.user);
  }
  handleSubmit(e) {
    e.preventDefault();
    // console.log(this.state.user);
    var index=this.props.dataFromParent;
    const datauser = this.state.user;
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
    this.props.action(index,datauser);
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
    axios.get('https://powerful-headland-43561.herokuapp.com/api/user-management/edit/'+index)
    .then(res => {
      var state = Object.assign({}, this.state.user);
      state['name']=res.data.name;
      state['email']=res.data.email;
      state['phone']=res.data.phone;
      state['token']=res.data.token;
      this.setState({user: state});
        this.setState({
          modal: !this.state.modal
        });
    })
}

  render() {

    return (
      <div>
      <Buton variant="outlined" size="small" color="primary" onClick={this.toggle}>
        <AccountBalanceWalletIcon />
      </Buton>
          <Modal isOpen={this.state.modal} size="lg" style={{position: 'relative',marginTop:100}}>
            <Form onSubmit={this.handleSubmit}>
              <ModalHeader>New Data</ModalHeader>
              <ModalBody>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">User name</Label>
                      <Input type="text" disabled value={this.state.user.name} onChange={(e)=>this.handleInput('name',e)}/>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="examplePassword">Email user</Label>
                      <Input type="text" value={this.state.user.email} onChange={(e)=>this.handleInput('email',e)}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">User phone</Label>
                      <Input type="text" value={this.state.user.phone} onChange={(e)=>this.handleInput('phone',e)}/>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="examplePassword">Token user</Label>
                      <Input type="text" value={this.state.user.token} onChange={(e)=>this.handleInput('token',e)}/>
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
