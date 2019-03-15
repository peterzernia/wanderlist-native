import * as tripReportActions from "../tripReportActions";

const tripReports = { results: [{ title: "TestTripReport" }] };
const response = tripReports;

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
