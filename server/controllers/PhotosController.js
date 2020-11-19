import BaseController from '../utils/BaseController';
import { photoService } from '../services/PhotoService';

export class PhotosController extends BaseController {
  constructor() {
    super('api/photos');
    this.router
      .get('', this.getPhoto)
      .get('/all', this.getAllPhotos)
      .get('/:id', this.getPhotoById)
      .post('', this.savePhoto)
      .delete('/:id', this.deletePhoto);
  }
  async getPhoto(req, res, next) {
    try {
      let data = await photoService.getPhoto();
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async getAllPhotos(req, res, next) {
    try {
      let data = await photoService.getAllPhotos();
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async getPhotoById(req, res, next) {
    try {
      let data = await photoService.getPhotoById(req.params.id);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async savePhoto(req, res, next) {
    try {
      let data = await photoService.savePhoto(req.body);
      return res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  }
  async deletePhoto(req, res, next) {
    try {
      await photoService.deletePhoto(req.params.id);
      return res.send('Successfully deleted');
    } catch (error) {
      next(error);
    }
  }
}
