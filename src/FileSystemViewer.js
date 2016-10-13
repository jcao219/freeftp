import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
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
            rightIcon={<ActionInfo />}
            primaryText={entry.name}
            secondaryText={entry.date}
          />);
      files = this.props.model.ls
        .filter((entry) => entry.type == "file")
        .map((entry, index) =>
          <ListItem
            key={index}
            onDoubleClick={() => this.props.onNavInto(entry.name, entry.type)}
            leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
            rightIcon={<ActionInfo />}
            primaryText={entry.name}
            secondaryText={entry.date}
          />);
    } else {
      return (<div />)
    }
    // Ugly hack...
    // The 59 px below is to adjust for the top element...
    return (
      <div style={{height: 'calc(100vh - 59px)', overflow:'auto'}}>
      <List>
      <Subheader inset={true}>{this.props.model.pwd}</Subheader>
        {folders}
      </List>
      <Divider inset={true} />
      <List>
        {files}
      </List>
      </div>
    );
  }
}
