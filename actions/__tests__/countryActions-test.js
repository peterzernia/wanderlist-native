import * as countryActions from "../countryActions";

const countries = [{ name: "TestCountry" }];

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
