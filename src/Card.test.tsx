import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import {Card} from "./Card";

let container:any = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders card with a title and data", () => {
    act(() => {
        render(<Card data={1234} title='New confirmed'/>, container);
    });
    expect(container.textContent).toBe("New confirmed1234");
});