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
      useSnackbar: false,
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
    // console.log(this.state.categories);
    var index=this.props.dataFromParent;
    const dataCategories = this.state.categories;
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
    this.props.action(index,dataCategories);
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

    axios.get('https://powerful-headland-43561.herokuapp.com/api/categories/edit/'+index)
    .then(res => {
      var state = Object.assign({}, this.state.categories);
      state['category_name']=res.data.category_name;
      state['category_slug']=res.data.category_slug;
      state['parent_id']=res.data.parent_id;
      this.setState({categories: state});
      // console.log(this.state.categories);
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
                      <Label for="exampleEmail">Category Name</Label>
                      <Input type="text" name="category_name" placeholder="Category Name" value={this.state.categories.category_name} onChange={(e)=>this.handleInput('category_name',e)}/>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="examplePassword">Category Parent ID</Label>
                      <Input type="number" name="parent_id" placeholder="Category Parent ID" value={this.state.categories.parent_id} onChange={(e)=>this.handleInput('parent_id',e)}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="examplePassword">Category Slug</Label>
                      <Input type="text" name="category_slug" placeholder="Category Slug" value={this.state.categories.category_slug} onChange={(e)=>this.handleInput('category_slug',e)}/>
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
