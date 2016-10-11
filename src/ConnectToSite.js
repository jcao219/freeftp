import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import './ConnectToSite.css';

/**
  * From http://www.material-ui.com/#/components/stepper
  */
export default class ConnectToSite extends React.Component {
  state = {
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'TODO';
      case 1:
        return 'TODO';
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
            <p>{this.getStepContent(stepIndex)}</p>
            <div style={{marginTop: 33, float: 'right'}}>
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
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
