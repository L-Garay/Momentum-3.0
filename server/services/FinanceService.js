import axios from 'axios';
import ErrorResponse from '../utils/ErrorResponse';

class FinanceService {
  async getFinanceNews() {
    try {
      return await axios({
        method: 'GET',
        url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news',
        headers: {
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
          'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
        },
      });
    } catch (error) {
      throw new ErrorResponse(
        `Unable to get finance news. ${error}`,
        error.response.status
      );
    }
  }
  async getFinanceWinners() {
    try {
      return await axios({
        method: 'GET',
        url:
          'https://yahoo-finance15.p.rapidapi.com/api/yahoo/co/collections/day_gainers',
        params: { start: '0' },
        headers: {
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
          'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
        },
      });
    } catch (error) {
      throw new ErrorResponse(
        `Unable to get finance winners. ${error}`,
        error.response.status
      );
    }
  }
  async getFinanceLosers() {
    try {
      return await axios({
        method: 'GET',
        url:
          'https://yahoo-finance15.p.rapidapi.com/api/yahoo/co/collections/day_losers',
        params: { start: '0' },
        headers: {
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
          'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
        },
      });
    } catch (error) {
      throw new ErrorResponse(
        `Unable to get finance losers. ${error}`,
        error.response.status
      );
    }
  }
}

export const financeService = new FinanceService();
