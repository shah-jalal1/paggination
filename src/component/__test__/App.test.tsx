import { render, screen } from "@testing-library/react"
import App from "../../App"
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";


describe("test react router", () => {

    test('home page find text', () => {
        render(<App />);
        const app = screen.getByTestId('app');
        expect(app).toBeInTheDocument();
    });

    test("redirects to details page", () => {
        const history = createMemoryHistory({ initialEntries: ["/details/2"] });
        render(
            <Router history={history}>
                <App />
            </Router>
        );
        expect(history.location.pathname).toBe("/details/2");
    });
});