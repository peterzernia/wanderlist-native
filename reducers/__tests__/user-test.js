import user from "../user";

const defaultState = {
  fetchingUser: false,
  fetchedUser: false,
  updatingUser: false,
  user: { countries: [] }
};

const testUser = { username: "TestUser" };

describe("user Reducer", () => {
  it("has a default state", () => {
    expect(user(undefined, { type: "unexpected" })).toEqual({
      ...defaultState
    });
  });
  it("can handle FETCH_USER_PENDING", () => {
    expect(user(undefined, { type: "FETCH_USER_PENDING" })).toEqual({
      ...defaultState,
      fetchingUser: true
    });
  });
  it("can handle FETCH_USER_FULFILLED", () => {
    expect(
      user(undefined, {
        type: "FETCH_USER_FULFILLED",
        user: testUser
      })
    ).toEqual({
      ...defaultState,
      fetchingUser: false,
      fetchedUser: true,
      user: testUser
    });
  });
  it("can handle FETCH_USER_REJECTED", () => {
    expect(user(undefined, { type: "FETCH_USER_REJECTED" })).toEqual({
      ...defaultState,
      fetchingUser: false,
      fetchedUser: false
    });
  });
  it("can handle UPDATE_USER_PENDING", () => {
    expect(user(undefined, { type: "UPDATE_USER_PENDING" })).toEqual({
      ...defaultState,
      updatingUser: true
    });
  });
  it("can handle UPDATE_USER_FULFILLED", () => {
    expect(
      user(undefined, {
        type: "UPDATE_USER_FULFILLED",
        user: testUser
      })
    ).toEqual({
      ...defaultState,
      user: testUser
    });
  });
  it("can handle UPDATE_USER_REJECTED", () => {
    expect(user(undefined, { type: "UPDATE_USER_REJECTED" })).toEqual({
      ...defaultState,
      updatingUser: false
    });
  });
  it("can handle AUTH_LOGOUT", () => {
    expect(
      user(undefined, {
        type: "AUTH_LOGOUT"
      })
    ).toEqual({
      ...defaultState,
      user: { countries: [] }
    });
  });
});
