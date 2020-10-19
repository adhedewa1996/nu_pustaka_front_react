import React, { useState } from 'react';
import axios from 'axios';
import {Modal} from 'reactstrap';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import Fab from '@material-ui/core/Fab';
import { SnackbarProvider, useSnackbar } from 'notistack';
import FormAdd from './FormAdd';

const AddData = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const { enqueueSnackbar } = useSnackbar();
  function dataadd(product)
  {
    const databooks = product;
    axios.post('http://localhost:8000/api/books/store', databooks)
    .then(res => {
        const newProduct = res.data;
        console.log(newProduct);
        enqueueSnackbar('This is a success message!');
        setModal(!modal);
    })
  }
  const externalCloseBtn = <button className="close" style={{ position: 'relative', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;
  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={toggle}>
        <AddToQueueIcon />
      </Fab>
      <Modal isOpen={modal} toggle={toggle} className={className} external={externalCloseBtn} size="lg" style={{position: 'relative',marginTop:100}}>
          <FormAdd onAdd={dataadd}/>
      </Modal>
    </div>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AddData/>
    </SnackbarProvider>
  );
}
