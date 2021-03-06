import axios from 'axios';
import ErrorResponse from '../utils/ErrorResponse';

class SportsService {
  async getSportsNews(topic) {
    try {
      return await axios({
        method: 'GET',
        url: 'https://bing-news-search1.p.rapidapi.com/news/search',
        params: {
          q: topic,
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
        `Cant get sports news for that topic, '${query}'. ${error}`,
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
  async getPreviousGames(id) {
    console.log('league id', id);
    try {
      return await axios({
        method: 'GET',
        url: `https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=${id}`,
      });
    } catch (error) {
      throw new ErrorResponse(
        `Cant get previous games with that id:${id}.  ${error}`,
        error.response.status
      );
    }
  }
  async getUpcomingGames(id) {
    try {
      return await axios({
        method: 'GET',
        url: `https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=${id}`,
      });
    } catch (error) {
      throw new ErrorResponse(
        `Cant get upcoming games with that id:${id}.  ${error}`,
        error.response.status
      );
    }
  }
}

export const sportsService = new SportsService();
