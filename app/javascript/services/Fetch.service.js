import axios from 'axios';

class FetchService {
  isofetch(config) {
    return axios({
      method: config.method || 'get',
      url: config.url,
      data: config.data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response)
    .catch((error) => error.response.data);
  }

  /**
   * This request could be initiated on client or server side, so a check must be done so
   * we can know whether to use the Docker local instance (server side request) or the
   * public facing request (client side)
   * @config url
   * @config params
   * @config data
   * @config method
   * @config ssr
   */
  isofetchAuthed(config) {
    return axios({
      method: config.method || 'get',
      url: config.ssr ? '' : config.url,
      data: config.data,
      params: config.params,
      headers: {
        Accept: 'application/json',
        'Content-Type': config.contentType || 'application/json',
        Authorization: localStorage.getItem('token')
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.data.error) {
        localStorage.removeItem('user');
        window.location.href = '/';
      }
      return error.response.data
    });
  }
}

export default new FetchService();
