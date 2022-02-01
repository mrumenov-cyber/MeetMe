import React, {Component, PureComponent} from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { extractLocations, getEvents, checkToken, getAccessToken  } from "./api";
import { OfflineAlert } from "./Alert";
import { Container, Row, Col, Card } from "react-bootstrap";
import WelcomeScreen from './WelcomeScreen';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


class App extends Component {
  state = {
    events: [],
    locations: [],
    showWelcomeScreen: undefined,
    numberOfEvents: 32,
    currentLocation: '',
  };
 

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false: true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
      if ((code || isTokenValid) && this.mounted) {
        getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
        }
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

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
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

      <Card>
      <h4>Events in each city</h4>
        <ResponsiveContainer height={400}>
        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
                <XAxis type="category" dataKey="city" name="city" />
                <YAxis
                  type="number"
                  dataKey="number"
                  name="number of events"
                  allowDecimals={false}
                />
           <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={this.getData()} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
        </Card>

        <EventList
          events={this.state.events}
        />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;