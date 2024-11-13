// модуль, который будет использоваться глобально для всего приложения для общей настройки JWT
const jwtConfig = {
  access: {
    expiresIn: 1000 * 60 * 5, // 5 минут
  },
  refresh: {
    expiresIn: 1000 * 60 * 60 * 5, // 5 часов
  },
};

module.exports = jwtConfig;
