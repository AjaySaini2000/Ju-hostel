import axios from "axios";
import { BaseUrl } from "../config/Config";




export const termsConditions = async () => {
  try {
    const response = await axios.get(`${BaseUrl}terms-conditions`);

    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    return error; // Let the component handle errors
  }
}

export const privacyPolicy = async () => {
  try {
    const response = await axios.get(`${BaseUrl}privacy-policy`);

    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    return error; // Let the component handle errors
  }
}

export const latestNews = async () => {
  try {
    const response = await axios.get(`${BaseUrl}latest-news`);

    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    return error; // Let the component handle errors
  }
}
export const latestNewsDetails = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}latest-news`, {
      params: {
        id: id,
      }
    });

    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    return error; // Let the component handle errors
  }
}

export const feesStructure = async () => {
  try {
    const response = await axios.get(`${BaseUrl}fee-structure`);

    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    return error; // Let the component handle errors
  }
}

export const rulesRegulation = async () => {
  try {
    const response = await axios.get(`${BaseUrl}rules-and-regulations`);

    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    return error; // Let the component handle errors
  }
}

export const hostelList = async () => {
  try {
    const response = await axios.get(`${BaseUrl}hostel-list`);

    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    return error; // Let the component handle errors
  }
}

export const hostelSearch = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}hostel-search`, data);

    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    return error; // Let the component handle errors
  }
}

export const newsList = async () => {
  try {
    const response = await axios.get(`${BaseUrl}latest-news`);

    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    return error; // Let the component handle errors
  }
}

export const roomsearch = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}room-search`, data);
    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    return error; // Let the component handle errors
  }
}

export const roomdetail = async (id) => {
  try {
    const response = await axios.get(`${BaseUrl}room-detail`, {
      params: {
        id: id,
      }
    });
    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};

export const roombook = async (data, headers) => {
  try {
    const response = await axios.post(`${BaseUrl}room-book`, data, { headers: headers });
    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};
export const save_contact_us = async (data) => {
  try {
    const response = await axios.post(`${BaseUrl}save-contact-us`, data);
    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};

export const homeData=async ()=>{
  try {
    const response = await axios.get(`${BaseUrl}master-data`);
    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    return error; // Let the component handle errors
  }
}

export const settings=async ()=>{
  try {
    const response = await axios.get(`${BaseUrl}settings`);
    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    return error; // Let the component handle errors
  }
}
export const contactUs = async (formdata) => {
  try {
    const response = await axios.post(`${BaseUrl}save-contact-us`, formdata);
    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    return error; // Let the component handle errors
  }
};

export const search_route = async (formdata) => {
  try {
    const response = await axios.post(`${BaseUrl}search-route`, formdata);
    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    return error; // Let the component handle errors
  }
};

export const transport_book = async (formdata,headers) => {
  try {
    const response = await axios.post(`${BaseUrl}transport-book`, formdata,{ headers: headers });
    return response;
  } catch (error) {
    console.error("Error during API call:", error);
    return error; // Let the component handle errors
  }
};

