import React, {Component} from "react";
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component{
    state = {
        numberOfEvents: 32,
        infoText: "",
    };

    onChangeHandler = (event) => {
        let number = event.target.value;
        if (number <= 0 || number > 32) {
            this.setState({
              infoText: "Enter number between 1 and 32",
            });
          } else {
            this.setState({
                numberOfEvents: number,
                infoText: "",
            });
        }
        this.props.updateNumberOfEvents(number);
    };

    render(){
        return(
            <div className="NumberOfEvents-container">
                <p>Number of events:</p>
                <input type="number"
                    className="number-of-events"
                    value={this.state.numberOfEvents}
                    onChange={(e) => this.onChangeHandler(e)} />
                    <ErrorAlert text={this.state.infoText} />
            </div>
        );
    }
}

export default NumberOfEvents;