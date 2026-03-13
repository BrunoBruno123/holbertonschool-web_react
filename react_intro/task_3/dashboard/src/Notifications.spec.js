import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from './Notifications';

describe('Notifications', () => {

    test('renders the title', () => {
        render(<Notifications />);
        const titleElement = screen.getByText(/here is the list of notifications/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('renders a button', () => {
        render(<Notifications />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
    });

    test('renders 3 list items', () => {
        render(<Notifications />);
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(3);
    });

    test('clicking close button logs to console', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        render(<Notifications />);
        const closeButton = screen.getByRole('button');
        fireEvent.click(closeButton);
        expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
        consoleSpy.mockRestore();
    });

});