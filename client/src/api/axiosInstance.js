import axios from 'axios';

// https://vite.dev/guide/env-and-mode
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

let accessToken = '';

function setAccessToken(newToken) {
  accessToken = newToken;
}

// interceptors - https://axios-http.com/ru/docs/interceptors
// можно перехватывать запросы или ответы до того, как они будут then или catch
// нужны для автоматизации процесса взаимодействия с сервером через токена доступа.

// в каждый request через axiosInstance автоматически добавляется заголовок
// Authorization: Bearer yourJwtAccessToken с помощью interceptors.request
axiosInstance.interceptors.request.use((config) => {
  //   config.withCredentials = true;
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// если запрос не был успешно выполнен из-за истечения срока годности accessToken, то
// interceptors.response должен автоматически обновить accessToken
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    // если в ответе статус 403, и запрос был выслан впервые
    // (если перехваченный ответ уже до этого был перехвачен, то ничего не надо делать - это позволит избежать бесконечного цикла ревалидации токена)
    // 403 - клиент не имеет доступа к контенту, то есть он неавторизован,
    // поэтому сервер отказывается предоставить запрошенный ресурс. В отличие от 401 Unauthorized, личность клиента известна серверу.
    if (error.response.status === 403 && !prevRequest.sent) {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}${
          import.meta.env.VITE_API
        }/token/refresh`,
        { withCredentials: true }
      );
      accessToken = response.data.accessToken;
      // проставляем поле sent, что запрос уже был до этого отправлен
      prevRequest.sent = true;
      // добавляем новый токен в прошлый неудавшийся запрос
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      // повторяем ещё раз прошлый запрос с новым токеном
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  }
);

export { setAccessToken };

export default axiosInstance;
