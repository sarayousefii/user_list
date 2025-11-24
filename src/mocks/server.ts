import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Iperson } from '../AppTypes';

const users: Iperson[] = [
  { id: 1, firstName: 'Sara', lastName: 'Yousefi', date: new Date(), image: '' },
  { id: 2, firstName: 'Ali', lastName: 'Ahmadi', date: new Date(), image: '' },
];

export const server = setupServer(
  rest.get('/api/users', (req: any, res: (arg0: any, arg1: any) => any, ctx: { status: (arg0: number) => any; json: (arg0: Iperson[]) => any; }) => {
    return res(ctx.status(200), ctx.json(users));
  })
);
