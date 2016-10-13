import React from 'react';
import TopBar from './TopBar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import ConnectToSite from './ConnectToSite';
import FileSystemViewer from './FileSystemViewer';
var update = require("react-addons-update");
import './App.css';

export default class App extends React.Component {

  state = {open: false, draggable: true, openNewSite: false,
    activeSite: null, remoteFS: null};

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

  handleError = (str) => {
    console.error(str);
  }

  handleListDir = (res) => {
    const {remoteFS} = this.state;
    res.forEach(item => item.selected = false);
    const updated = update(remoteFS, {ls: {$set: res}});
    this.setState({remoteFS: updated});
  }

  handleConfirmNewSite(siteInfo) {
    this.setState({openNewSite: false,
      remoteFS: { name: siteInfo.name, ls: [], pwd: ""},
      activeSite: siteInfo.client});
    if(siteInfo.savePass) {
      // TODO
    }
    const {activeSite, remoteFS} = this.state;
    remoteFS.name = siteInfo.name;
    activeSite.on('error', this.handleError);
    activeSite.once('dir result', (res) => {
      const {remoteFS} = this.state;
      const updatedRemoteFS = update(remoteFS, {pwd: {$set: res}});
      this.setState({remoteFS: updatedRemoteFS});
      activeSite.on('ls result', this.handleListDir);
      activeSite.ls();
    });
    activeSite.pwd();
  }

  handleNavInto = (name, type) => {
    if(type == "dir") {
      this.state.activeSite.on('cwd success', () => {
        const {remoteFS} = this.state;
        let new_wd = remoteFS.pwd.replace(/\/$/, ""); // Strip trailing '/'
        new_wd += '/' + name;
        const updatedRemoteFS = update(remoteFS, {pwd: {$set: new_wd}});
        this.setState({remoteFS: updatedRemoteFS});
        this.state.activeSite.ls();
      });
      this.state.activeSite.cwd(name);
    } else {
      // TODO: Download into directory?
    }
  }

  render() {
    return (<div>
      <TopBar title={this.state.remoteFS === null ? "No Site Connected" : this.state.remoteFS.name }
        draggable={this.state.draggable} onDrawerToggle={this.handleToggle.bind(this)} />
      <Drawer open={this.state.open} docked={false}
        onRequestChange={(open) => this.setState({open, draggable: !open})}>
        <MenuItem onTouchTap={this.handleNewSite.bind(this)}>
            Connect to new site
        </MenuItem>
        <Divider/>
      </Drawer>
      <ConnectToSite open={this.state.openNewSite} onFinish={this.handleConfirmNewSite.bind(this)}
        onCancel={ () => this.setState({openNewSite:false}) } />
      <div id="actualBody" style={{height: '100%'}}>
        <FileSystemViewer model={this.state.remoteFS}
          className={this.state.remoteFS === null ? "hideFSV" : "showFSV"}
          onNavInto={this.handleNavInto}
        />
      </div>
      </div>
    )
  }
}
