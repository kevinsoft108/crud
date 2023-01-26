import axios from 'axios';

class FetchService {
  isofetch(
    url,
    data,
    type,
  ) {
    return axios({
      method: type,
      url: url,
      data: data,
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
   * @param url
   * @param data
   * @param type
   * @param ssr
   */
  isofetchAuthed(
    url,
    data,
    type,
    contentType = 'application/json',
    ssr = false,
  ) {
    return axios({
      method: type,
      url: `${ssr ? '' : url}`,
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': contentType,
        Authorization: localStorage.getItem('token')
      },
    })
    .then((response) => response.data)
    .catch((error) => error.response.data);
  }
}

export default new FetchService();
