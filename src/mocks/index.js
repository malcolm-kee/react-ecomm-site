import { Model, RestSerializer, Server } from 'miragejs';
import { careers } from '../modules/career/__mocks__/career.data';

const appSerializer = RestSerializer.extend({
  root: false, // this to remove the root property of the model name
  embed: true, // this is required when root is false
});

export function createMockServer({ environment } = {}) {
  const server = new Server({
    environment,
    serializers: {
      application: appSerializer,
    },
    fixtures: {
      jobs: careers,
    },
    models: {
      job: Model,
    },
    routes() {
      this.get(process.env.REACT_APP_CAREER_BASE_URL, function (
        schema,
        request
      ) {
        const id = request.queryParams.id;
        const result = id ? schema.jobs.where({ id }) : schema.jobs.all();
        return result;
      });

      this.passthrough('https://ecomm-db.herokuapp.com/api/**');
    },
  });

  return server;
}
