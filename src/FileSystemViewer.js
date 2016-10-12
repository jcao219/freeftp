import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class FileSystemViewer extends React.Component {

  state = {multi: false};

  constructor(props) {
    super(props);
    document.addEventListener('keydown', (evt) => {
      if ((evt.keyCode === 16 || evt.keyCode === 17) && !this.state.multi) { // SHIFT
        this.setState({multi: true});
      }
    });

    document.addEventListener('keyup', (evt) => {
      if ((evt.keyCode === 16 || evt.keyCode === 17) && this.state.multi) { // SHIFT
        this.setState({multi: false});
      }
    });
  }

  render() {
    var entries;
    if(this.props.model !== null) {
      entries = this.props.model.ls.map((entry, index) =>
        <TableRow key={index} selected={entry.selected}>
          <TableRowColumn>{entry.name}</TableRowColumn>
          <TableRowColumn>{entry.size}</TableRowColumn>
          <TableRowColumn>{entry.type}</TableRowColumn>
          <TableRowColumn>{entry.date}</TableRowColumn>
        </TableRow>);
    }
    return (
      <div><Table className={this.props.className} multiSelectable={this.state.multi}>
        <TableHeader displayRowCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Size</TableHeaderColumn>
            <TableHeaderColumn>Type</TableHeaderColumn>
            <TableHeaderColumn>Date</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {entries}
        </TableBody>
      </Table></div>
    );
  }
}
