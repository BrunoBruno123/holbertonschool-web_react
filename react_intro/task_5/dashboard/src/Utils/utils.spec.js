import { getCurrentYear, getFooterCopy, getLatestNotification } from './utils';

describe('Utility functions', () => {

    describe('getCurrentYear', () => {
        it('should return the current year', () => {
            const currentYear = new Date().getFullYear();
            expect(getCurrentYear()).toBe(currentYear);
        });
    });


    describe('getFooterCopy', () => {
        it('should return "Holberton School" when isIndex is true', () => {
            const result = getFooterCopy(true);
            expect(result).toBe('Holberton School');
        });

        it('should return "Holberton School main dashboard" when isIndex is false', () => {
            const result = getFooterCopy(false);
            expect(result).toBe('Holberton School main dashboard');
        });
    });

    describe('getLatestNotification', () => {
        it('should return the correct notification string with HTML tags', () => {
            const result = getLatestNotification();
            expect(result).toBe('<strong>Urgent requirement</strong> - complete by EOD');
        });
    });
});