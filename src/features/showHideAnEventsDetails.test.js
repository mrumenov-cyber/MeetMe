import React from "react";
import { shallow } from "enzyme";
import { mockData } from "../mock-data";
import EventList from "../EventList";
import Event from "../Event";
import { loadFeature, defineFeature } from "jest-cucumber";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  test("An event element is collapsed by default", ({ given, when, then }) => {
    given("the user is on the home page", () => {});

    
    when("An eventlist is displayed", () => {
     
    });

   
    then("the event element is collapsed by default", () => {
      
    });
  });

  test("User can expand an event to see its details", ({
    given,
    when,
    then,
  }) => {
    
    given(
      "the user is on the main page and list of events has been loaded",
      () => {
        
      }
    );

    when("the user clicks on the show-details-button of an event", () => {
      
    });

    then("the event element will be expanded to show the event details", () => {
     
    });
  });

  test("User can collapse an event to hide its details", ({
    given,
    when,
    then,
  }) => {
    
    given("the user has expanded an event to see its details", () => {
      
    });

    when("the user has clicked on hide-details-button", () => {
      
    });

    then("the event details will be hidden", () => {
      
    });
  });
});