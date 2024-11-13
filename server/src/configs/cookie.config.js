// модуль, который будет использован для конфигурации cookie+jwt с одинаковыми параметрами срока жизни
const jwtConfig = require('./jwt.config');

const cookieConfig = {
  access: {
    maxAge: jwtConfig.access.expiresIn,
    httpOnly: true,
  },
  refresh: {
    maxAge: jwtConfig.refresh.expiresIn,
    httpOnly: true,
  },
};

module.exports = cookieConfig;
