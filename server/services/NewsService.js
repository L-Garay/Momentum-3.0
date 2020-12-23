import axios from 'axios';
import ErrorResponse from '../utils/ErrorResponse';

class NewsService {
  async getNews() {
    try {
      return await axios({
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news/trendingtopics',
        params: { textFormat: 'Raw', safeSearch: 'Off', count: 40 },
        headers: {
          'x-bingapis-sdk': 'true',
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
          'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        },
      });
    } catch (error) {
      throw new ErrorResponse(
        `Cant get news stories.  ${error}`,
        error.response.status
      );
    }
  }
  async getNewNews(query) {
    try {
      return await axios({
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news/search',
        params: {
          q: query.query,
          freshness: 'Month',
          textFormat: 'Raw',
          safeSearch: 'Off',
          count: 40,
        },
        headers: {
          'x-bingapis-sdk': 'true',
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
          'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        },
      });
    } catch (error) {
      throw new ErrorResponse(
        `Cant get news for that query, '${query}'. ${error}`,
        error.response.status
      );
    }
  }
}

export const newsService = new NewsService();
