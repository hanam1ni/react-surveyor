import axios from 'axios';

const mockedAxios: typeof axios = jest.genMockFromModule('axios');

mockedAxios.create = jest.fn(() => mockedAxios);

export default mockedAxios;
