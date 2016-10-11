import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationFullscreen from 'material-ui/svg-icons/navigation/fullscreen';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

export default class TopBar extends React.Component {
  render() {
    return (<AppBar
      title={<span>{this.props.title}</span>}
      style={this.props.draggable ? {WebkitAppRegion: "drag"} : {} }
      iconElementLeft={
        <IconButton
          style={{WebkitAppRegion: "no-drag"}}
          onTouchTap={this.props.onDrawerToggle}>
          <NavigationChevronRight />
        </IconButton>
      }
      iconElementRight={(<div>
        <IconButton
          style={{WebkitAppRegion: "no-drag"}}
          onTouchTap={() => window.resizeTo(screen.availWidth, screen.availHeight)}>
          <NavigationFullscreen />
        </IconButton>
        <IconButton
          style={{WebkitAppRegion: "no-drag"}}
          onTouchTap={window.close.bind(window)}>
          <NavigationClose />
        </IconButton></div>
      )}
    />
    )
  }
}

