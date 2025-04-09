export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error("Error parsing localStorage data for key:", key, e);
    return null;
  }
};


export const clearLocalStorage = () => {
  localStorage.clear();
};