import { rest } from 'msw';

export const handlers = [
    rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.json([
            { id: 1, name: 'Samet Mavzer' }
        ]));
    }),
    rest.post('/api/users', (req, res, ctx) => {
        return res(ctx.json({ id: 8, name: 'Hatice Cengiz' }));
    }),
    rest.delete('/api/users/:id', (req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.post('/api/auth', (req, res, ctx) => {
        return res(ctx.json([{
            id: 9, username: 'Hasan'
        }]))
    })
];