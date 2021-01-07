import axios from 'axios';
import ErrorResponse from '../utils/ErrorResponse';

class SportsService {
  async getSportsNews() {
    try {
      return await axios({
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news',
        params: { safeSearch: 'Off', category: 'sports', textFormat: 'Raw' },
        headers: {
          'x-bingapis-sdk': 'true',
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
          'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        },
      });
    } catch (error) {
      throw new ErrorResponse(
        `Cant get sports stories.  ${error}`,
        error.response.status
      );
    }
  }
  async getSportsNewsOffset() {
    try {
      return await axios({
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news',
        params: {
          offset: 12,
          safeSearch: 'Off',
          category: 'sports',
          textFormat: 'Raw',
        },
        headers: {
          'x-bingapis-sdk': 'true',
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
          'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        },
      });
    } catch (error) {
      throw new ErrorResponse(
        `Cant get offset sports stories.  ${error}`,
        error.response.status
      );
    }
  }
}

export const sportsService = new SportsService();
