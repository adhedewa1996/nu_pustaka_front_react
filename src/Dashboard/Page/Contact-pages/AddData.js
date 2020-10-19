import React, { useState } from 'react';
import {CustomInput, Col, Row, Form, FormGroup, Label, Input , Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import { SnackbarProvider, useSnackbar } from 'notistack';

const AddData = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = variant => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('This is a success message!', { variant });
    setModal(!modal);
  };

  const externalCloseBtn = <button className="close" style={{ position: 'relative', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;
  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={toggle}>
        <AddToQueueIcon />
      </Fab>
      <Form>
        <Modal isOpen={modal} toggle={toggle} className={className} external={externalCloseBtn} size="lg" style={{position: 'relative',marginTop:100}}>
          <ModalHeader>New Data</ModalHeader>
          <ModalBody>

              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Books Title</Label>
                    <Input type="text" name="title" id="exampleEmail" placeholder="Title" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="examplePassword">Books Created</Label>
                    <Input type="text" name="created_at" id="examplePassword" placeholder="Books Created" />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="exampleAddress">Books Category</Label>
                <Input type="text" name="category" id="exampleAddress" placeholder="Books Category"/>
              </FormGroup>
              <FormGroup>
                <Label for="exampleAddress2">Books Description</Label>
                <Input type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor"/>
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleCustomFileBrowser">File Browser with Cover Books</Label>
                    <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" label="Yo, pick a file!" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleCustomFileBrowser">File Browser with Data Books</Label>
                    <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" label="Yo, pick a file!" />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" size="sm" onClick={handleClickVariant('success')}><SaveIcon/></Button>{' '}
              <Button color="secondary" size="sm" onClick={toggle}><CancelPresentationIcon/></Button>
            </ModalFooter>
          </Modal>
      </Form>
    </div>
  );
}
export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AddData />
    </SnackbarProvider>
  );
}
