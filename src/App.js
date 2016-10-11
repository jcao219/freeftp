import React from 'react';
import TopBar from './TopBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  render() {
    return (<div><TopBar onDrawerToggle={this.handleToggle.bind(this)} />
      <Drawer open={this.state.open} docked={false} 
      onRequestChange={(open) => this.setState({open})}>
        <MenuItem>Menu Item</MenuItem>
      </Drawer></div>
    )
  }
}
