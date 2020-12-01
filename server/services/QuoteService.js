import { dbContext } from '../config/DBContext';
import ErrorResponse from '../utils/ErrorResponse';
import axios from 'axios';

class QuoteService {
  async getQuote() {
    let data = await axios({
      method: 'GET',
      url: 'https://quotable-quotes.p.rapidapi.com/randomQuotes',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'quotable-quotes.p.rapidapi.com',
        'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
      },
    });
    if (!data) {
      throw new ErrorResponse('Unable to get quote', 400);
    }
    return data;
  }
  async saveQuote(quote) {
    return await dbContext.Quote.create(quote);
  }
  async getQuotesByUserId(id) {
    let data = await dbContext.Quote.find({ userId: id });
    if (!data) {
      throw new ErrorResponse('Unable to find quote with that userId', 400);
    }
    return data;
  }
  async deleteQuote(id) {
    let data = await dbContext.Quote.findByIdAndDelete(id);
    if (!data) {
      throw new ErrorResponse('Unable to find that quote by the id', 400);
    }
  }
}

export const quoteService = new QuoteService();
