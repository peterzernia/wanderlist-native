import * as userActions from "../userActions";

const user = { name: "TestUser" };

describe("User Action Creators", () => {
  it("should create a FETCH_USER_PENDING action", () => {
    const expectedAction = { type: "FETCH_USER_PENDING" };
    expect(userActions.fetchUserPending()).toEqual(expectedAction);
  });
  it("should create a FETCH_USER_FULFILLED action", () => {
    const expectedAction = {
      type: "FETCH_USER_FULFILLED",
      user
    };
    expect(userActions.fetchUserFulfilled(user)).toEqual(expectedAction);
  });
  it("should create a FETCH_USER_REJECTED action", () => {
    const expectedAction = { type: "FETCH_USER_REJECTED" };
    expect(userActions.fetchUserRejected()).toEqual(expectedAction);
  });
  it("should create a UPDATE_USER_PENDING action", () => {
    const expectedAction = { type: "UPDATE_USER_PENDING" };
    expect(userActions.updateUserPending()).toEqual(expectedAction);
  });
  it("should create a UPDATE_USER_FULFILLED action", () => {
    const expectedAction = {
      type: "UPDATE_USER_FULFILLED",
      user
    };
    expect(userActions.updateUserFulfilled(user)).toEqual(expectedAction);
  });
  it("should create a UPDATE_USER_REJECTED action", () => {
    const expectedAction = { type: "UPDATE_USER_REJECTED" };
    expect(userActions.updateUserRejected()).toEqual(expectedAction);
  });
});
