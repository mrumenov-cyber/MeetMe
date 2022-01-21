import React from "react";
import {shallow} from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
      NumberOfEventsWrapper = shallow(<NumberOfEvents updateNumberOfEvents={() => {}}/>);
    });

    test('render text input', () => {
        expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
    });

    test('change state when number input changes', () => {
      NumberOfEventsWrapper.setState({numberOfEvents: 15});
      NumberOfEventsWrapper.find('.number-of-events').simulate('change', {target: {value: 18}});
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(18);
    });

});