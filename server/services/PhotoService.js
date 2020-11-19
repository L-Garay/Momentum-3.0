import { dbContext } from '../config/DBContext';
import ErrorResponse from '../utils/ErrorResponse';
import fetch from 'node-fetch';
import Unsplash from 'unsplash-js';

// @ts-ignore
global.fetch = fetch;

let unsplashKey = process.env.UNSPLASH_API_KEY;

const unsplash = new Unsplash({
  accessKey: unsplashKey,
});

class PhotoService {
  async getPhoto() {
    try {
      let data = await unsplash.photos.getRandomPhoto({
        query: 'nature',
      });
      let formatted = await data.json();
      return formatted;
    } catch (error) {
      throw new ErrorResponse(error, 500);
    }
  }
  async getAllPhotos() {
    return await dbContext.Photo.find((p) => (p = {}));
  }
  async getPhotoById(id) {
    let data = await dbContext.Photo.findById(id);
    if (!data) {
      throw new ErrorResponse('Unable to find photo with that id', 400);
    }
    return data;
  }
  async getPhotosByUserId(id) {
    let data = await dbContext.Photo.findById({ userId: id });
    if (!data) {
      throw new ErrorResponse('Unable to find photos with that userId', 400);
    }
    return data;
  }
  async savePhoto(combo) {
    await unsplash.photos.downloadPhoto(combo.original);
    return await dbContext.Photo.create(combo.updated);
  }
  async deletePhoto(id) {
    let data = await dbContext.Photo.findByIdAndDelete(id);
    if (!data) {
      throw new ErrorResponse('Unable to find photo with that id', 400);
    }
  }
}

export const photoService = new PhotoService();
