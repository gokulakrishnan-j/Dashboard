import axios from "axios";
import { BASE_URL } from "../../Config/index.tsx";
import { ApiEndPoints } from "../../enums/ApiEndpoint/index.tsx";
import { getLocalStorage } from "../../Component/ReusableFuction/LocalStorage/index.tsx";

const localData = getLocalStorage("user");
const dataObject = JSON.parse(localData);

export const updateUserApi = async (param, data) => {
  try {
    const response = await axios.put(
      `${BASE_URL}${ApiEndPoints.updateUser}/${param}`,
      data,
      {
        headers: {
          my_token: dataObject.token,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getUserApi = async (id, param) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${ApiEndPoints.getUser}/${id}?page=${param.page}&search=${param.search}`,
      {
        headers: {
          my_token: dataObject.token,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const deleteUserApi = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}${ApiEndPoints.deleteUser}/${id}`,
      {
        headers: {
          my_token: dataObject.token,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const changeUserPasswordApi = async (param, data) => {
  try {
    const response = await axios.put(
      `${BASE_URL}${ApiEndPoints.changeUserPass}/${param}`,
      data,
      {
        headers: {
          my_token: dataObject.token,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};
