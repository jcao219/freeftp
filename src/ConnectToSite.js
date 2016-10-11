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
import './ConnectToSite.css';

/**
  * From http://www.material-ui.com/#/components/stepper
  */
export default class ConnectToSite extends React.Component {
  state = {
    stepIndex: 0,
    addr: "",
    nick: "",
    nicknameHint: "",
    port: 21,
    protocol: "FTP"
  };

  handleNext = () => {
    const {stepIndex} = this.state;
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

  handleChangeAddr = (event) => {
    this.setState({
      addr: event.target.value,
      nicknameHint: event.target.value
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    } else {
      this.handleFinished(); // Change to handleCancelled
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
          <TextField floatingLabelText="Address" value={this.state.addr} onChange={this.handleChangeAddr} />  
          <TextField floatingLabelText="Port" value={this.state.port} onChange={this.handleChangePort} />
          <SelectField style={{width: 150}} value={this.state.protocol}
            underlineStyle={{'bottom': '6px'}}>
            <MenuItem value={"FTP"} primaryText="FTP" />
          </SelectField>
          </div>
        );
      case 1:
        return <TextField floatingLabelText="Name this connection: " floatingLabelFixed={true}
          value={this.state.nick} hintText={this.state.nicknameHint} onChange={this.handleChangeNick} />;
      case 2:
        return 'TODO';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  handleFinished = () => {
    this.setState({stepIndex: 0});
    this.props.onFinish();
  };

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
