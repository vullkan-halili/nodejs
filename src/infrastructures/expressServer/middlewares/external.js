import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';

export default function initExternalMiddlewares({ app }) {
  app.use(helmet()); // Use helmet to secure app by setting various http headers.
  app.use(cors()); // Use cors middlewares.
  app.use(logger('dev')); // Use morgan logger middlewares.
  app.use(bodyParser.json()); // Support json encoded bodies.
  app.use(bodyParser.urlencoded({ extended: true })); // Support url encoded bodies.
}