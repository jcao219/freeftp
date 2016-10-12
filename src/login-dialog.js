import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

export default class LoginDialog extends React.Component {

  state = { user: "", pass: "", save: true};
  
  handleCancel = () => {
    this.props.onCancel();
  };

  handleLogin = () => {
    const {user, pass, save} = this.state;
    this.props.onLogin(user, pass, save);
    this.resetFields();
  };

  resetFields() {
    this.setState({user: "", pass: ""});
  }

  setValue(field, event, val) {
    var object = {};
    object[field] = val;
    this.setState(object);
  }

  render() {
    const actions = [
      <FlatButton
        disabled
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
        <Checkbox
          checked={this.state.save}
          label="Save password"
          onCheck={this.setValue.bind(this, "save")}
        />
      </Dialog>
    );
  }
}
