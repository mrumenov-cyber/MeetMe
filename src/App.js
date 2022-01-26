import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import { OfflineAlert } from "./Alert";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: ''
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events),
        });
      }
      if (!navigator.onLine) {
        this.setState({
          OfflineAlertText: 'You are not connected to the internet'
        });
      } else {
        this.setState({
          OfflineAlertText: ''
        });
       }
  });
}

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount=this.state.numberOfEvents) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, eventCount),
          currentLocation: location,
        });
      }
    });
  };

  updateNumberOfEvents = (number) => {
    this.setState({
      numberOfEvents: number,
    });
    this.updateEvents(this.state.currentLocation, number);
  };

  render() {
    return (
      <div className="App">
        <h2> Meet App </h2>
        { !navigator.onLine ? (<OfflineAlert text='You are offline!' />) : (<OfflineAlert text=' ' />)}
        <p>Choose your nearest city</p>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <br/>
        <NumberOfEvents
          updateNumberOfEvents={this.updateNumberOfEvents}
        />
        <br/>
        <EventList
          events={this.state.events}
        />
      </div>
    );
  }
}

export default App;