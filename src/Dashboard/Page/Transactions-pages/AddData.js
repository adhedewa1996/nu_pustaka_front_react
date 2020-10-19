import React from 'react';
import axios from 'axios';
import { Col, Row, Form, FormGroup, Label, CustomInput , Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import SweetAlert from 'react-bootstrap-sweetalert';
import OptionUser from './OptionUser';
class AddData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      alert: null,
      book: [],
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
    const data = this.state.transactions;
    axios.post('https://powerful-headland-43561.herokuapp.com/api/transactions/store', data)
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

  // book-Mount-Start
  componentDidMount(){
    fetch('https://powerful-headland-43561.herokuapp.com/api/transactions/book')
        .then(response => {
            return response.json();
        })
        .then(book => {
            this.setState({ book });
        });
  }
   renderBookOption() {
      return this.state.book.map(book => {
          return (
              <option key={book.id} value={book.id} >
                  { book.title }
              </option>
          );
      })
    }
  // book-Mount-End
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
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleEmail">User Name</Label>
                      <CustomInput type="select" id="exampleCustomSelectDisabled" name="category_id" onChange={(e)=>this.handleInput('user_id',e)}>
                        <option value="">Select</option>
                        <OptionUser/>
                      </CustomInput>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="examplePassword">Books Title</Label>
                      <CustomInput type="select" id="exampleCustomSelectDisabled" name="category_id" onChange={(e)=>this.handleInput('book_id',e)}>
                        <option value="">Select</option>
                        { this.renderBookOption() }
                      </CustomInput>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="examplePassword">State</Label>
                      <CustomInput type="select" id="exampleCustomSelectDisabled" name="category_id" onChange={(e)=>this.handleInput('status',e)}>
                        <option value="">Select</option>
                        <option value="beli">Buy</option>
                        <option value="pinjam">Borrow's</option>
                        <option value="sewa">Renthal</option>
                      </CustomInput>
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
