import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl (path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;

  return 'https://omgvamp-hearthstone-v1.p.mashape.com' + adjustedPath;
}

class ApiClient {
  constructor (req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path))
          .set('X-Mashape-Key', '38SbAvRhXUmshKzERoTk1KpnKJ8rp1B3S2qjsnPmU3LkCjy9BF');

        if (params) {
          request.query(params);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
}

export default new ApiClient();
