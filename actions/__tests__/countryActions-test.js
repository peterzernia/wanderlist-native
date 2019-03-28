import * as countryActions from "../countryActions";
import { REACT_APP_API_URL } from "react-native-dotenv";
import { Alert } from "react-native";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const countries = [{ name: "TestCountry" }];

// Async action tests
describe("country async actions", () => {
  let store;
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = mockStore({
      countries: [],
      fetchingCountries: false,
      fetchedCountries: false
    });
  });

  afterEach(() => {
    mock.restore();
    store.clearActions();
  });

  it("dispatches FETCH_COUNTRIES_FULFILLED after axios request", async () => {
    const query = "TestCountry";
    mock
      .onGet(`${REACT_APP_API_URL}/api/v1/countries/?search=${query}`)
      .replyOnce(200, countries);
    await store.dispatch(countryActions.fetchCountries(query));
    const actions = store.getActions();
    expect(actions[0]).toEqual(countryActions.fetchCountriesPending());
    expect(actions[1]).toEqual(
      countryActions.fetchCountriesFulfilled(countries)
    );
  });

  it("dispatches FETCH_COUNTRIES_REJECTED if internal server error & alerts", async () => {
    spy = jest.spyOn(Alert, "alert");
    const query = "TestCountry";
    const data = { "internal server error": "" };
    mock
      .onGet(`${REACT_APP_API_URL}/api/v1/countries/?search=${query}`)
      .replyOnce(500, data);
    await store.dispatch(countryActions.fetchCountries(query));
    const actions = store.getActions();
    expect(actions[0]).toEqual(countryActions.fetchCountriesPending());
    expect(actions[1]).toEqual(countryActions.fetchCountriesRejected());
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

// Action creator tests.
describe("Country Action Creators", () => {
  it("should create a FETCH_COUNTRIES_PENDING action", () => {
    const expectedAction = { type: "FETCH_COUNTRIES_PENDING" };
    expect(countryActions.fetchCountriesPending()).toEqual(expectedAction);
  });
  it("should create a FETCH_COUNTRIES_FULFILLED action", () => {
    const expectedAction = {
      type: "FETCH_COUNTRIES_FULFILLED",
      countries
    };
    expect(countryActions.fetchCountriesFulfilled(countries)).toEqual(
      expectedAction
    );
  });
  it("should create a FETCH_COUNTRIES_REJECTED action", () => {
    const expectedAction = { type: "FETCH_COUNTRIES_REJECTED" };
    expect(countryActions.fetchCountriesRejected()).toEqual(expectedAction);
  });
});
