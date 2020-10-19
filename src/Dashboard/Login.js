import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {
  Card, CardText, CardBody,CardHeader,Row,Col
} from 'reactstrap';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import './login.css';
import { NavLink } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      login: {
        email:'',
        password:'',
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(key, e){
    var state = Object.assign({}, this.state.login);
    state[key]=e.target.value;
    this.setState({login:state})
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.login);
  }
  render(){
    return (
      <div className="bg">
        <React.Fragment>
          <CssBaseline />
          <Container fixed>
            <Row>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                  <Card style={{width:500,marginTop:200}}>
                    <CardHeader>
                      <CardText>Login with started your activities</CardText>
                    </CardHeader>
                    <CardBody>
                      <div>
                        <div>
                        <FormControl>
                          <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
                          <Input
                            id="input-with-icon-adornment"
                            startAdornment={
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                            }
                            onChange={(e)=>this.handleInput('email',e)}
                          />
                        </FormControl>
                        <FormControl>
                          <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
                          <Input
                            id="input-with-icon-adornment"
                            startAdornment={
                              <InputAdornment position="start">
                                <LockIcon />
                              </InputAdornment>
                            }
                            onChange={(e)=>this.handleInput('password',e)}
                          />
                        </FormControl>
                        </div>
                      </div>
                    </CardBody>
                    <CardBody>
                      <CardText>Please enter the system with your account to start your activities.</CardText>

                        <Button variant="contained" color="secondary" type="submit">
                          Login
                        </Button>

                    </CardBody>
                  </Card>
                </form>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}
export default Login;
