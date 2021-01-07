import axios from 'axios';
import ErrorResponse from '../utils/ErrorResponse';

class SportsService {
  async getSports(id) {
    try {
      return await axios({
        method: 'GET',
        url: `https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=${id}`,
        // headers: {
        //   'x-bingapis-sdk': 'true',
        //   'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
        //   'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        // },
      });
    } catch (error) {
      throw new ErrorResponse(
        `Cant get sports stories.  ${error}`,
        error.response.status
      );
    }
  }
}

export const sportsService = new SportsService();
