import React from "react";
import renderer from "react-test-renderer";

import HomeScreen from "../../screens/HomeScreen";

describe("<HomeScreen />", () => {
  it.skip("has children", () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree.children.length).toBeGreaterThan(0);
  });
});
