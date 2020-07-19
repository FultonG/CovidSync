const morgan = require('morgan');

const colors = {
  RED: '\x1b[31m',
  BLUE: '\x1b[34m',
  CYAN: '\x1b[36m',
  GREEN: '\x1b[32m',
};

const reset = '\x1b[0m';

const getStatusColor = (status) => {
  if (status >= 400) return colors.RED;
  if (status >= 300) return colors.CYAN;
  if (status >= 200) return colors.GREEN;
  return reset;
};

morgan.token('custom', (req, res) => {
  const { method, originalUrl, body } = req;
  const { statusCode, statusMessage } = res;
  const color = getStatusColor(statusCode);
  return `${method} '${originalUrl}' - ${color}${res.statusCode}: ${statusMessage}${reset}
    ${colors.GREEN}Info${reset}:\n\t Request Payload: ${JSON.stringify(body)}`;
});

morgan.format('dev-log', ':custom\n :response-time ms\n');

module.exports = () => morgan('dev-log');
