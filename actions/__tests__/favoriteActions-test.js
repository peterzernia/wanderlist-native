import * as favoriteActions from "../favoriteActions";
import { REACT_APP_API_URL } from "react-native-dotenv";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const response = { title: "Test", content: "Test", favoriters: [1, 2] };

// Async action tests
describe("favorite async actions", () => {
  let store;
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = mockStore({
      tripReports: { results: [], count: null, next: null, previous: null },
      userTripReports: { results: [], count: null, next: null, previous: null }
    });
  });

  afterEach(() => {
    mock.restore();
    store.clearActions();
  });

  it("dispatches TOGGLE_FAVORITE_FULFILLED after axios request", async () => {
    const id = 1;
    const token = "testtoken";
    mock
      .onGet(`${REACT_APP_API_URL}/api/v1/reports/${id}/favorite/`)
      .replyOnce(200, response);
    await store.dispatch(favoriteActions.toggleFavorite(id, token));
    const actions = store.getActions();
    expect(actions[0]).toEqual(
      favoriteActions.toggleFavoriteFulfilled(response)
    );
  });

  it("dispatches TOGGLE_FAVORITE_REJECTED if internal server error", async () => {
    const id = 1;
    const token = "testtoken";
    const data = { "internal server error": "" };
    mock
      .onGet(`${REACT_APP_API_URL}/api/v1/reports/${id}/favorite/`)
      .replyOnce(500, data);
    await store.dispatch(favoriteActions.toggleFavorite(id, token));
    const actions = store.getActions();
    expect(actions[0]).toEqual(favoriteActions.toggleFavoriteRejected());
  });
});

describe("Favorite Action Creators", () => {
  it("should create a TOGGLE_FAVORITE_FULFILLED action", () => {
    const expectedAction = { type: "TOGGLE_FAVORITE_FULFILLED", response };
    expect(favoriteActions.toggleFavoriteFulfilled(response)).toEqual(
      expectedAction
    );
  });
  it("should create a TOGGLE_FAVORITE_REJECTED action", () => {
    const expectedAction = { type: "TOGGLE_FAVORITE_REJECTED" };
    expect(favoriteActions.toggleFavoriteRejected()).toEqual(expectedAction);
  });
});
