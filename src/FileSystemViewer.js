import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import {blue500}  from 'material-ui/styles/colors';

export default class FileSystemViewer extends React.Component {
  render() {
    var files, folders;
    if(this.props.model !== null) {
      folders = this.props.model.ls
        .filter((entry) => entry.type == "dir")
        .map((entry, index) =>
          <ListItem
            key={index}
            onDoubleClick={() => this.props.onNavInto(entry.name, entry.type)}
            leftAvatar={<Avatar icon={<FileFolder />} />}
            rightIconButton={<IconButton><ActionInfo /></IconButton>}
            primaryText={entry.name}
            secondaryText={entry.date}
          />);
      files = this.props.model.ls
        .filter((entry) => entry.type == "file")
        .map((entry, index) =>
          <ListItem
            key={folders.length + index}
            onDoubleClick={() => this.props.onNavInto(entry.name, entry.type)}
            leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
            rightIconButton={<IconButton><ActionInfo /></IconButton>}
            primaryText={entry.name}
            secondaryText={entry.date}
          />);
    } else {
      return (<div />)
    }
    // Ugly hack...
    // The 59 px below is to adjust for the top element...
    return (
      <List style={{height: 'calc(100vh - 59px)', overflow:'auto'}}>
        <IconButton
          style={{marginLeft: '12px'}}
          onTouchTap={() => console.log("TODO")}>
          <NavigationRefresh />
        </IconButton>
        {folders}
      <Divider inset={true} />
        {files}
      </List>
    );
  }
}
