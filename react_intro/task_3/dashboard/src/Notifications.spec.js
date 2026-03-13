import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from './Notifications'; 

describe('Notifications component', () => {

    test('Test 1: Verify notification title exists (case insensitive)', () => {
        render(<Notifications />); 
        const titleElement = screen.getByText(/Here is the list of notifications/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('Test 2: Verify close button exists', () => {
        render(<Notifications />); 
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
    });

    test('Test 3: Verify three list items are rendered', () => {
        render(<Notifications />); 
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(3);
    });

    test('Test 4: Verify clicking close button logs message to console', () => {
        const consoleSpy = jest.spyOn(console, 'log');

        render(<Notifications />); 
        const closeButton = screen.getByRole('button');
        fireEvent.click(closeButton);

        expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');

        consoleSpy.mockRestore();
    });
});