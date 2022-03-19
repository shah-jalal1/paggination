import { render, screen } from "@testing-library/react";
import Details from "../Details";
import { createMemoryHistory } from 'history';
import { Router } from "react-router-dom";

describe("test react router", () => {

    test('Details component testing find detailsPage', () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <Details />
            </Router>
        );
        const detailsPage = screen.getByTestId('detailsPage');
        expect(detailsPage).toBeInTheDocument();
    });

    test('find text', () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <Details />
            </Router>
        );
        const text = screen.getByTestId('detailsPage-text');
        expect(text).toBeInTheDocument();
        // expect(text).toHaveTextContent("Details JSON");
    });

});