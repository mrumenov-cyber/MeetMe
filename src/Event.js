import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

class Event extends Component {

    state = {
        collapsed: true,
    }

    handleClick = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };

    render(){
        const {event} = this.props;
        const { collapsed } = this.state;
        return(
            <div className="event">
                <h2 className="summary"> Summary : {event.summary} </h2>
                <div className="location">Location: @{event.summary} | {event.location}</div>
                <div className="timezone-date">Time Zone and Date</div>
                <Button className={`${collapsed ? "show" : "hide"}-details-btn`}
                onClick={this.handleClick}>{collapsed ? "Show Details" : "Hide Details"}</Button>
            </div>
        );
    }
}
export default Event;