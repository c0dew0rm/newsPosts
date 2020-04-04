import PostService from '../services/PostService';
import Util from '../utils/Utils';

const util = new Util();

class PostController {
  static async getAllPosts(req, res) {
    try {
      const allPosts = await PostService.getAllPosts();
      if (allPosts.length > 0) {
        util.setSuccess(200, 'Posts retrieved', allPosts);
      } else {
        util.setSuccess(200, 'No Posts found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addPost(req, res) {
    if (!req.body.title || !req.body.description) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newPost = req.body;
    try {
      const createdPost = await PostService.addPost(newPost);
      util.setSuccess(201, 'Post Added!', createdPost);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedPost(req, res) {
    const alteredPost = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updatePost = await PostService.updatePost(id, alteredPost);
      if (!updatePost) {
        util.setError(404, `Cannot find posts with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Posts updated', updatePost);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAPost(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const thePost = await PostService.getAPost(id);

      if (!thePost) {
        util.setError(404, `Cannot find post with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Post', thePost);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deletePost(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const postToDelete = await PostService.deletePost(id);

      if (postToDelete) {
        util.setSuccess(200, 'Post deleted');
      } else {
        util.setError(404, `Post with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default PostController;