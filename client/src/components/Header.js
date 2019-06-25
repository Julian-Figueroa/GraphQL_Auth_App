import React, { Component } from 'react';

class Header extends Component {
  render() {
    console.log('Data: ', this.props.data);

    return <h1>Header</h1>;
  }
}

export default Header;
