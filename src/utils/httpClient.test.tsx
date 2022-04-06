import axios from 'axios';
import * as httpClient from 'utils/httpClient';

describe('get', () => {
  it('requests to the given url', () => {
    httpClient.get('/me');

    expect(axios.get).toHaveBeenCalledWith('/me', {});
  });
});

describe('post', () => {
  it('requests to the given url and body', () => {
    httpClient.post('/login', {
      email: 'user@mail.com',
      password: 'password123',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/login',
      {
        email: 'user@mail.com',
        password: 'password123',
      },
      {}
    );
  });
});
