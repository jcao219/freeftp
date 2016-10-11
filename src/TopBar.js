import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationFullscreen from 'material-ui/svg-icons/navigation/fullscreen';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

const TopBar = () => (
  <AppBar
    title={<span>Free FTP</span>}
    style={{"-webkit-app-region": "drag"}}
    iconElementLeft={
      <IconButton
        style={{"-webkit-app-region": "no-drag"}}>
        <NavigationChevronRight />
      </IconButton>
    }
    iconElementRight={(<div>
      <IconButton
        style={{"-webkit-app-region": "no-drag"}}>
        <NavigationFullscreen />
      </IconButton>
      <IconButton
        style={{"-webkit-app-region": "no-drag"}}
        onClick={window.close.bind(window)}>
        <NavigationClose />
      </IconButton></div>
    )}
  />
);

export default TopBar;
