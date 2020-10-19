import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {CustomInput, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import { SnackbarProvider, useSnackbar } from 'notistack';
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
function Profil() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = variant => () => {
    // variant could be success, error, warning, info, or default
    setOpen(false);
    enqueueSnackbar('This is a success message!', { variant });
  };

  return (
    <React.Fragment>
    <div>
    <Form>
      <Typography gutterBottom onClick={handleClickOpen}>
        Profil
      </Typography>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Profile
        </DialogTitle>
        <DialogContent dividers>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Name</Label>
                <Input type="text" name="title" id="exampleEmail" placeholder="You're name" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">Phone</Label>
                <Input type="text" name="created_at" id="examplePassword" placeholder="You're phone" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="exampleAddress">Address</Label>
            <Input type="text" name="category" id="exampleAddress" placeholder="You're address"/>
          </FormGroup>
          <Row form>
            <Col md={6}>
            <FormGroup>
              <Label for="exampleAddress2">Division Title</Label>
              <Input type="text" name="address2" id="exampleAddress2" placeholder="You're division and job division"/>
            </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleCustomFileBrowser">File Browser with Data Image</Label>
                <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" label="Yo, pick a file!" />
              </FormGroup>
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClickVariant('success')} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </Form>
    </div>
    </React.Fragment>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Profil />
    </SnackbarProvider>
  );
}
