import { $authHost, $host } from ".";
import { jwtDecode } from 'jwt-decode'

export const registration = async (idNumber, password) => {
  const {data} = await $host.post('auth/registration', {idNumber, password});
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
}

export const login = async (idNumber, password) => {
  const {data} = await $host.post('auth/login', {idNumber, password});
  localStorage.setItem('token', data.token);  
  return jwtDecode(data.token);
}

