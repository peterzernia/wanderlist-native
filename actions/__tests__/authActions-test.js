import * as authActions from "../authActions";
import { REACT_APP_API_URL } from "react-native-dotenv";
import { Alert } from "react-native";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async action creators", () => {
  let store;
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = mockStore({
      token: null,
      authenticating: false,
      authenticated: false
    });
  });

  afterEach(() => {
    mock.restore();
    store.clearActions();
    jest.restoreAllMocks();
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

  it("dispatches AUTH_SUCCESS after axios request to login", async () => {
    const username = "TestUser";
    const password = "password";
    const data = { key: "testtoken" };
    mock
      .onPost(`${REACT_APP_API_URL}/api/v1/rest-auth/login/`)
      .replyOnce(200, data);
    await store.dispatch(authActions.authLogin(username, password));
    const actions = store.getActions();
    expect(actions[0]).toEqual(authActions.authStart());
    expect(actions[1]).toEqual(authActions.authSuccess(data.key));
  });

  it("dispatches AUTH_FAIL if internal server error on authLogin & alerts", async () => {
    spy = jest.spyOn(Alert, "alert");
    const username = "TestUser";
    const password = "password";
    const data = { "internal server error": "", non_field_errors: "" };
    mock
      .onPost(`${REACT_APP_API_URL}/api/v1/rest-auth/login/`)
      .replyOnce(500, data);
    await store.dispatch(authActions.authLogin(username, password));
    const actions = store.getActions();
    expect(actions[0]).toEqual(authActions.authStart());
    expect(actions[1]).toEqual(authActions.authFail());
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("dispatches AUTH_SUCCESS after axios request to register", async () => {
    const username = "TestUser";
    const email = "test@test.com";
    const password1 = "password";
    const password2 = "password";
    const home = 1;
    const data = { key: "testtoken" };
    mock
      .onPost(`${REACT_APP_API_URL}/api/v1/rest-auth/registration/`)
      .replyOnce(200, data);
    await store.dispatch(
      authActions.authRegister(username, email, password1, password2, home)
    );
    const actions = store.getActions();
    expect(actions[0]).toEqual(authActions.authStart());
    expect(actions[1]).toEqual(authActions.authSuccess(data.key));
  });

  it("dispatches AUTH_FAIL if internal server error on authRegister & alerts", async () => {
    spy = jest.spyOn(Alert, "alert");
    const username = "TestUser";
    const email = "test@test.com";
    const password1 = "password";
    const password2 = "password";
    const home = 1;
    const data = {
      "internal server error": "",
      non_field_errors: "",
      home: "This field is required."
    };
    mock
      .onPost(`${REACT_APP_API_URL}/api/v1/rest-auth/registration/`)
      .replyOnce(500, data);
    await store.dispatch(
      authActions.authRegister(username, email, password1, password2, home)
    );
    const actions = store.getActions();
    expect(actions[0]).toEqual(authActions.authStart());
    expect(actions[1]).toEqual(authActions.authFail());
    expect(spy).toHaveBeenCalledTimes(1);
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
