import React from 'react';
import TopBar from './TopBar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import ConnectToSite from './ConnectToSite';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false, draggable: true, openNewSite: false};
  }

  handleToggle() {
    var wasOpen = this.state.open;
    this.setState({open: !wasOpen,
                   draggable: wasOpen});
  }

  handleClose() {
    this.setState({open: false, draggable: true});
  }

  handleNewSite() {
    this.handleClose();
    this.setState({openNewSite: true});
  }

  handleConfirmNewSite() {
    this.setState({openNewSite: false});
  }

  render() {
    return (<div>
      <TopBar draggable={this.state.draggable} onDrawerToggle={this.handleToggle.bind(this)} />
      <Drawer open={this.state.open} docked={false} 
        onRequestChange={(open) => this.setState({open, draggable: !open})}>
        <MenuItem onTouchTap={this.handleNewSite.bind(this)}>
            New Site
        </MenuItem>
        <Divider/>
      </Drawer>
      <ConnectToSite open={this.state.openNewSite} onFinish={this.handleConfirmNewSite.bind(this)} />
      </div>
    )
  }
}
