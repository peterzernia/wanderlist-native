import global from "../global";

const defaultState = {
  globalState: {}
};

const globalState = { test: "Test" };

describe("global reducer", () => {
  it("has default reducer state", () => {
    expect(global(undefined, { type: "unexpected" })).toEqual({
      ...defaultState
    });
  });
  it("can handle SET_STATE", () => {
    expect(
      global(undefined, { type: "SET_STATE", globalState: globalState })
    ).toEqual({
      ...defaultState,
      globalState: globalState
    });
  });
});
