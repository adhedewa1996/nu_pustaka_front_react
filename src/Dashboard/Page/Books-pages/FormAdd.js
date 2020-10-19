import React, { Component } from "react";
import {CustomInput, Col, Row, Form, FormGroup, Label, Input, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import SaveIcon from '@material-ui/icons/Save';

class FormAdd extends Component {
constructor(props) {
  super(props);
         this.state = {
            category: [],
            newProduct: {
              title:'',
              description:'',
              harga_sewa:'',
              harga_pinjam:'',
              harga_beli:'',
              qty_sewa:'',
              qty_pinjam:'',
              qty_beli:'',
              halaman:'',
              publish_at:'',
              isbn:'',
              bahasa:'',
              category_id:'',
              author:'',
              penerbit:'',
              min_sewa:'',
              min_pinjam:'',
            }
          }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInput = this.handleInput.bind(this);
    }
    handleInput(key, e) {
      var state = Object.assign({}, this.state.newProduct);
      state[key] = e.target.value;
      this.setState({newProduct: state});
      // console.log(this.state.newProduct);
    }
    handleSubmit(e) {
      e.preventDefault();
      this.props.onAdd(this.state.newProduct);
    }

  componentDidMount() {
    fetch('http://localhost:8000/api/books/category-get')
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
            <option key={category.id} value={category.id} >
                { category.category_name }
            </option>
        );
    })
  }
  render() {
    return(
      <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
        <ModalHeader>New Data</ModalHeader>
        <ModalBody>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Books Title</Label>
                  <Input type="text" name="title" onChange={(e)=>this.handleInput('title',e)} placeholder="Title" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Books Description</Label>
                  <Input type="text" name="description" onChange={(e)=>this.handleInput('description',e)} placeholder="Description" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress">Books Renthal Price</Label>
                  <Input type="text" name="harga_sewa" onChange={(e)=>this.handleInput('harga_sewa',e)} placeholder="Renthal Price"/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Books Borrow's Price</Label>
                  <Input type="text" name="harga_pinjam" onChange={(e)=>this.handleInput('harga_pinjam',e)} placeholder="Borrow's Price"/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress">Books Buy Price</Label>
                  <Input type="text" name="harga_beli" onChange={(e)=>this.handleInput('harga_beli',e)} placeholder="Buy Price"/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Qty Renthal</Label>
                  <Input type="number" name="qty_sewa" onChange={(e)=>this.handleInput('qty_sewa',e)} placeholder="Qty Renthal"/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Qty Borrows</Label>
                  <Input type="number" name="qty_pinjam" onChange={(e)=>this.handleInput('qty_pinjam',e)} placeholder="Qty Borrows"/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Qty Buy</Label>
                  <Input type="number" name="qty_beli" onChange={(e)=>this.handleInput('qty_beli',e)} placeholder="Qty Buy"/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Page Books</Label>
                  <Input type="number" name="halaman" onChange={(e)=>this.handleInput('halaman',e)} placeholder="Page Books"/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Publish At</Label>
                  <Input type="date" name="publish_at" onChange={(e)=>this.handleInput('publish_at',e)} placeholder="Publish At"/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">ISBN</Label>
                  <Input type="text" name="isbn" onChange={(e)=>this.handleInput('isbn',e)} placeholder="ISBN"/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Language</Label>
                  <Input type="text" name="bahasa" onChange={(e)=>this.handleInput('bahasa',e)} placeholder="Page Books"/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Minimum Renthal</Label>
                  <Input type="number" name="min_sewa" onChange={(e)=>this.handleInput('min_sewa',e)} placeholder="Minimum Renthal"/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Minimum Borrow's</Label>
                  <Input type="number" name="min_pinjam" onChange={(e)=>this.handleInput('min_pinjam',e)} placeholder="Minimum Borrow's"/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Category</Label>
                  <CustomInput type="select" id="exampleCustomSelectDisabled" name="category_id" onChange={(e)=>this.handleInput('category_id',e)}>
                    <option value="">Select</option>
                    { this.renderCategoryOption() }
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Author</Label>
                  <Input type="text" name="author" onChange={(e)=>this.handleInput('author',e)} placeholder="Author"/>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleAddress2">Publisher</Label>
                  <Input type="text" name="penerbit" onChange={(e)=>this.handleInput('penerbit',e)} placeholder="Publisher"/>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" size="sm" type="submit"><SaveIcon/></Button>
          </ModalFooter>
        </Form>
    );
  }
}
export default FormAdd;
