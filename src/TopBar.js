import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationFullscreen from 'material-ui/svg-icons/navigation/fullscreen';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

export default class TopBar extends React.Component {
  render() {
    return (<AppBar
      title={<span>Free FTP</span>}
      style={{"-webkit-app-region": "drag"}}
      iconElementLeft={
        <IconButton
          style={{"-webkit-app-region": "no-drag"}}
          onClick={this.props.onDrawerToggle}>
          <NavigationChevronRight />
        </IconButton>
      }
      iconElementRight={(<div>
        <IconButton
          style={{"-webkit-app-region": "no-drag"}}
          onClick={() => window.resizeTo(screen.availWidth, screen.availHeight)}>
          <NavigationFullscreen />
        </IconButton>
        <IconButton
          style={{"-webkit-app-region": "no-drag"}}
          onClick={window.close.bind(window)}>
          <NavigationClose />
        </IconButton></div>
      )}
    />
    )
  }
}

