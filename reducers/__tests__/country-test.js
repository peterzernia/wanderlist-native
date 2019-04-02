import country, { initialState } from "../country";

const countries = [{ name: "Test1" }, { name: "Test2" }];

describe("country Reducer", () => {
  it("has a default state", () => {
    expect(country(undefined, { type: "unexpected" })).toEqual({
      ...initialState
    });
  });
  it("can handle FETCH_COUNTRIES_PENDING", () => {
    expect(country(undefined, { type: "FETCH_COUNTRIES_PENDING" })).toEqual({
      ...initialState,
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
      ...initialState,
      fetchingCountries: false,
      fetchedCountries: true,
      countries: countries
    });
  });
  it("can handle FETCH_COUNTRIES_REJECTED", () => {
    expect(country(undefined, { type: "FETCH_COUNTRIES_REJECTED" })).toEqual({
      ...initialState,
      fetchingCountries: false,
      fetchedCountries: false
    });
  });
  it("can handle AUTH_LOGOUT", () => {
    expect(country({ ...initialState }, { type: "AUTH_LOGOUT" })).toEqual({
      ...initialState
    });
  });
});
