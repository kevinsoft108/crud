import { redirect } from 'react-router-dom';

import FetchService from './Fetch.service';

class TokenService {
  saveToken(token) {
    localStorage.setItem('token', token);
    return Promise.resolve();
  }

  deleteToken() {
    localStorage.removeItem('token');
    return;
  }

  checkAuthToken(token, ssr) {
    return FetchService.isofetchAuthed({
      url: `/auth/validate`,
      data: { token },
      method: 'POST',
      ssr: true
    });
  }

  /**
   * Runs on both client and server side in the getInitialProps static.
   * This decides whether the request is from client or server, which
   * is important as the URL's will be different due to the Docker
   * container network
   * @param ctx
   */
  async authenticateTokenSsr(ctx) {
    const ssr = ctx?.req ? true : false;
    const token = localStorage.getItem('token');

    const response = await this.checkAuthToken(token, ssr);
    if (!response.success) {
      this.deleteToken();
      redirect('/?l=t')
    }
  }
}

export default TokenService;
