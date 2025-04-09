import axios from "axios";
import { BASE_URL } from "../../Config/index.tsx";
import { ApiEndPoints } from "../../enums/ApiEndpoint/index.tsx";

export const signupApi = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${ApiEndPoints.signup}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const signinApi = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${ApiEndPoints.signin}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    return err;
  }
};
