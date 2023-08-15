import { render, screen, waitFor } from '@testing-library/react';
import { LoginForm } from '../src/app/login/page';
import userEvent from '@testing-library/user-event';
import { server } from '../mocks/server';
import { rest } from 'msw';


const mockRouter = jest.fn()

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockRouter,
    }),
}));


describe('LoginForm', () => {
    it('should enter username and password and click on login button', async () => {
        render(<LoginForm />);
        const loginButton = screen.getByRole('button', { name: 'Giriş' });
        expect(loginButton).toBeDisabled();
        await userEvent.type(screen.getByLabelText(/Kullanıcı Adı/), 'Hasan');
        await userEvent.type(screen.getByLabelText(/Şifre/), 'password');
        expect(loginButton).toBeEnabled();
        await userEvent.click(loginButton);
        await waitFor(() => {
            expect(mockRouter).toHaveBeenCalledWith('/');
        });

    });

    it('should login user and display error message', async () => {
        server.use(
            rest.post('/api/auth', (req, res, ctx) => {
                return res(ctx.status(400));
            })
        );
        render(<LoginForm />);
        const loginButton = screen.getByRole('button', { name: 'Giriş' });
        expect(loginButton).toBeDisabled();
        await userEvent.type(screen.getByLabelText(/Kullanıcı Adı/), 'Hasan');
        await userEvent.type(screen.getByLabelText(/Şifre/), 'password');
        expect(loginButton).toBeEnabled();
        await userEvent.click(loginButton);
        await waitFor(() => {
            expect(screen.getByText('Error Logging In')).toBeInTheDocument();
        });
    });
});