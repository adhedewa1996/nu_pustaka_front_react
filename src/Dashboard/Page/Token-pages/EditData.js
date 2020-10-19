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
      token: {
        name:'',
        revoked:'',
        expires_at:'',
      },
    };
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(key, e) {
    var state = Object.assign({}, this.state.token);
    state[key] = e.target.value;
    this.setState({token: state});
    // console.log(this.state.token);
  }
  handleSubmit(e) {
    e.preventDefault();
    // console.log(this.state.token);
    var index=this.props.dataFromParent;
    const datatoken = this.state.token;
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
    this.props.action(index,datatoken);
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

    axios.get('https://powerful-headland-43561.herokuapp.com/api/token/edit/'+index)
    .then(res => {
      var state = Object.assign({}, this.state.token);
      state['name']=res.data.name;
      state['revoked']=res.data.revoked;
      state['expires_at']=res.data.expires_at;
      this.setState({token: state});
      console.log(this.state.token);
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
                      <Label for="exampleEmail">User Name</Label>
                      <Input type="text" name="category_name" disabled value={this.state.token.name} onChange={(e)=>this.handleInput('name',e)}/>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="examplePassword">Expired Token</Label>
                      <Input type="date" name="category_slug" value={this.state.token.expires_at} onChange={(e)=>this.handleInput('expires_at',e)}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="examplePassword">Revoked Token</Label>
                      <Input type="number" name="parent_id" value={this.state.token.revoked} onChange={(e)=>this.handleInput('revoked',e)}/>
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
