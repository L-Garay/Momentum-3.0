import { dbContext } from '../config/DBContext';
import ErrorResponse from '../utils/ErrorResponse';
import axios from 'axios';

class QuoteService {
  async getQuote() {
    try {
      let data = await axios({
        method: 'GET',
        url: 'https://quotable-quotes.p.rapidapi.com/randomQuotes',
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'quotable-quotes.p.rapidapi.com',
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
        },
      });
      return data;
    } catch (error) {
      throw new ErrorResponse(
        `Cant get a quote.  ${error}`,
        error.response.status
      );
    }
  }
  async getQuotesByUserId(id) {
    try {
      return await dbContext.Quote.find({ userId: id });
    } catch (error) {
      throw new ErrorResponse(
        `Cant find quotes with userId ${id}.  ${error}`,
        error.response.status
      );
    }
  }
  async getQuoteById(id) {
    try {
      return await dbContext.Quote.findById(id);
    } catch (error) {
      throw new ErrorResponse(
        `Cant find quote with that id ${id}.  ${error}`,
        error.response.status
      );
    }
  }
  async saveQuote(quote) {
    try {
      return await dbContext.Quote.create(quote);
    } catch (error) {
      throw new ErrorResponse(
        `Cant save that quote.  ${error}`,
        error.response.status
      );
    }
  }
  async deleteQuote(id) {
    try {
      return await dbContext.Quote.findByIdAndDelete(id);
    } catch (error) {
      throw new ErrorResponse(
        `Unable to delete quote with that id ${id}.  ${error}`,
        error.response.status
      );
    }
  }
}

export const quoteService = new QuoteService();
