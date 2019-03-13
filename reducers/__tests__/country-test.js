import country from "../country";

const countries = [{ name: "Test1" }, { name: "Test2" }];

const defaultState = {
  fetchingCountries: false,
  fetchedCountries: false,
  countries: []
};

describe("country Reducer", () => {
  it("has a default state", () => {
    expect(country(undefined, { type: "unexpected" })).toEqual({
      ...defaultState
    });
  });
  it("can handle FETCH_COUNTRIES_PENDING", () => {
    expect(country(undefined, { type: "FETCH_COUNTRIES_PENDING" })).toEqual({
      ...defaultState,
      fetchingCountries: true,
      fetchedCountries: false
    });
  });
  it("can handle FETCH_COUNTRIES_FULFILLED", () => {
    expect(
      country(undefined, {
        type: "FETCH_COUNTRIES_FULFILLED",
        countries: countries
      })
    ).toEqual({
      ...defaultState,
      fetchingCountries: false,
      fetchedCountries: true,
      countries: countries
    });
  });
  it("can handle FETCH_COUNTRIES_REJECTED", () => {
    expect(country(undefined, { type: "FETCH_COUNTRIES_REJECTED" })).toEqual({
      ...defaultState,
      fetchingCountries: false,
      fetchedCountries: false
    });
  });
});
