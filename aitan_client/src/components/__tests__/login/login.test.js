import React from "react";
import userEvent from '@testing-library/user-event'
import {render} from '@testing-library/react'
import Login from '../../login/LogIn'
import "@testing-library/jest-dom";


it('runs without crashing', () => {
    render(<Login />);
});

it('can change the value of the dropdown', () => {
    const { getByTestId } = render(<Login />);

    const dropdown = getByTestId('select');

    const display = dropdown.children[0];

    expect(display.textContent).toBe(options[0].text);

    console.log(display.textContent);

    fireEvent.click(dropdown);

    const dropdownOptions = getAllByRole(dropdown, 'option');

    fireEvent.click(dropdownOptions[2]);

    expect(display.textContent).toBe(options[2].text);

    console.log(display.textContent);
});