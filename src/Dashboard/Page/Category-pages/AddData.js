import React from 'react';
import axios from 'axios';
import { Col, Row, Form, FormGroup, Label, Input , Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import SweetAlert from 'react-bootstrap-sweetalert';
class AddData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      alert: null,
      categories: {
        category_name:'',
        category_slug:'',
        parent_id:'',
      },
    };
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(key, e) {
    var state = Object.assign({}, this.state.categories);
    state[key] = e.target.value;
    this.setState({categories: state});
    // console.log(this.state.categories);
  }
  handleSubmit(e) {
    e.preventDefault();
    const data = this.state.categories;
    axios.post('https://powerful-headland-43561.herokuapp.com/api/categories/store', data)
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
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Category Name</Label>
                      <Input type="text" name="category_name" placeholder="Category Name" onChange={(e)=>this.handleInput('category_name',e)}/>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="examplePassword">Category Parent ID</Label>
                      <Input type="number" name="parent_id" placeholder="Category Parent ID" onChange={(e)=>this.handleInput('parent_id',e)}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="examplePassword">Category Slug</Label>
                      <Input type="text" name="category_slug" placeholder="Category Slug" onChange={(e)=>this.handleInput('category_slug',e)}/>
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
