import React, { useCallback, useEffect, useState } from 'react'
import Header from '../component/common/header/Header'
import Footer from '../component/common/footer/Footer'
import Images from '../component/common/images/Images'
import ClipLoader from "react-spinners/ClipLoader";
import PhoneSelector from '../component/common/phone-input/PhoneSelector'
import { Link, useNavigate } from 'react-router-dom'
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { registerUser } from "../api/Auth";
import { homeData } from '../api/Global';

const Ragister = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [user_role, set_User_Role] = useState([])
  const [isMessage, setIsmessage] = useState("")
  const [formdata, setFormdata] = useState({
    user_role: '',
    name: '',
    gender: '',
    email: '',
    dob: '',
    profileImg: '',
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
        setFormdata((prevState) => ({
          ...prevState,
          mobile: undefined,
          country_code: undefined
        }));
        return
      }

      const countryCode = phoneNumber.countryCallingCode
      const nationalNumber = phoneNumber.nationalNumber

      const validNumber = phoneNumber.isValid();

      if (!validNumber) {
        // toast("Invalid phone number format for the selected country.");
        setIsmessage("Invalid phone number format for the selected country.")
        return;
      }
      setIsmessage("")
      setFormdata((prevState) => ({
        ...prevState,
        mobile: nationalNumber,
        country_code: `+${countryCode}`
      }));
    } else {
      if (input.target.type == "file") {
        const file = input.target.files[0]
        if (file) {
          const validTypes = ["image/jpeg", "image/png", "image/jpg"];
          const maxSize = 5 * 1024 * 1024;
          if (!validTypes.includes(file.type)) {
            toast.error("Invalid file Type! please upload a jpeg,jpg or png file")
            return
          } else if (file.size > maxSize) {
            toast.error("Please upload a smaller size image")
            return
          }
          setFormdata((prevState) => ({
            ...prevState,
            [name]: file,
          }));
        }
      }
      const { name, value } = input.target;
      setFormdata((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  }, [formdata]);
  console.log(formdata);



  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const requiredFields = {
      user_role: "The User Roles field is required",
      name: "The Fullname field is required",
      gender: "The Gender field is required",
      email: "The Email field is required",
      dob: "The Date of Birth field is required",
      country_code: "please fill the valid phone number",
      mobile: "please fill the valid phone number",

    };
    for (const [field, errorMessage] of Object.entries(requiredFields)) {
      if (!formdata[field]) {
        toast.error(errorMessage);
        setIsLoading(false)
        return;
      }
      if (isMessage) {
        toast.error("Invalid phone number format for the selected country")
        setIsLoading(false)
        return
      }
    }

    try {
      const response = await registerUser(formdata);

      // console.log(response);
      if (response?.data?.status == '200') {
        console.log('success', response);
        localStorage.setItem("register_user_role", formdata?.user_role)
        localStorage.setItem("register_name", formdata?.name)
        localStorage.setItem("register_gender", formdata?.gender)
        localStorage.setItem("register_email", formdata?.email)
        localStorage.setItem("register_dob", formdata?.dob)
        localStorage.setItem("register_profileImg", formdata?.profileImg)
        localStorage.setItem("register_country_code", formdata?.country_code)
        localStorage.setItem("register_mobile", formdata?.mobile)
        navigate('/register-otp', {
          state: {
            mobile: response?.data?.data?.user?.mobile,
            country_code: response?.data?.data?.user?.country_code,
            temp_id: response?.data?.data?.user?.id
          }
        })

      } else if (response?.response?.data?.status == "500") {
        console.log('ftygh', response?.response);

        toast.error(response?.response?.data?.message)
      }

    } catch (error) {
      console.log('error', error);
      toast.error(error.message)

    } finally {
      setIsLoading(false);
    }

  }
  return (
    <div>
      <Header />
      <div className="top_space pt-115" />
      {/* <-------- ToastContainer ------------> */}
      <ToastContainer style={{ marginTop: "120px" }} />
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
                      <div className="col-md-6 col-lg-7 my-auto">
                        <div className="multisteps-form__contents p-5">
                          <h2>Register</h2>
                          <h6>Sign up now to become a member</h6>
                          <form className="mt-5" method='post' onSubmit={(e) => { handleSubmit(e) }}>
                            <div className="formgrid">
                              <div className="row">
                                <div className="col-md-12">
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
                                </div>
                                <div className="col-md-6">
                                  <div className="input-group input-group-two left-icon mb-20">
                                    <label className="w-100">Full Name</label>
                                    <input type="text" className="form-control" placeholder="User Name" name="name" value={formdata.name} onChange={(e) => { handleChange(e) }} />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="input-group input-group-two left-icon mb-20">
                                    <label>Gender</label>
                                    <select name="gender" id="guest" style={{ display: 'flex' }} value={formdata.gender} onChange={(e) => { handleChange(e) }}>
                                      <option value='' selected>-- Select --
                                      </option>
                                      <option value='male'>Male</option>
                                      <option value='female'>Female</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="input-group input-group-two left-icon mb-20">
                                    <label className="w-100">Email ID</label>
                                    <input type="email" className="form-control" placeholder="email Id" name="email" value={formdata.email} onChange={(e) => { handleChange(e) }} />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="input-group input-group-two left-icon mb-20">
                                    <label className="w-100">Date of Birth</label>
                                    <input type="date" className="form-control" placeholder="Date of Birth" name="dob" value={formdata.dob} onChange={(e) => { handleChange(e) }} />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="input-group input-group-two left-icon mb-20">
                                    <label className="w-100">Upload Profile</label>
                                    <input type="file" className="form-control" placeholder="profile" name="profileImg" value={formdata.profileImg} onChange={(e) => { handleChange(e) }} />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="d-inline input-group input-group-two left-icon mb-20">
                                    <label className="w-100">Phone Number</label>
                                    {/* <input type="text" id="mobile_code" className="form-control" placeholder="Phone Number" name="name" /> */}
                                    <PhoneSelector phnumber={`${formdata.country_code}+${formdata.mobile}`} phoneInput={(value) => handleChange(value, true)} />

                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="input-group mt-4 input-group-two left-icon mb-20">
                                    <button className="btn btn-danger w-100 text-white" type="submit" disabled={isLoading}>
                                      {isLoading ? (
                                        <ClipLoader color="#ffffff" size={20} />
                                      ) : (
                                        "Register"
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                          <p className="text-center text-secondary">Already a Member? <Link to="/login" className="fw-bold text-danger mt-0 mt-md-4">Login Here</Link></p>
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

  )
}

export default Ragister