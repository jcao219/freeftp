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
import Chip from 'material-ui/Chip';
import {blue500}  from 'material-ui/styles/colors';
import './FileSystemViewer.css'

// Path must be to a directory, not to a file
let pathSplit = function(path) {
  let g = path.split(/\//);
  if(g[g.length - 1] == '') {
    g = g.slice(0, g.length - 1);
  }
  return g.map(e => e + '/')
}

export default class FileSystemViewer extends React.Component {
  render() {
    var pathButtons, files, folders;
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
      let curDirStr = "";
      pathButtons = pathSplit(this.props.model.pwd).map(
        (dirstr, i) => <Chip
          key={i}
          data-path={curDirStr += dirstr}
          onTouchTap={e => console.log(e.target.parentNode.dataset.path) }
          backgroundColor='rgb(51,51,51)'
          style={{height: '30%', top: '9px', position: 'relative',
                  marginLeft: '3px', marginRight: '3px'}}
          className="hoverHighlight"
          >{dirstr}</Chip>);
    } else {
      return (<div />)
    }

    if ( folders && folders.length )
      folders.push(<Divider inset={true} key={folders.length} />);
    // Ugly hack...
    // The 70 px below is to adjust for the top element...
    return (
      <List style={{height: 'calc(100vh - 70px)', overflow:'auto'}}>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          <IconButton
            style={{marginLeft: '12px'}}
            onTouchTap={() => console.log("TODO")}>
            <NavigationRefresh />
          </IconButton>
          {pathButtons}
        </div>
        {folders}
        {files}
      </List>
    );
  }
}
