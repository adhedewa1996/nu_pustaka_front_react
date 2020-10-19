import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Slider from './Slider';
import ChartBooksProduction from './ChartBooksProduction';
import { Col, Row } from 'reactstrap';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{marginBottom:15,marginTop:70}}>
    <Row>
      <Col md={12} style={{marginBottom:30}}>
        <Paper className={classes.paper}>
          <Typography variant="h5" gutterBottom>
            Home Dashboard
          </Typography>
        </Paper>
      </Col>
      <Col md={6}>
        <Paper className={classes.paper}><Slider/></Paper>
      </Col>
      <Col md={6}>
        <Paper className={classes.paper}><ChartBooksProduction/></Paper>
      </Col>
      </Row>
    </div>
  );
}
