import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import CircularProgress from 'material-ui/CircularProgress';
import './ConnectToSite.css';
import FtpClient from './ftp-client';
import LoginDialog from './login-dialog';

const initState = function() {
  return {
    stepIndex: 0,
    addr: "",
    save: true,
    nick: "",
    nicknameHint: "",
    port: 21,
    establishing: false,
    protocol: "FTP",
    client: null,
    needLogin: false,
    savePassword: false
  }
};

/**
  * From http://www.material-ui.com/#/components/stepper
  */
export default class ConnectToSite extends React.Component {
  state = initState();

  establish() {
    var ftpClient = new FtpClient(this.state.addr, parseInt(this.state.port, 10), 
      null, null);

    ftpClient.once('login pls', () => this.setState({needLogin: true})); // TODO
    ftpClient.once('logged in', () => this.handleLoginSuccess());
    this.setState({establishing: true, client: ftpClient});
  }

  handleCancelled = () => {
    this.props.onCancel();
    this.setState(initState());
  }
  
  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
      if (this.state.establishing) {
        // TODO: cancel the FTP connection attempt
        this.setState({establishing: false});
      }
    } else {
      this.handleCancelled();
    }
  };


  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex === 1) {
      this.establish();
    }
    this.setState({
      stepIndex: stepIndex + 1,
    });
  };

  handleChangeNick = (event) => {
    this.setState({
      nick: event.target.value,
    });
  };

  handleChangePort = (event) => {
    this.setState({
      port: event.target.value,
    });
  };

  handleSaveCheck = (event) => {
    this.setState({
      save: event.target.checked
    });
  };

  handleChangeAddr = (event) => {
    this.setState({
      addr: event.target.value,
      nicknameHint: event.target.value
    });
  };

  getConfirmationPage() {
    return (<CircularProgress style={{textAlign: 'center'}} className="hcenter" size={80} thickness={5} />);
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
          <TextField className="addrField" floatingLabelText="Address" value={this.state.addr} onChange={this.handleChangeAddr} />  
          <TextField className="portField" floatingLabelText="Port" value={this.state.port} onChange={this.handleChangePort} />
          <SelectField className="protocolField" value={this.state.protocol}
            underlineStyle={{'bottom': '6px'}} labelStyle={{'top': '0px'}}>
            <MenuItem value={"FTP"} primaryText="FTP" />
          </SelectField>
          </div>
        );
      case 1:
        return (<div>
          <TextField floatingLabelText="Name this connection: " floatingLabelFixed={true}
            value={this.state.nick} hintText={this.state.nicknameHint} onChange={this.handleChangeNick} />
          <Checkbox label="Save Connection" onCheck={this.handleSaveCheck} checked={this.state.save} />
          </div>
        );
      case 2:
        return (<div style={{textAlign: 'center'}}>
            {this.getConfirmationPage()}
           </div>);
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  handleFinished = () => {
    this.setState({stepIndex: 0});
    this.props.onFinish();
  };

  handleLoginSuccess() {
    this.setState({needLogin: false});
    this.props.onFinish({client: this.state.client,
      name: this.state.nick,
      savePass: this.state.savePassword});
    this.setState(initState());
  }

  handleNeedLogin() {
    this.setState({needLogin: true});
  }

  handleLogin = (user, pass, savePassword) => {
    const {client} = this.state;
    client.login(user, pass);
    this.setState({savePassword})
  }

  handleLoginCancel = () => {
    // TODO
  }

  render() {
    const {stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div>
      <Dialog
        title="New Site"
        actions={[]}
        modal={true}
        open={this.props.open}
      >
      <LoginDialog open={this.state.needLogin} onLogin={this.handleLogin} onCancel={this.handleLoginCancel} />
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel className={stepIndex === 0 ? "blackStepLabelBold" : "blackStepLabel"}>Connect to Site</StepLabel>
      </Step>
      <Step>
        <StepLabel className={stepIndex === 1 ? "blackStepLabelBold" : "blackStepLabel"}>Save Site</StepLabel>
      </Step>
      <Step>
        <StepLabel className={stepIndex === 2 ? "blackStepLabelBold" : "blackStepLabel"}>Confirm</StepLabel>
      </Step>
      </Stepper>
      <div style={contentStyle}>
        {(
          <div>
            {this.getStepContent(stepIndex)}
            <div style={{marginTop: 33, float: 'right'}}>
              <FlatButton
                label={stepIndex === 0 ? "Cancel" : "Back"}
                onTouchTap={this.handlePrev}
                style={{marginRight: 12}}
              />
            <RaisedButton
              label={stepIndex === 2 ? 'Finish' : 'Next'}
              primary={true}
              disabled={this.state.establishing}
              onTouchTap={stepIndex === 2 ? this.handleFinished : this.handleNext}
            />
            </div>
          </div>
        )}
      </div>
      </div>
      </Dialog>
      </div>
    );
  }
}
