import axios from "axios";
import { BaseUrl } from "../config/Config";
import { User_Authentication } from "../user_authentication/User_Authentication";


export const registerUser = async (formdata) => {
    try {
      const response = await axios.post(`${BaseUrl}register`, formdata);
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
      return error; // Let the component handle errors
    }
  };

  export const otpMatch = async (formdata) => {
    try {
      const response = await axios.post(`${BaseUrl}match-otp`, formdata);
      return response;
    } catch (error) {
      // console.error("Error during API call:", error);
      return error; // Let the component handle errors
    }
  };

  export const loginUser=async (formdata)=>{
    try {
      const response = await axios.post(`${BaseUrl}login`, formdata);
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
      return error; // Let the component handle errors
    }
  }

  export const logOut=async (header)=>{
    // console.log(header);
    
    try {
      const response = await axios.get(`${BaseUrl}logout`,{
        headers:header
      });

      return response;
    } catch (error) {
      console.error("Error during API call:", error);
      return error; // Let the component handle errors
    }
  }

  export const userProfile=async (header)=>{
    try {
      const response = await axios.get(`${BaseUrl}user-profile`,{
        headers:header
      });

      return response;
    } catch (error) {
      console.error("Error during API call:", error);
      return error; // Let the component handle errors
    }
  }
  
 