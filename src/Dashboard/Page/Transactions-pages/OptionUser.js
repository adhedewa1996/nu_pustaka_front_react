import React from 'react';
class OptionUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
    };
  }
  // user-Mount-Start
  componentDidMount() {
    fetch('https://powerful-headland-43561.herokuapp.com/api/transactions/user')
        .then(response => {
            return response.json();
        })
        .then(user => {
            this.setState({ user });
        });
  }
   render() {
      return this.state.user.map(user => {
          return (
              <option key={user.id} value={user.id} >
                  { user.name }
              </option>
          );
      })
    }
  // user-Mount-End
}
export default OptionUser;
