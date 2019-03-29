import * as authActions from "../authActions";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async action creators", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      token: null,
      authenticating: false,
      authenticated: false
    });
  });

  afterEach(() => {
    store.clearActions();
  });

  /**
   * If token is null, AUTH_LOGOUT is dispatched, if there is a
   * token, AUTH_SUCCESS is dispatched.
   */
  it("should check auth state", () => {
    let token = null;
    store.dispatch(authActions.authCheckState(token));
    let actions = store.getActions();
    expect(actions[0]).toEqual(authActions.authLogout());

    store.clearActions();

    token = "testtoken";
    store.dispatch(authActions.authCheckState(token));
    actions = store.getActions();
    expect(actions[0]).toEqual(authActions.authSuccess(token));
  });
});

describe("Auth Action Creators", () => {
  it("should create a AUTH_START action", () => {
    const expectedAction = { type: "AUTH_START" };
    expect(authActions.authStart()).toEqual(expectedAction);
  });
  it("should create a AUTH_SUCCESS action", () => {
    const token = "23tnhasu893tnau";
    const expectedAction = {
      type: "AUTH_SUCCESS",
      token
    };
    expect(authActions.authSuccess(token)).toEqual(expectedAction);
  });
  it("should create a AUTH_FAIL action", () => {
    const expectedAction = { type: "AUTH_FAIL" };
    expect(authActions.authFail()).toEqual(expectedAction);
  });
  it("should create a AUTH_LOGOUT action", () => {
    const expectedAction = { type: "AUTH_LOGOUT" };
    expect(authActions.authLogout()).toEqual(expectedAction);
  });
});
