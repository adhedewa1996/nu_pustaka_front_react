import React, { Component } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

import { forwardRef } from 'react';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import SweetAlert from 'react-bootstrap-sweetalert';

import EditData from './EditData';
import Upload from './Upload';
const tableIcons = {
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
class TableCategory extends Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.state = {
      alert: null,
    }
  }

  deleteCategories(index) {
    const getAlert = () => (
      <SweetAlert
      warning
      showCancel
      confirmBtnText="Yes, delete it!"
      confirmBtnBsStyle="danger"
      cancelBtnBsStyle="default"
      title="Are you sure?"
      onConfirm={() => this.ConfirmDelete(index)}
      onCancel={() => this.hideAlert()}
  >
      You will not be able to recover this imaginary file from id : {index}!
  </SweetAlert>
    );
    this.setState({
      alert: getAlert()
    });
  }
  ConfirmDelete(index) {
    const getAlertConfirmDelete = () => (
      <SweetAlert
        success
        title="Woot!"
        onConfirm={() => this.hideAlert()}
      >
        Data Dihapus dengan id : {index}
      </SweetAlert>
    );
    axios.get('http://localhost:8000/api/categories/delete/'+index)
    .then(res => {
        // const categories = res.data;
        // console.log(categories);
        this.setState({
          alert: getAlertConfirmDelete()
        });
      this.tableRef.current && this.tableRef.current.onQueryChange();
    })
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  childHandler(id,data){
    axios.post('http://localhost:8000/api/categories/update/'+id, data)
    .then(res => {
      // console.log('success');
    })
  }

  render(){
    return (

        <MaterialTable style={{minWidth: 50}}
          icons={tableIcons}
          title="Books Category Data Preview"
          tableRef={this.tableRef}
          columns={[
            {
              title: 'Action',
              field: 'id',
              render: rowData => (
                <div>
                  <ButtonGroup size="small" variant="text" color="primary" aria-label="text primary button group">
                    {this.state.alert}
                    <Button variant="outlined" size="small" color="secondary" onClick={() => this.deleteCategories(rowData.id)}>
                      <DeleteOutline />
                    </Button>
                    <EditData dataFromParent = {rowData.id} action={this.childHandler}/>
                    <Upload dataFromParent = {rowData.id}/>
                  </ButtonGroup>
                </div>
              ),
            },
            {
              title: 'Cover Category',
              field: 'category_picture',
              render: rowData => (
                <img
                  style={{ height: 36, borderRadius: '50%' }}
                  src={rowData.category_picture}
                  alt={rowData.category_picture}
                />
              ),
            },
            { title: 'Category Name', field: 'category_name' },
            { title: 'Category Slug', field: 'category_slug' },
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              let url = 'http://localhost:8000/api/categories/'
              url += 'per_page=' + query.pageSize
              url += '/page=' + (query.page + 1)
              fetch(url)
                .then(response => response.json())
                .then(result => {
                  resolve({
                    data: result.data,
                    page: result.page - 1,
                    totalCount: result.total,
                  })
                })
            })
          }
          actions={[
            {
              icon: 'R',
              tooltip: 'Refresh Data',
              isFreeAction: true,
              onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange(),
            }
          ]}
        />
    );
  }
}
export default TableCategory;
