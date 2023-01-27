import axios from "axios";

export default class DataService {
  static async getAll( resourceType = 'news', page = 1) {
    return await axios.get(`https://api.hnpwa.com/v0/${resourceType}/${page}.json`);
  }

  static async getDetails( id) {
    return await axios.get(`https://api.hnpwa.com/v0/item/${id}.json`);
  }
}
