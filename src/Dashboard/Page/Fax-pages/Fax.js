import React, { Component } from "react";
import { createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TableBooks from './TableFax';
import AddData from './AddData';
import { Col, Row } from 'reactstrap';

const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};
class Fax extends Component {
  render() {
    return (
      <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Card style={{marginBottom:15,marginTop:70}}>
          <CardContent>
            <Row>
              <Col md={6}>
                <ThemeProvider theme={theme}>
                  <Typography gutterBottom variant="h5" component="h2" style={{fontFamily:'Roboto'}}>Fax Data Management</Typography>
                </ThemeProvider>
                <AddData/>
              </Col>
            </Row>
          </CardContent>
        </Card>
            <TableBooks/>
      </Container>
    </React.Fragment>
    );
  }
}

export default Fax;
