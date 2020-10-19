import React from 'react';
import axios from 'axios';
import { Col, Row, Form, FormGroup, Label, Input , Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import SaveIcon from '@material-ui/icons/Save';
import Buton from '@material-ui/core/Button';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import SweetAlert from 'react-bootstrap-sweetalert';

export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      alert: null,
      transactions: {
        user_id:'',
        book_id:'',
        status:'',
      },
    };
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(key, e) {
    var state = Object.assign({}, this.state.transactions);
    state[key] = e.target.value;
    this.setState({transactions: state});
    // console.log(this.state.categories);
  }
  handleSubmit(e) {
    e.preventDefault();
    // console.log(this.state.categories);
    var index=this.props.dataFromParent;
    const dataTransactions = this.state.transactions;
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
    this.props.action(index,dataTransactions);
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

    axios.get('https://powerful-headland-43561.herokuapp.com/api/transactions/edit/'+index)
    .then(res => {
      var state = Object.assign({}, this.state.transactions);
      state['user_id']=res.data.name;
      state['book_id']=res.data.title;
      state['status']=res.data.status;
      this.setState({transactions: state});
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
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">User</Label>
                      <Input type="text" value={this.state.transactions.user_id} onChange={(e)=>this.handleInput('user_id',e)} disabled/>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="examplePassword">Book Title</Label>
                      <Input type="text" value={this.state.transactions.book_id} onChange={(e)=>this.handleInput('book_id',e)} disabled/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="examplePassword">State</Label>
                      <Input type="text" value={this.state.transactions.status} onChange={(e)=>this.handleInput('status',e)}/>
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
