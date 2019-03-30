import * as tripReportActions from "../tripReportActions";
import { REACT_APP_API_URL } from "react-native-dotenv";
import { Alert } from "react-native";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const tripReports = { results: [{ title: "TestTripReport" }] };
const response = tripReports;

// Async action tests
describe("country async actions", () => {
  let store;
  let mock;
  let spy;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = mockStore({
      fetchingTripReports: false,
      fetchingNextTripReports: false,
      fetchingUserTripReports: false,
      fetchingNextUserTripReports: false,
      fetchingNextUserTripReports: false,
      tripReports: { results: [], count: null, next: null, previous: null },
      userTripReports: { results: [], count: null, next: null, previous: null }
    });
  });

  afterEach(() => {
    mock.restore();
    store.clearActions();
    jest.restoreAllMocks();
  });

  /**
   * Trip Reports shown on FeedScreen.
   */
  it("dispatches FETCH_TRIP_REPORTS_PENDING after axios request", async () => {
    const url = `${REACT_APP_API_URL}/api/v1/reports/?ordering=-pk`;
    mock.onGet(url).replyOnce(200, tripReports);
    await store.dispatch(tripReportActions.fetchTripReports(url));
    const actions = store.getActions();
    expect(actions[0]).toEqual(tripReportActions.fetchTripReportsPending());
    expect(actions[1]).toEqual(
      tripReportActions.fetchTripReportsFulfilled(tripReports)
    );
  });

  it("dispatches FETCH_TRIP_REPORTS_REJECTED if internal server error & alerts", async () => {
    spy = jest.spyOn(Alert, "alert");
    const url = `${REACT_APP_API_URL}/api/v1/reports/?ordering=-pk`;
    const data = { "internal server error": "" };
    mock.onGet(url).replyOnce(500, data);
    await store.dispatch(tripReportActions.fetchTripReports(url));
    const actions = store.getActions();
    expect(actions[0]).toEqual(tripReportActions.fetchTripReportsPending());
    expect(actions[1]).toEqual(tripReportActions.fetchTripReportsRejected());
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("dispatches FETCH_NEXT_TRIP_REPORTS_PENDING after axios request", async () => {
    const url = `${REACT_APP_API_URL}/api/v1/reports/?ordering=pk&page=2`;
    mock.onGet(url).replyOnce(200, tripReports);
    await store.dispatch(tripReportActions.fetchNextTripReports(url));
    const actions = store.getActions();
    expect(actions[0]).toEqual(tripReportActions.fetchNextTripReportsPending());
    expect(actions[1]).toEqual(
      tripReportActions.fetchNextTripReportsFulfilled(tripReports)
    );
  });

  it("dispatches FETCH_NEXT_TRIP_REPORTS_REJECTED if internal server error & alerts", async () => {
    spy = jest.spyOn(Alert, "alert");
    const url = `${REACT_APP_API_URL}/api/v1/reports/?ordering=pk&page=2`;
    const data = { "internal server error": "" };
    mock.onGet(url).replyOnce(500, data);
    await store.dispatch(tripReportActions.fetchNextTripReports(url));
    const actions = store.getActions();
    expect(actions[0]).toEqual(tripReportActions.fetchNextTripReportsPending());
    expect(actions[1]).toEqual(
      tripReportActions.fetchNextTripReportsRejected()
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });

  /**
   * User Trip Reports shown on ProfileScreen.
   */
  it("dispatches FETCH_USER_TRIP_REPORTS_PENDING after axios request", async () => {
    const username = "TestUser";
    mock
      .onGet(
        `${REACT_APP_API_URL}/api/v1/reports/?ordering=-pk&search=${username}`
      )
      .replyOnce(200, tripReports);
    await store.dispatch(tripReportActions.fetchUserTripReports(username));
    const actions = store.getActions();
    expect(actions[0]).toEqual(tripReportActions.fetchUserTripReportsPending());
    expect(actions[1]).toEqual(
      tripReportActions.fetchUserTripReportsFulfilled(tripReports)
    );
  });

  it("dispatches FETCH_USER_TRIP_REPORTS_REJECTED if internal server error & alerts", async () => {
    spy = jest.spyOn(Alert, "alert");
    const username = "TestUser";
    const data = { "internal server error": "" };
    mock
      .onGet(
        `${REACT_APP_API_URL}/api/v1/reports/?ordering=-pk&search=${username}`
      )
      .replyOnce(500, data);
    await store.dispatch(tripReportActions.fetchUserTripReports(username));
    const actions = store.getActions();
    expect(actions[0]).toEqual(tripReportActions.fetchUserTripReportsPending());
    expect(actions[1]).toEqual(
      tripReportActions.fetchUserTripReportsRejected()
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("dispatches FETCH_NEXT_USER_TRIP_REPORTS_PENDING after axios request", async () => {
    const username = "TestUser";
    const url = `${REACT_APP_API_URL}/api/v1/reports/?ordering=-pk&page=2&search=${username}`;
    mock.onGet(url).replyOnce(200, tripReports);
    await store.dispatch(tripReportActions.fetchNextUserTripReports(url));
    const actions = store.getActions();
    expect(actions[0]).toEqual(
      tripReportActions.fetchNextUserTripReportsPending()
    );
    expect(actions[1]).toEqual(
      tripReportActions.fetchNextUserTripReportsFulfilled(tripReports)
    );
  });

  it("dispatches FETCH_NEXT_USER_TRIP_REPORTS_REJECTED if internal server error & alerts", async () => {
    spy = jest.spyOn(Alert, "alert");
    const username = "TestUser";
    const url = `${REACT_APP_API_URL}/api/v1/reports/?ordering=-pk&page=2&search=${username}`;
    const data = { "internal server error": "" };
    mock.onGet(url).replyOnce(500, data);
    await store.dispatch(tripReportActions.fetchNextUserTripReports(url));
    const actions = store.getActions();
    expect(actions[0]).toEqual(
      tripReportActions.fetchNextUserTripReportsPending()
    );
    expect(actions[1]).toEqual(
      tripReportActions.fetchNextUserTripReportsRejected()
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("dispatches POST_TRIP_REPORT_FULFILLED after axios request & alerts", async () => {
    const token = "testtoken";
    const author = 1;
    const title = "TestTtile";
    const content = "TestContent";
    const countries = [1, 2];
    const tripReport = { title, content, countries, author };
    mock
      .onPost(`${REACT_APP_API_URL}/api/v1/reports/`)
      .replyOnce(200, tripReport);
    await store.dispatch(
      tripReportActions.postTripReport(token, author, title, content, countries)
    );
    const actions = store.getActions();
    expect(actions[0]).toEqual(
      tripReportActions.postTripReportFulfilled(tripReport)
    );
  });

  /**
   * There is currently no POST_TRIP_REPORT_REJECTED action.
   */
  it("alerts if internal server error on postTripReport", async () => {
    spy = jest.spyOn(Alert, "alert");
    const token = "testtoken";
    const author = 1;
    const title = "TestTtile";
    const content = "TestContent";
    const countries = [1, 2];
    const tripReport = { title, content, countries, author };
    const data = { "internal server error": "" };
    mock.onPost(`${REACT_APP_API_URL}/api/v1/reports/`).replyOnce(500, data);
    await store.dispatch(
      tripReportActions.postTripReport(token, author, title, content, countries)
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("dispatches DELETE_TRIP_REPORT_FULFILLED after axios request & alerts", async () => {
    const token = "testtoken";
    const tripReport = { id: 1, title: "Test", content: "Test" };
    mock
      .onDelete(`${REACT_APP_API_URL}/api/v1/reports/${tripReport.id}/`)
      .replyOnce(200, tripReport);
    await store.dispatch(tripReportActions.deleteTripReport(token, tripReport));
    const actions = store.getActions();
    expect(actions[0]).toEqual(
      tripReportActions.deleteTripReportFulfilled(tripReport)
    );
  });

  /**
   * There is currently no DELETE_TRIP_REPORT_REJECTED action.
   */
  it("alerts if internal server error on postTripReport", async () => {
    spy = jest.spyOn(Alert, "alert");
    const token = "testtoken";
    const tripReport = { id: 1, title: "Test", content: "Test" };
    const data = { "internal server error": "" };
    mock
      .onDelete(`${REACT_APP_API_URL}/api/v1/reports/${tripReport.id}/`)
      .replyOnce(500, data);
    await store.dispatch(tripReportActions.deleteTripReport(token, tripReport));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("Trip Report Action Creators", () => {
  it("should create a FETCH_TRIP_REPORTS_PENDING action", () => {
    const expectedAction = { type: "FETCH_TRIP_REPORTS_PENDING" };
    expect(tripReportActions.fetchTripReportsPending()).toEqual(expectedAction);
  });
  it("should create a FETCH_TRIP_REPORTS_FULFILLED action", () => {
    const expectedAction = {
      type: "FETCH_TRIP_REPORTS_FULFILLED",
      tripReports
    };
    expect(tripReportActions.fetchTripReportsFulfilled(tripReports)).toEqual(
      expectedAction
    );
  });
  it("should create a FETCH_TRIP_REPORTS_REJECTED action", () => {
    const expectedAction = { type: "FETCH_TRIP_REPORTS_REJECTED" };
    expect(tripReportActions.fetchTripReportsRejected()).toEqual(
      expectedAction
    );
  });

  it("should create a FETCH_NEXT_TRIP_REPORTS_PENDING action", () => {
    const expectedAction = { type: "FETCH_NEXT_TRIP_REPORTS_PENDING" };
    expect(tripReportActions.fetchNextTripReportsPending()).toEqual(
      expectedAction
    );
  });
  it("should create a FETCH_NEXT_TRIP_REPORTS_FULFILLED action", () => {
    const expectedAction = {
      type: "FETCH_NEXT_TRIP_REPORTS_FULFILLED",
      tripReports
    };
    expect(
      tripReportActions.fetchNextTripReportsFulfilled(tripReports)
    ).toEqual(expectedAction);
  });
  it("should create a FETCH_NEXT_TRIP_REPORTS_REJECTED action", () => {
    const expectedAction = { type: "FETCH_NEXT_TRIP_REPORTS_REJECTED" };
    expect(tripReportActions.fetchNextTripReportsRejected()).toEqual(
      expectedAction
    );
  });

  it("should create a FETCH_USER_TRIP_REPORTS_PENDING action", () => {
    const expectedAction = { type: "FETCH_USER_TRIP_REPORTS_PENDING" };
    expect(tripReportActions.fetchUserTripReportsPending()).toEqual(
      expectedAction
    );
  });
  it("should create a FETCH_USER_TRIP_REPORTS_FULFILLED action", () => {
    const expectedAction = {
      type: "FETCH_USER_TRIP_REPORTS_FULFILLED",
      tripReports
    };
    expect(
      tripReportActions.fetchUserTripReportsFulfilled(tripReports)
    ).toEqual(expectedAction);
  });
  it("should create a FETCH_USER_TRIP_REPORTS_REJECTED action", () => {
    const expectedAction = { type: "FETCH_USER_TRIP_REPORTS_REJECTED" };
    expect(tripReportActions.fetchUserTripReportsRejected()).toEqual(
      expectedAction
    );
  });

  it("should create a FETCH_NEXT_USER_TRIP_REPORTS_PENDING action", () => {
    const expectedAction = { type: "FETCH_NEXT_USER_TRIP_REPORTS_PENDING" };
    expect(tripReportActions.fetchNextUserTripReportsPending()).toEqual(
      expectedAction
    );
  });
  it("should create a FETCH_NEXT_USER_TRIP_REPORTS_FULFILLED action", () => {
    const expectedAction = {
      type: "FETCH_NEXT_USER_TRIP_REPORTS_FULFILLED",
      tripReports
    };
    expect(
      tripReportActions.fetchNextUserTripReportsFulfilled(tripReports)
    ).toEqual(expectedAction);
  });
  it("should create a FETCH_NEXT_USER_TRIP_REPORTS_REJECTED action", () => {
    const expectedAction = { type: "FETCH_NEXT_USER_TRIP_REPORTS_REJECTED" };
    expect(tripReportActions.fetchNextUserTripReportsRejected()).toEqual(
      expectedAction
    );
  });

  it("should create a FETCH_NEXT_TRIP_REPORTS_PENDING action", () => {
    const expectedAction = { type: "FETCH_NEXT_TRIP_REPORTS_PENDING" };
    expect(tripReportActions.fetchNextTripReportsPending()).toEqual(
      expectedAction
    );
  });
  it("should create a FETCH_NEXT_TRIP_REPORTS_FULFILLED action", () => {
    const expectedAction = {
      type: "FETCH_NEXT_TRIP_REPORTS_FULFILLED",
      tripReports
    };
    expect(
      tripReportActions.fetchNextTripReportsFulfilled(tripReports)
    ).toEqual(expectedAction);
  });
  it("should create a FETCH_NEXT_TRIP_REPORTS_REJECTED action", () => {
    const expectedAction = { type: "FETCH_NEXT_TRIP_REPORTS_REJECTED" };
    expect(tripReportActions.fetchNextTripReportsRejected()).toEqual(
      expectedAction
    );
  });
  it("should create a POST_TRIP_REPORT_FULFILLED action", () => {
    const expectedAction = {
      type: "POST_TRIP_REPORT_FULFILLED",
      response
    };
    expect(tripReportActions.postTripReportFulfilled(response)).toEqual(
      expectedAction
    );
  });
  it("should create a DELETE_TRIP_REPORT_FULFILLED action", () => {
    const expectedAction = {
      type: "DELETE_TRIP_REPORT_FULFILLED",
      response
    };
    expect(tripReportActions.deleteTripReportFulfilled(response)).toEqual(
      expectedAction
    );
  });
  it("should create a UPDATE_TRIP_REPORT_FULFILLED action", () => {
    const expectedAction = {
      type: "UPDATE_TRIP_REPORT_FULFILLED",
      response
    };
    expect(tripReportActions.updateTripReportFulfilled(response)).toEqual(
      expectedAction
    );
  });
});
