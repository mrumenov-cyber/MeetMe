import React from "react";
import { shallow } from "enzyme";
import { mockData } from "../mock-data";
import Event from "../Event";

describe ('<Event /> component', () => {
    let EventWrapper;
    beforeAll(() => {
        EventWrapper = shallow (<Event event={mockData} />)
    });

    //Basic info test
    test("Summary is displayed", () => {
        expect(EventWrapper.find(".summary")).toHaveLength(1);
    });

    test("Location is displayed", () => {
        expect(EventWrapper.find(".location")).toHaveLength(1);
    });

    test("Timezone and date are displayed", ()=> {
        expect(EventWrapper.find(".timezone-date")).toHaveLength(1);
    });

    test("Show/Hide deatils button is rendered", () =>{
        expect(EventWrapper.find(".show-details-btn")).toHaveLength(1);
    });

    //Functionality tests
    //1st test
    test ("Event element is collapsed by default", () => {
        expect(EventWrapper.state("collapsed")).toBe(true);
    });

    //2nd test
    test ("Clicking on show details button shows exttra details", () => {
        EventWrapper.setState({
            collapsed: true,
        });
        EventWrapper.find(".show-details-btn").simulate("click");
        expect(EventWrapper.state("collapsed")).toBe(false);
    });

    //3rd test
    test ("Hiding extra details on the same button as test 2", () => {
        EventWrapper.setState({
            collapsed: false,
        });
        EventWrapper.find(".hide-details-btn").simulate("click");
        expect(EventWrapper.state('collapsed')).toBe(true);
    });
});