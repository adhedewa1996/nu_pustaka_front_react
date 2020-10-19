import React from 'react';
import axios from 'axios';
import { Row, CustomInput, Col, Form, FormGroup, FormText, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button  } from 'reactstrap';
import SaveIcon from '@material-ui/icons/Save';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import Buton from '@material-ui/core/Button';

export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.state = {
      modal: false,
      dataUpload:{
        picture:'',
        files:'',
      },
      files:null,
      picture:null,
    };
    this.toggle = this.toggle.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  toggle() {
    var index=this.props.dataFromParent;

    axios.get('http://localhost:8000/api/editbooks/'+index)
    .then(res => {
        this.setState({
            picture: res.data.picture,
            files: res.data.files,
        });

        this.setState({
          modal: !this.state.modal
        });
    })
  }
    async onSubmit(e){
      e.preventDefault()
      let res = await this.uploadFile(this.state.file);
      this.props.uploadImage(res.data);
      this.setState({
        modal: !this.state.modal
      });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]})
    }
    async uploadFile(file){
        const formData = new FormData();
        formData.append('picture',file)
        var index=this.props.dataFromParent;
        return  await axios.post('http://localhost:8000/api/upload-books/'+index, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }

  render() {

    return (
        <div>
        <Buton variant="outlined" size="small" color="primary" onClick={this.toggle}><PermMediaIcon /></Buton>
        <Modal isOpen={this.state.modal} size="lg" style={{position: 'relative',marginTop:100}}>
        <Form onSubmit={this.onSubmit}>
          <ModalHeader>Data ID: {this.props.dataFromParent}</ModalHeader>
            <ModalBody>
              <Row>
                <Col sm={10}>
                  <FormGroup>
                    <img src={this.state.picture} alt={this.state.picture} width='500' />
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
              <Button color="primary" type="submit" size="sm" ><SaveIcon/></Button>{' '}
              <Button color="secondary" size="sm" onClick={this.toggle}><CancelPresentationIcon/></Button>
            </ModalFooter>
          </Form>
        </Modal>
        </div>

    );
  }
}
