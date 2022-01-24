export default {
  expiresIn: '10m',
  secret: process.env.JWT_SECRET || 'qwert',
};
