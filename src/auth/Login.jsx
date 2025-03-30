import React, { useCallback, useEffect, useState } from 'react'
import Header from '../component/common/header/Header'
import Footer from '../component/common/footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import Images from '../component/common/images/Images'
import PhoneSelector from '../component/common/phone-input/PhoneSelector'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

import { parsePhoneNumberFromString } from "libphonenumber-js";
import { loginUser } from '../api/Auth'
import axios from 'axios'
import { homeData } from '../api/Global'

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [user_role, set_User_Role] = useState([])
  const [formdata, setFormdata] = useState({
    user_role: '',
    country_code: '',
    mobile: ''
  })

  useEffect(() => {
    const Hnadle_Get_User_role = async () => {
      try {
        const response = await homeData();
        if (response?.data?.status == "200") {
          set_User_Role(response?.data?.data?.role)
        }
      }
      catch (error) {
        console.log("error", error)
      }
    }
    Hnadle_Get_User_role();
  }, [])

  const handleChange = useCallback((input, isPhoneInput = false) => {
    if (isPhoneInput) {
      const phoneNumber = parsePhoneNumberFromString('+' + input);
      if (!phoneNumber) {
        console.log("PhoneNumber:", phoneNumber); // Log the result
        setFormdata((prevState) => ({
          ...prevState,
          mobile: undefined,
          country_code: undefined
        }));
        return
      }

      const countryCode = phoneNumber.countryCallingCode
      const nationalNumber = phoneNumber.nationalNumber;

      setFormdata((prevState) => ({
        ...prevState,
        mobile: nationalNumber,
        country_code: `+${countryCode}`
      }));
      // console.log(formdata);

    } else {
      const { name, value } = input.target;
      setFormdata((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

  }, [formdata]);
  // console.log(formdata);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const requiredFields = {
      user_role: "The User Roles field is required",
      mobile: "The Phone number field is required",
    };

    for (const [field, errorMessage] of Object.entries(requiredFields)) {
      // console.log('field=',field);
      // console.log('errorMessage=',errorMessage);

      if (!formdata[field]) {
        toast(errorMessage);
        setIsLoading(false)
        return;
      }
    }
    try {
      const response = await loginUser(formdata)

      if (response?.data?.status == "200") {
        console.log(response);
        localStorage.setItem("mobile",response?.data?.data?.mobile)
        localStorage.setItem("country_code",response?.data?.data?.country_code)
        localStorage.setItem("user_role",response?.data?.data?.user_role)
        navigate('/login-otp',
          {
            state: {
              // console.log(response?.data?.data?.mobile);

              mobile: response?.data?.data?.mobile,
              country_code: response?.data?.data?.country_code,
              temp_id: response?.data?.data?.id
            }
          }
        )
        toast(response?.data?.message)
      } else if (response?.response?.data?.status == "500") {
        // console.log(response?.response?.data?.message);

        toast.error(response?.response?.data?.message)
      }
      // navigate('/otp', {state:formdata})
      // toast.success("Successfully Login");
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }


  }
  return (
    <>
      <div>
        <Header />
        {/* <-------- ToastContainer ------------> */}
        <ToastContainer style={{ marginTop: "120px" }} />
        <div className="top_space pt-115" />
        <div className="booking_section pb-115">
          <div className="gi-register-wrapper container">
            <div className="bg_basic_details position-relative p-2">
              <div className="bg_transparent p-2">
                <div className="gi-login-box bg-transparent p-0">
                  <div className="multisteps-form__form">
                    <div className="multisteps-form__paneldd">
                      <div className="row">
                        <div className="col-md-6 col-lg-5">
                          <img src={Images.loginpic} className="img-fluid" alt='' />
                        </div>
                        <div className="col-md-6 col-lg-6 my-auto">
                          <div className="multisteps-form__contents p-5">
                            <h2>Login</h2>
                            <h6>Welcome back! Please login to your account.</h6>
                            <form action="#" className="mt-5" method='post' onSubmit={(e) => { handleSubmit(e) }}>
                              <div className="formgrid">
                                <div className="input-group input-group-two left-icon mb-20">
                                  <label>User Roles</label>
                                  <select name="user_role" id="guest" style={{ display: 'flex' }} value={formdata.user_role} onChange={(e) => { handleChange(e) }}>
                                    <option value='' selected>-- Select --
                                    </option>
                                    {
                                      user_role?.map((user_role_result) => {
                                        return (
                                          <option value={user_role_result?.id}>{user_role_result?.name}</option>
                                        )
                                      })
                                    }
                                  </select>
                                </div>
                                <div className="d-inline input-group input-group-two left-icon mb-20 w-100">
                                  <label className="w-100">Phone Number</label>
                                  {/* <input type="text" id="mobile_code" className="form-control" placeholder="Phone Number" name="name" /> */}
                                  <PhoneSelector phnumber={`${formdata.country_code}+${formdata.mobile}`} phoneInput={(value) => handleChange(value, true)} />
                                </div>
                                <div className="input-group mt-4 input-group-two left-icon mb-20">
                                  <button className="btn btn-danger w-100 text-white" type="submit">
                                    {isLoading ? (
                                      <ClipLoader color="#ffffff" size={20} />
                                    ) : (
                                      "Send OTP"
                                    )}
                                  </button>
                                </div>
                              </div>
                            </form>
                            <p className="text-center text-secondary">Don't have an account ? <Link to="/register" className="fw-bold text-danger mt-0 mt-md-4">Sign UP</Link></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

    </>
  )
}

export default Login