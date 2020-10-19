import React from 'react';
import axios from 'axios';
import { CustomInput, Col, Row, Form, FormGroup, Label, Input , Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import SaveIcon from '@material-ui/icons/Save';
import Buton from '@material-ui/core/Button';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import SweetAlert from 'react-bootstrap-sweetalert';

export default class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.state = {
      category: [],
      modal: false,
      products: {

      },
      alert: null,
    };
    this.toggle = this.toggle.bind(this);

  this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    var index=this.props.dataFromParent;

    axios.get('https://powerful-headland-43561.herokuapp.com/api/editbooks/'+index)
    .then(res => {
        this.setState({
            title:res.data.title,
            description:res.data.description,
            harga_sewa:res.data.harga_sewa,
            harga_pinjam:res.data.harga_pinjam,
            harga_beli:res.data.harga_beli,
            qty_sewa:res.data.qty_sewa,
            qty_pinjam:res.data.qty_pinjam,
            qty_beli:res.data.qty_beli,
            halaman:res.data.halaman,
            publish_at:res.data.publish_at,
            isbn:res.data.isbn,
            bahasa:res.data.bahasa,
            min_sewa:res.data.min_sewa,
            min_pinjam:res.data.min_pinjam,
            author:res.data.author,
            penerbit:res.data.penerbit,
        });

        this.setState({
          modal: !this.state.modal
        });
    })
  }
  hideAlert() {
    this.setState({
      alert: null
    });
    this.setState({
      modal: !this.state.modal
    });
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    })
    this.setState({
      editProduct:{
        [name]: value,
      }
    })
    // console.log(this.state.editProduct);
  }

  handleSubmit(event) {
    var index=this.props.dataFromParent;
    const databooks = this.state.editProduct;
    const getAlertUpdated = () => (
      <SweetAlert
        success
        title="Success Updated"
        onConfirm={() => this.hideAlert()}
      >
        Data Diupdate dengan id : {index}
      </SweetAlert>
    );
    this.setState({
      alert: getAlertUpdated()
    });
    this.props.action(index,databooks);
  }

  componentDidMount() {
    fetch('https://powerful-headland-43561.herokuapp.com/api/books/category-get')
        .then(response => {
            return response.json();
        })
        .then(category => {
            this.setState({ category });
        });
  }

 renderCategoryOption() {
    return this.state.category.map(category => {
        return (
            <option key={category.id} value={category.id}>
                { category.category_name }
            </option>
        );
    })
  }

  render() {

    return (
        <div>
        <Buton variant="outlined" size="small" color="primary"onClick={this.toggle}>
          <SystemUpdateAltIcon />
        </Buton>
        <Modal isOpen={this.state.modal} size="lg" style={{position: 'relative',marginTop:100}}>
        <Form onSubmit={this.handleSubmit}>
          <ModalHeader>Data ID: {this.props.dataFromParent}</ModalHeader>
            <ModalBody>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Books Title</Label>
                  <Input type="text" name="title" value={this.state.title}  onChange={this.handleInputChange} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Books Description</Label>
                  <Input type="text" name="description" value={this.state.description}  onChange={this.handleInputChange}/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress">Books Renthal Price</Label>
                  <Input type="text" name="harga_sewa" value={this.state.harga_sewa}  onChange={this.handleInputChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Books Borrow's Price</Label>
                  <Input type="text" name="harga_pinjam" value={this.state.harga_pinjam}  onChange={this.handleInputChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress">Books Buy Price</Label>
                  <Input type="text" name="harga_beli" value={this.state.harga_beli}  onChange={this.handleInputChange}/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Qty Renthal</Label>
                  <Input type="number" name="qty_sewa" value={this.state.qty_sewa}  onChange={this.handleInputChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Qty Borrows</Label>
                  <Input type="number" name="qty_pinjam" value={this.state.qty_pinjam}  onChange={this.handleInputChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Qty Buy</Label>
                  <Input type="number" name="qty_beli" value={this.state.qty_beli}  onChange={this.handleInputChange}/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Page Books</Label>
                  <Input type="number" name="halaman" value={this.state.halaman}  onChange={this.handleInputChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Publish At</Label>
                  <Input type="date" name="publish_at" value={this.state.publish_at}  onChange={this.handleInputChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">ISBN</Label>
                  <Input type="text" name="isbn" value={this.state.isbn}  onChange={this.handleInputChange}/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Language</Label>
                  <Input type="text" name="bahasa" value={this.state.bahasa}  onChange={this.handleInputChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Minimum Renthal</Label>
                  <Input type="number" name="min_sewa" value={this.state.min_sewa}  onChange={this.handleInputChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Minimum Borrow's</Label>
                  <Input type="number" name="min_pinjam" value={this.state.min_pinjam}  onChange={this.handleInputChange}/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Category</Label>
                  <CustomInput type="select" id="exampleCustomSelectDisabled" name="category_id" onChange={this.handleInputChange}>
                    <option value="">Select</option>
                    { this.renderCategoryOption() }
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Author</Label>
                  <Input type="text" name="author" value={this.state.author}  onChange={this.handleInputChange}/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Publisher</Label>
                  <Input type="text" name="penerbit" value={this.state.penerbit}  onChange={this.handleInputChange}/>
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
