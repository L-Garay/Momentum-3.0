import axios from 'axios';
import ErrorResponse from '../utils/ErrorResponse';

class ClockService {
  async getTime(city) {
    console.log(city);
    try {
      return await axios({
        method: 'GET',
        url: `https://dev.virtualearth.net/REST/v1/TimeZone/?query=${city}&key=${process.env.BING_MAPS_KEY}`,
      });
    } catch (error) {
      throw new ErrorResponse(
        `Unable to get location time for ${city}. ${error}`,
        error.response.status
      );
    }
  }
}

export const clockService = new ClockService();
