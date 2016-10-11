import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

export default class LoginDialog extends React.Component {

  state = { user: "", pass: "" };
  
  handleCancel = () => {
    this.props.onCancel();
  };

  handleLogin = () => {
    const {user, pass} = this.state;
    this.props.onLogin(user, pass);
  };

  setValue(field, event) {
    var object = {};
    object[field] = event.target.value;
    this.setState(object);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.handleCancel} />,
      <FlatButton
        label="Login"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleLogin}/>
    ];
    return (
      <Dialog title="Login"
        actions={actions}
        modal={true}
        open={this.props.open}
      >
        <TextField
          hintText="Username"
          value={this.state.user}
          onChange={this.setValue.bind(this, "user")}
        /><br />
        <TextField
          floatingLabelText="Password"
          value={this.state.pass}
          onChange={this.setValue.bind(this, "pass")}
          type="password"
        />
      </Dialog>
    );
  }
}
