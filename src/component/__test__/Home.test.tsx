import {screen } from "@testing-library/react";
import { render } from '@testing-library/react';
import Home from "../Home";
import { getPaginationData } from './../api/pagginationData';



describe('Home Component Test', () => {



    test("should render api data", async () => {
        return await getPaginationData(0).then((data) => {
            expect(data).toBeDefined();
        });
    });

    test('render test', () => {
        render(<Home />);
        const findText = screen.getByTestId('home');
        expect(findText).toBeInTheDocument();
    });


})