import * as functions from "../Functions";
import { Share } from "react-native";

describe("handleShare tests", () => {
  it("shares", async () => {
    spy = jest.spyOn(Share, "share");
    await functions.handleShare("ThyN5Mk3");
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
