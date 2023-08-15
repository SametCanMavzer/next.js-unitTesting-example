
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Users from '@/components/Users';
import { act } from 'react-dom/test-utils';


describe('Users Component', () => {

    test('displays list of users on mount', async () => {
        render(<Users />);

        await waitFor(() => screen.getByText('Samet Mavzer'));
        expect(screen.getByText('Samet Mavzer')).toBeInTheDocument();
    });

    it('creates new user on form submit', async () => {
        render(<Users />);

        userEvent.type(screen.getByPlaceholderText('Name'), 'Hatice Cengiz');
        userEvent.click(screen.getByText('EKLE'));

        await waitFor(() => screen.getByText('Hatice Cengiz'));
        expect(screen.getByText('Hatice Cengiz')).toBeInTheDocument();
    });

    it('deletes user on button click', async () => {
        render(<Users />);

        await waitFor(() => screen.getByTestId("1"));
        act(() => {
            userEvent.click(screen.getByTestId("1"));
        });

        await waitFor(() => expect(screen.queryByText('Samet Mavzer')).not.toBeInTheDocument());
    });

});