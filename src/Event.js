import React, { Component } from "react";
import {Button, Container} from 'react-bootstrap';

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
        <Container className="event">
                <h2 className="summary"> {event.summary} </h2>
                <div className="location">Location: @{event.summary} | {event.location}</div>
                <div className="start-date">Time Zone and Date: {event.dateTime} ({event.timeZone})</div>
                <br/>
                {!collapsed && (
                    <div className={`extra-details ${this.state.collapsed ? "hide" : "show"}`}>
                        <br/>
                        <h4 className="about">About Event</h4>
                        <a href={event.htmlLink} target="_blank" rel="noreferrer">
                            See deatails on Google calendar
                        </a>
                        <p className="event-description">{event.description}</p>
                        <br/>
                    </div>
                )}
                <Button size="med" className={`${collapsed ? "show" : "hide"}-details-btn`}
                onClick={this.handleClick}>{collapsed ? "Show Details" : "Hide Details"} </Button>
        </Container>
               
        );
    }
}
export default Event;