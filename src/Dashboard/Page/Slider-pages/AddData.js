import React from 'react';
import axios from 'axios';
import { Col, CustomInput, FormText, Row, Form, FormGroup, Label , Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
class AddData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      alert: null,
      slider: {
        img:'',
      },
    };
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  async handleSubmit(e){
    e.preventDefault()
    let res = await this.uploadFile(this.state.img);
    console.log(res.data);
    this.setState({
      modal: !this.state.modal
    });
  }
  onChange(e) {
      this.setState({img:e.target.files[0]})
  }
  async uploadFile(file){
      const formData = new FormData();
      formData.append('picture',file)
      return  await axios.post('https://powerful-headland-43561.herokuapp.com/api/slider/store', formData, {
          headers: {
              'content-type': 'multipart/form-data'
          }
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
                      <Label for="exampleFile">Picture</Label>
                      <CustomInput type="file" id="exampleCustomFileBrowser" name="picture" onChange={this.onChange}/>
                      <FormText color="muted">
                        This is some placeholder block-level help text for the above input.
                        It's a bit lighter and easily wraps to a new line.
                      </FormText>
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
