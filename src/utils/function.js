import { setting } from '@/config/setting';
const { title } = setting;

const getPageTitle = (pageTitle) => {
  if (pageTitle) {
    return `${pageTitle}-${title}`;
  }
  return `${title}`;
};

export {getPageTitle};