import global, { initialState } from "../global";

const globalState = { test: "Test" };

describe("global reducer", () => {
  it("has default reducer state", () => {
    expect(global(undefined, { type: "unexpected" })).toEqual({
      ...initialState
    });
  });
  it("can handle SET_STATE", () => {
    expect(
      global(undefined, { type: "SET_STATE", globalState: globalState })
    ).toEqual({
      ...initialState,
      globalState: globalState
    });
  });
});
