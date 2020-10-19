import React, {Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button } from 'reactstrap';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

export default class DeleteDataBooks extends Component {

  constructor(props) {
    super(props);

    this.state = {
      alert: null
    };
  }

  deleteThisGoal() {
    const getAlert = () => (
      <SweetAlert
      warning
      showCancel
      confirmBtnText="Yes, delete it!"
      confirmBtnBsStyle="danger"
      cancelBtnBsStyle="default"
      title="Are you sure?"
      onConfirm={() => this.ConfirmDelete()}
      onCancel={() => this.hideAlert()}
  >
      You will not be able to recover this imaginary file!
  </SweetAlert>
    );

    this.setState({
      alert: getAlert()
    });
  }

  ConfirmDelete() {
    const getAlertConfirmDelete = () => (
      <SweetAlert
        success
        title="Woot!"
        onConfirm={() => this.hideAlert()}
      >
        Hello world!
      </SweetAlert>
    );

    this.setState({
      alert: getAlertConfirmDelete()
    });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  render() {
    return (
      <div>
        <Button color="danger" size="sm" onClick={() => this.deleteThisGoal()}><DeleteOutline /></Button>
        {this.state.alert}
      </div>
    );
  }
}
