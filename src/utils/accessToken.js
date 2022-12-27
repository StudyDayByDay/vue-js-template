import { setting } from '@/config/setting';
// tokenTableName: vue3-admin-template
const { tokenTableName } = setting;
import Cookies from 'js-cookie';


function getAccessToken() {
  return Cookies.get(tokenTableName);
}

function setAccessToken(accessToken) {
  return Cookies.set(tokenTableName, accessToken);
}

function removeAccessToken() {
  return Cookies.remove(tokenTableName);
}

export {getAccessToken, setAccessToken, removeAccessToken};
