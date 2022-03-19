import { screen } from "@testing-library/react";
import { render } from '@testing-library/react';
import Home from "../Home";
import { getPaginationData } from '../api/getData';
import { act } from "react-dom/test-utils";



describe('Home Component Test', () => {

    test('find text', () => {
        render(<Home />);
        const findText = screen.getByTestId('home');
        expect(findText).toBeInTheDocument();
    });

    test("load data and test api", async () => {
        return await act(async () => {
            getPaginationData(1).then((data) => {
                expect(data).toBeDefined();
            });
        })
    });



})