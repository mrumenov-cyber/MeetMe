import React, {Component} from "react";

class NumberOfEvents extends Component{
    state = {
        numberOfEvents: 32,
    };

    onChangeHandler = (event) => {
        let number = event.target.value;
        this.setState({
            numberOfEvents: number
        });

        this.props.updateNumberOfEvents(number);
    }

    render(){
        return(
            <div className="NumberOfEvents-container">

                <p>Number of events:</p>
                <input type="number"
                    value={this.state.numberOfEvents}
                    className="number-of-events"
                    onChange={(e) => this.onChangeHandler(e)} />
            </div>
        );
    }
}

export default NumberOfEvents;