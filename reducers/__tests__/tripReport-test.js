import tripReport from "../tripReport";

const defaultState = {
  fetchingTripReports: false,
  fetchingNextTripReports: false,
  fetchingUserTripReports: false,
  fetchingNextUserTripReports: false,
  fetchingNextUserTripReports: false,
  tripReports: { results: [], count: null, next: null, previous: null },
  userTripReports: { results: [], count: null, next: null, previous: null }
};

const tripReports = {
  results: [{ title: "Test1", id: 1 }, { title: "Test2", id: 2 }],
  count: 2,
  next: null,
  previous: null
};

describe("tripReport Reducer", () => {
  it("has a default state", () => {
    expect(tripReport(undefined, { type: "unexpected" })).toEqual({
      ...defaultState
    });
  });

  it("can handle FETCH_TRIP_REPORTS_PENDING", () => {
    expect(
      tripReport(undefined, { type: "FETCH_TRIP_REPORTS_PENDING" })
    ).toEqual({
      ...defaultState,
      fetchingTripReports: true
    });
  });

  it("can handle FETCH_TRIP_REPORTS_FULFILLED", () => {
    expect(
      tripReport(undefined, {
        type: "FETCH_TRIP_REPORTS_FULFILLED",
        tripReports: tripReports
      })
    ).toEqual({
      ...defaultState,
      fetchingTripReports: false,
      tripReports: tripReports
    });
  });

  it("can handle FETCH_TRIP_REPORTS_REJECTED", () => {
    expect(
      tripReport(undefined, { type: "FETCH_TRIP_REPORTS_REJECTED" })
    ).toEqual({
      ...defaultState,
      fetchingTripReports: false
    });
  });

  it("can handle FETCH_NEXT_TRIP_REPORTS_PENDING", () => {
    expect(
      tripReport(undefined, { type: "FETCH_NEXT_TRIP_REPORTS_PENDING" })
    ).toEqual({
      ...defaultState,
      fetchingNextTripReports: true
    });
  });

  // The next Trip Reports get concatted onto the original results array.
  it("can handle FETCH_NEXT_TRIP_REPORTS_FULFILLED", () => {
    expect(
      tripReport(
        { ...defaultState, tripReports: tripReports },
        {
          type: "FETCH_NEXT_TRIP_REPORTS_FULFILLED",
          tripReports: {
            results: [{ title: "Test3", id: 3 }, { title: "Test4", id: 4 }],
            count: 4,
            next: null,
            previous: null
          }
        }
      )
    ).toEqual({
      ...defaultState,
      fetchingNextTripReports: false,
      tripReports: {
        results: [
          { title: "Test1", id: 1 },
          { title: "Test2", id: 2 },
          { title: "Test3", id: 3 },
          { title: "Test4", id: 4 }
        ],
        count: 4,
        next: null,
        previous: null
      }
    });
  });

  it("can handle FETCH_NEXT_TRIP_REPORTS_REJECTED", () => {
    expect(
      tripReport(undefined, { type: "FETCH_NEXT_TRIP_REPORTS_REJECTED" })
    ).toEqual({
      ...defaultState,
      fetchingNextTripReports: false
    });
  });

  it("can handle FETCH_USER_TRIP_REPORTS_PENDING", () => {
    expect(
      tripReport(undefined, { type: "FETCH_USER_TRIP_REPORTS_PENDING" })
    ).toEqual({
      ...defaultState,
      fetchingUserTripReports: true
    });
  });

  it("can handle FETCH_USER_TRIP_REPORTS_FULFILLED", () => {
    expect(
      tripReport(undefined, {
        type: "FETCH_USER_TRIP_REPORTS_FULFILLED",
        tripReports: tripReports
      })
    ).toEqual({
      ...defaultState,
      fetchingUserTripReports: false,
      userTripReports: tripReports
    });
  });

  it("can handle FETCH_USER_TRIP_REPORTS_REJECTED", () => {
    expect(
      tripReport(undefined, { type: "FETCH_USER_TRIP_REPORTS_REJECTED" })
    ).toEqual({
      ...defaultState,
      fetchingUserTripReports: false
    });
  });

  it("can handle FETCH_NEXT_USER_TRIP_REPORTS_PENDING", () => {
    expect(
      tripReport(undefined, { type: "FETCH_NEXT_USER_TRIP_REPORTS_PENDING" })
    ).toEqual({
      ...defaultState,
      fetchingNextUserTripReports: true
    });
  });

  // The next Trip Reports get concatted onto the original results array.
  it("can handle FETCH_NEXT_USER_TRIP_REPORTS_FULFILLED", () => {
    expect(
      tripReport(
        { ...defaultState, userTripReports: tripReports },
        {
          type: "FETCH_NEXT_USER_TRIP_REPORTS_FULFILLED",
          tripReports: {
            results: [{ title: "Test3", id: 3 }, { title: "Test4", id: 4 }],
            count: 4,
            next: null,
            previous: null
          }
        }
      )
    ).toEqual({
      ...defaultState,
      fetchingNextUserTripReports: false,
      userTripReports: {
        results: [
          { title: "Test1", id: 1 },
          { title: "Test2", id: 2 },
          { title: "Test3", id: 3 },
          { title: "Test4", id: 4 }
        ],
        count: 4,
        next: null,
        previous: null
      }
    });
  });

  it("can handle FETCH_NEXT_USER_TRIP_REPORTS_REJECTED", () => {
    expect(
      tripReport(undefined, { type: "FETCH_NEXT_USER_TRIP_REPORTS_REJECTED" })
    ).toEqual({
      ...defaultState,
      fetchingNextUserTripReports: false
    });
  });

  it("can handle TOGGLE_FAVORITE_FULFILLED", () => {
    const favoritedTripReport = { title: "Test1", id: 1, favoriters: [1] };
    expect(
      tripReport(
        {
          ...defaultState,
          tripReports: tripReports
        },
        {
          type: "TOGGLE_FAVORITE_FULFILLED",
          response: favoritedTripReport
        }
      )
    ).toEqual({
      ...defaultState,
      tripReports: {
        results: [
          { title: "Test1", id: 1, favoriters: [1] },
          { title: "Test2", id: 2 }
        ],
        count: 2,
        next: null,
        previous: null
      }
    });
  });

  it("can handle POST_TRIP_REPORT_FULFILLED", () => {
    // Posted Trip Report gets added to empty array.
    expect(
      tripReport(undefined, {
        type: "POST_TRIP_REPORT_FULFILLED",
        response: { title: "Test1", id: 1 }
      })
    ).toEqual({
      ...defaultState,
      userTripReports: {
        results: [{ title: "Test1", id: 1 }],
        count: null,
        next: null,
        previous: null
      },
      tripReports: {
        results: [{ title: "Test1", id: 1 }],
        count: null,
        next: null,
        previous: null
      }
    });
    // Posted Trip Report gets added to non-empty array.
    expect(
      tripReport(
        {
          ...defaultState,
          userTripReports: tripReports,
          tripReports: tripReports
        },
        {
          type: "POST_TRIP_REPORT_FULFILLED",
          response: { title: "Test3", id: 3 }
        }
      )
    ).toEqual({
      ...defaultState,
      userTripReports: {
        results: [
          { title: "Test1", id: 1 },
          { title: "Test2", id: 2 },
          { title: "Test3", id: 3 }
        ],
        count: 2,
        next: null,
        previous: null
      },
      tripReports: {
        results: [
          { title: "Test1", id: 1 },
          { title: "Test2", id: 2 },
          { title: "Test3", id: 3 }
        ],
        count: 2,
        next: null,
        previous: null
      }
    });
  });

  it("can handle DELETE_TRIP_REPORT_FULFILLED", () => {
    expect(
      tripReport(
        {
          ...defaultState,
          userTripReports: tripReports,
          tripReports: tripReports
        },
        {
          type: "DELETE_TRIP_REPORT_FULFILLED",
          response: { title: "Test1", id: 1 }
        }
      )
    ).toEqual({
      ...defaultState,
      // The deleted trip report is removed from the results array.
      userTripReports: {
        results: [{ title: "Test2", id: 2 }],
        count: 2,
        next: null,
        previous: null
      },
      tripReports: {
        results: [{ title: "Test2", id: 2 }],
        count: 2,
        next: null,
        previous: null
      }
    });
  });

  // it("can handle UPDATE_TRIP_REPORT_FULFILLED", () => {
  //   const updatedTripReport = { title: "Test1 Updated", id: 1 };
  //   expect(
  //     tripReport(
  //       {
  //         ...defaultState,
  //         userTripReports: tripReports,
  //         tripReports: tripReports
  //       },
  //       {
  //         type: "UPDATE_TRIP_REPORT_FULFILLED",
  //         response: updatedTripReport
  //       }
  //     )
  //   ).toEqual({
  //     ...defaultState,
  //     userTripReports: {
  //       results: [{ title: "Test1 Updated", id: 1 }, { title: "Test2", id: 2 }],
  //       count: 2,
  //       next: null,
  //       previous: null
  //     },
  //     tripReports: {
  //       results: [{ title: "Test1 Updated", id: 1 }, { title: "Test2", id: 2 }],
  //       count: 2,
  //       next: null,
  //       previous: null
  //     }
  //   });
  // });

  // it("can handle UPDATE_USER_FULFILLED", () => {
  //   const user = { username: "Test User Updated", pk: 1 };
  //   expect(
  //     tripReport(
  //       {
  //         ...defaultState,
  //         tripReports: {
  //           results: [
  //             {
  //               title: "Test1",
  //               id: 1,
  //               author: { username: "Test User", pk: 1 }
  //             }
  //           ],
  //           count: 1,
  //           next: null,
  //           previous: null
  //         }
  //       },
  //       {
  //         type: "UPDATE_USER_FULLFILLED",
  //         user: user
  //       }
  //     )
  //   ).toEqual({
  //     ...defaultState,
  //     tripReports: {
  //       results: [
  //         {
  //           title: "Test1",
  //           id: 1,
  //           author: { username: "Test User Updated", pk: 1 }
  //         }
  //       ],
  //       count: 1,
  //       next: null,
  //       previous: null
  //     }
  //   });
  // });

  it("can handle AUTH_LOGOUT", () => {
    expect(
      tripReport(
        { ...defaultState, fetchingTripReports: true },
        { type: "AUTH_LOGOUT" }
      )
    ).toEqual({
      ...defaultState,
      fetchingTripReports: false
    });
  });
});
