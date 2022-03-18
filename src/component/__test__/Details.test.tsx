import { render, screen } from "@testing-library/react";
import Details from "../Details";
import { createMemoryHistory } from 'history';
import { Router } from "react-router-dom";

describe("test react router", () => {

    test('Details component testing', () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <Details />
            </Router>
        );
        const text = screen.getByTestId('details');
        expect(text).toBeInTheDocument();
    });
});