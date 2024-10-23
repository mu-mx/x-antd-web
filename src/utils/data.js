// @ts-ignore
import { search } from 'text-search-engine';

export const get = (url, data) =>
  fetch(url, data)
    .then((response) => {
      // network failure, request prevented
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      }

      return Promise.reject(new Error(response.statusText));
    })
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      console.log('error - >:', error);
      return [];
    });

export const fetchData = async () => {
  try {
    const websitePathReq =
      'https://ap-southeast-1.aws.data.mongodb-api.com/app/app-site-wdecree/endpoint/getSiteAll';

    await Promise.all([get(websitePathReq)]).then(([websiteData]) => {
      localStorage.setItem('site', JSON.stringify(websiteData));
    });
  } catch (err) {
    console.log('err - >:', err);
  }
};

const getFinalData = async () => {
  if (!localStorage.getItem('site')) {
    await fetchData();
  }

  var websiteData = JSON.parse(localStorage.getItem('site') || '[]');
  const webs = websiteData;

  return {
    websiteData: webs,
  };
};

export const getDataBase = async () => {
  const { websiteData } = await getFinalData();

  return websiteData;
};

export const getDataByName = async (title) => {
  const webs = JSON.parse(localStorage.getItem('site') || '[]');
  const websiteData = webs;

  let backData = [];

  websiteData.forEach((item) => {
    item.childrens.forEach((it) => {
      backData.push(it);
    });
  });

  if (!title) {
    return backData;
  }

  return backData.filter((item) => {
    // return (
    //   item.title?.toLowerCase().includes(title.toLowerCase()) ||
    //   item.description?.toLowerCase().includes(title.toLowerCase()) ||
    //   item.url?.toLowerCase().includes(title.toLowerCase())
    // );
    return search(item.title, title)?.length || search(item.description, title)?.length;
  });
};
