import axios from 'axios';
import instance from './axiosInstance';

jest.mock('axios');

describe('Axios Instance Creation', () => {
  test('Axios instance should be created with the correct baseURL', () => {
    const baseURL = 'https://example.com/api';
    process.env.REACT_APP_BASE_URL = baseURL;

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: baseURL,
    });

    jest.clearAllMocks();
  });

  test('Axios instance should export the created instance', () => {
    expect(instance).toBeInstanceOf(Object);
    expect(instance.defaults.baseURL).toBe(process.env.REACT_APP_BASE_URL);
  });
});
