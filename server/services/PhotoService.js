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
      throw new ErrorResponse(`Unable to get a photo. ${error}`, error.status);
    }
  }
  async getAllPhotos() {
    try {
      return await dbContext.Photo.find((p) => (p = {}));
    } catch (error) {
      throw new ErrorResponse(
        `Cant find photos. Error: ${error}`,
        error.status
      );
    }
  }
  async getPhotoById(id) {
    try {
      return await dbContext.Photo.findById(id);
    } catch (error) {
      throw new ErrorResponse(
        `Cant find photo with that id ${id}. Error: ${error}`,
        error.status
      );
    }
  }
  async getPhotosByUserId(id) {
    try {
      return await dbContext.Photo.find({ userId: id });
    } catch (error) {
      throw new ErrorResponse(
        `Cant find photos with that id ${id} Error: ${error}`,
        error.status
      );
    }
  }
  async savePhoto(combo) {
    try {
      await unsplash.photos.downloadPhoto(combo.original);
      return await dbContext.Photo.create(combo.updated);
    } catch (error) {
      throw new ErrorResponse(
        `Cant find save that photo with id ${combo._id} Error: ${error}`,
        error.status
      );
    }
  }
  async deletePhoto(id) {
    try {
      let data = await dbContext.Photo.findByIdAndDelete(id);
    } catch (error) {
      throw new ErrorResponse(
        `Cant find photo with that id. Error: ${error}`,
        error.status
      );
    }
  }
}

export const photoService = new PhotoService();
