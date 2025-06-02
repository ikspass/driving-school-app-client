import { $authHost, $host } from ".";
import { jwtDecode } from 'jwt-decode'

export const registration = async (idNumber, password) => {
  try {
    const {data} = await $host.post('auth/registration', {idNumber, password});
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message || 'Ошибка регистрации';
      alert(message);
    } else {
      alert('Проблема с подключением. Попробуйте позже.');
    }
    throw error;
  }
}

export const login = async (idNumber, password) => {
  try {
    const { data } = await $host.post('auth/login', { idNumber, password });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message || 'Ошибка аутентификации';
      alert(message);
    } else {
      alert('Проблема с подключением. Попробуйте позже.');
    }
    throw error;
  }
}

