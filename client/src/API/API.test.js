import * as fetchAuth from './auth';
import { cleanup } from '@testing-library/react';

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => Promise.resolve({ status: 'SUCCESS', username: 'should be a username' })
    })
}
);

beforeEach(() => {
    fetch.mockClear();
});

afterEach(cleanup)

describe("AUTH API", () => {
    describe("FETCH LOGGED IN ", () => {

        it("should exist", () => {
            expect(fetchAuth.fetchLoggedInUser).toBeTruthy()
        })
        it('should return a username', async () => {
            const user = await fetchAuth.fetchLoggedInUser('eyJ1c2VybmFtZSI6Im1heG91IiwiX2lkIjoiNWY0MDNlZjJjZmZlZmExNDc3NGRhMTlkIiwiaWF0IjoxNjA0MDgzMjc5LCJleHAiOjE2MDQwODY4Nzl9.WZ96FJ3x3n_GYEWAPOLz1hAH9rmw8vthp9XsBl7KGjU')
            expect(user.username).toBe('should be a username');
        })
        it('should reject if no token', async () => {
            fetch.mockImplementationOnce(() => Promise.reject({ message: "API is down" }));
            const user = await fetchAuth.fetchLoggedInUser();
            expect(user.status).toBe('FAILED')
        })
    })
})