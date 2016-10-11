import React from 'react';
import TopBar from './TopBar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false, draggable: true};
  }

  handleToggle() {
    var wasOpen = this.state.open;
    this.setState({open: !wasOpen,
                   draggable: wasOpen});
  }

  handleClose() {
    this.setState({open: false, draggable: true});
  }

  render() {
    return (<div>
      <TopBar draggable={this.state.draggable} onDrawerToggle={this.handleToggle.bind(this)} />
      <Drawer open={this.state.open} docked={false} 
        onRequestChange={(open) => this.setState({open, draggable: !open})}>
        <MenuItem onTouchTap={this.handleClose.bind(this)}>
            New Site
        </MenuItem>
        <Divider/>
      </Drawer>
      </div>
    )
  }
}
