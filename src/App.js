import React from 'react';
import TopBar from './TopBar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import ConnectToSite from './ConnectToSite';
import FileSystemViewer from './FileSystemViewer';

export default class App extends React.Component {

  state = {open: false, draggable: true, openNewSite: false,
    status: "No Site Connected", activeSite: null};

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

  handleConfirmNewSite(siteInfo) {
    this.setState({openNewSite: false, status: siteInfo.name, activeSite: siteInfo.client});
    if(siteInfo.savePass) {
      // TODO
    }
    this.state.activeSite.once('dir result', (pwd) => {
      // TODO
    });
    this.state.activeSite.getPwd();
  }

  render() {
    return (<div>
      <TopBar title={this.state.status} draggable={this.state.draggable} onDrawerToggle={this.handleToggle.bind(this)} />
      <Drawer open={this.state.open} docked={false}
        onRequestChange={(open) => this.setState({open, draggable: !open})}>
        <MenuItem onTouchTap={this.handleNewSite.bind(this)}>
            Connect to new site
        </MenuItem>
        <Divider/>
      </Drawer>
      <ConnectToSite open={this.state.openNewSite} onFinish={this.handleConfirmNewSite.bind(this)}
        onCancel={ () => this.setState({openNewSite:false}) } />
      </div>
    )
  }
}
