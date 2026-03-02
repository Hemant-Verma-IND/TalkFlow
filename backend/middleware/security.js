const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Request limit exceeded. Try again in 15 minutes.' }
});

const securityHeaders = helmet();

module.exports = { limiter, securityHeaders };