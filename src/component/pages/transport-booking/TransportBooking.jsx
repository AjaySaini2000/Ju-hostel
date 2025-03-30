import React, { useEffect, useState } from 'react'
import Header from '../../common/header/Header'
import Footer from '../../common/footer/Footer'
import Images from '../../common/images/Images';
import { search_route, transport_book } from '../../../api/Global';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { User_Authentication } from '../../../user_authentication/User_Authentication';
import Loader from '../../../loader/Loader';
import Payment_Gateway from '../../../payment_gateway/Payment_Gateway';
import { useNavigate } from 'react-router-dom';

const TransportBooking = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [route_from, set_Route_From] = useState("");
  const [route_search_list, set_Route_Search_List] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDurations, setSelectedDurations] = useState("");
  const [calculatedAmounts, setCalculatedAmounts] = useState(route_search_list[0]?.amount);
  const isUserLoggedIn = User_Authentication();
  // Handle the change in duration selection
  const handleDurationChange = (e, routeId, baseAmount) => {
    const selectedValue = e.target.value;
    let newAmount = baseAmount;
    if (selectedValue === "6month") {
      newAmount = baseAmount * 6;
    } else if (selectedValue === "1year") {
      newAmount = baseAmount * 12;
    }
    setSelectedDurations((prev) => ({
      ...prev,
      [routeId]: selectedValue,
    }));

    setCalculatedAmounts((prev) => ({
      ...prev,
      [routeId]: newAmount,
    }));
  };

  useEffect(() => {
    setCalculatedAmounts(route_search_list[0]?.amount);
  }, [route_search_list[0]?.amount]);

  const Handle_search_route = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const data = {
      route_from: route_from
    }
    setIsSubmitted(true);
    try {
      const response = await search_route(data);
      if (response?.data?.status == "200") {
        set_Route_Search_List(response?.data?.data?.route_detail)
        setIsLoading(false)
        setSelectedDurations("")
      }
    }
    catch (error) {
      console.log("error", error)
      setIsLoading(false)
    }
  }

  const formatTimeToAMPM = (time) => {
    const [hour, minute] = time.split(':');
    let hours = parseInt(hour);
    const minutes = minute;
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes} ${ampm}`;
  };

  const handle_book_transport = async (route_id, transport_id, route_from) => {
    const formData = new FormData();
    formData.append("route_id", route_id)
    formData.append("transport_id", transport_id)
    formData.append("route_from", route_from)
    formData.append("booking_period", "1year");

    const token = User_Authentication();
    if (!token) {
      toast.error("user is not login here ");
    }
    try {
      const response = await transport_book(formData, { Authorization: `Bearer ${token}` })
      console.log("res", response)
      if (response?.data?.status == "200") {
        toast.success(response?.data?.message)
        setSelectedDurations("")
      }
      else if (response?.response?.data?.status == "500") {
        toast.error(response?.response?.data?.message)
      }
    }
    catch (error) {
      console.log("error", error)
    }
  }

  // Function to convert time (HH:mm:ss) to total minutes
  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 60 + parseInt(minutes);
  };



  // Function to calculate the time difference between from_time and to_time
  const calculateTimeDifference = (fromTime, toTime) => {
    const fromMinutes = convertTimeToMinutes(fromTime);
    const toMinutes = convertTimeToMinutes(toTime);
    let diffInMinutes = toMinutes - fromMinutes;

    if (diffInMinutes < 0) {
      diffInMinutes += 24 * 60;
    }
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    return { hours, minutes, totalMinutes: diffInMinutes };
  };

  const handlePaymentSuccess = ({ transaction_id, payment_status, route_id, transport_id, route_from }) => {
    if (payment_status === "Success") {
      handle_book_transport(route_id, transport_id, route_from);
    }
  };
  return (
    <div>
      <Header />
      <div className="top_space pt-115" />
      {/* <-------- ToastContainer ------------> */}
      <ToastContainer style={{ marginTop: "120px" }} />
      <div className="booking_section pb-115">
        <div className="gi-register-wrapper container">
          <div className="pl-115 pr-115">
            <h4 className="mb-3 fw-bold">Hostel Details</h4>
            <div className="bg_basic_details position-relative p-3">
              <div className="bg_transparent p-3" style={{ backgroundImage: `url(${Images.hostel_map_bg})` }}>
                <div className="gi-login-box bg-transparent">
                  <div className="multisteps-form__form">
                    <div className="multisteps-form__paneldd">
                      <h5 className="mb-3 fw-bold">Transport Booking</h5>
                      <div className="multisteps-form__content">
                        <form action="#" onSubmit={Handle_search_route}>
                          <div class="formgrid">
                            <div class="row">
                              <div class="col-md-10">
                                <div class="input-group input-group-two left-icon mb-20">
                                  <label>Search Route</label>
                                  <input type="text" name='route_from' value={route_from}
                                    onChange={(e) => { set_Route_From(e.target.value) }}
                                    placeholder="Jhotwara, Jaipur (Rajasthan)" class="form-control" />
                                </div>
                              </div>
                              <div class="col-md-2 align-items-end d-flex">
                                <div class="input-group input-group-two left-icon mb-20">
                                  <button class="btn btn-danger js-btn-next text-white" type="submit">Submit</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                        {
                          isLoading ? <Loader /> :
                            <>
                              {
                                isSubmitted ? (
                                  route_search_list?.length > 0 ? (
                                    <>
                                      {route_search_list?.map((route_search_list_result) => {
                                        const { from_point_time, to_point_time } = route_search_list_result || {};

                                        // Calculate the time difference if both times exist
                                        let timeDifference = { hours: 0, minutes: 0, totalMinutes: 0 };
                                        if (from_point_time && to_point_time) {
                                          timeDifference = calculateTimeDifference(from_point_time, to_point_time);
                                        }

                                        return (
                                          <div className="bg-white shadow rounded mt-3" key={route_search_list_result?.id}>
                                            <div className="p-4 py-3 border-bottom">
                                              <div className="row">
                                                <div className="col-md-4">
                                                  <div className="bus_info">
                                                    <h6 className="fw-semibold">
                                                      <i className="fas fa-bus" /> {route_search_list_result?.route?.transport?.busName}
                                                    </h6>
                                                  </div>
                                                </div>
                                                <div className="col-md-4 text-center">
                                                  <div className="bus_info">
                                                    <h6 className="fw-semibold">
                                                      <span className="fw-normal">Driver Name: </span>{" "}
                                                      {route_search_list_result?.route?.transport?.driverName}
                                                    </h6>
                                                  </div>
                                                </div>

                                                <div className="col-md-4 text-md-end">
                                                  <div className="bus_info">
                                                    <h5 className="fw-semibold text-danger">
                                                      Rs.{route_search_list_result?.amount}
                                                    </h5>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="p-4">
                                              <div className="row">
                                                <div className="col-md-5">
                                                  <div className="bus_info">
                                                    <h6 className="fw-normal text-secondary">Departure</h6>
                                                    <h6 className="fw-semibold py-2">{route_search_list_result?.route_from}</h6>
                                                    <div className="fw-semibold small text-danger">
                                                      {route_search_list_result?.from_point_time
                                                        ? formatTimeToAMPM(route_search_list_result?.from_point_time)
                                                        : ""}
                                                    </div>
                                                  </div>
                                                </div>

                                                {/* Display time difference */}
                                                <div className="col-md-4 col-lg-4 my-auto">
                                                  <div className="bus_info">
                                                    <div className="bg-light small py-2 px-3 text-center rounded-pill">
                                                      {/* Show minutes only if total minutes is less than 60 */}
                                                      {timeDifference.totalMinutes < 60
                                                        ? `${timeDifference.minutes} Minutes`
                                                        : `${timeDifference.hours} Hours ${timeDifference.minutes} Minutes`}
                                                    </div>
                                                  </div>
                                                </div>

                                                <div className="col-md-3 col-lg-3 my-auto">
                                                  <div className="bus_info ps-0 ps-md-4 ps-lg-4">
                                                    {/* <button
                                                      className="btn btn-danger w-100 js-btn-next text-white"
                                                      onClick={() =>
                                                        handle_book_transport(
                                                          route_search_list_result?.id,
                                                          route_search_list_result?.route?.transport_id,
                                                          route_search_list_result?.route_from
                                                        )
                                                      }
                                                      disabled={!selectedDurations[route_search_list_result?.id]}
                                                      type="button"
                                                    >
                                                      Book Now
                                                    </button> */}
                                                    {
                                                      isUserLoggedIn ? (
                                                        <Payment_Gateway
                                                          Price={route_search_list_result?.amount}
                                                          onPaymentSuccess={({ transaction_id, payment_status }) =>
                                                            handlePaymentSuccess({
                                                              transaction_id,
                                                              payment_status,
                                                              route_id: route_search_list_result?.id,
                                                              transport_id: route_search_list_result?.route?.transport_id,
                                                              route_from: route_search_list_result?.route_from
                                                            })
                                                          }
                                                        />
                                                      ) : (
                                                        <button
                                                          className="btn btn-danger js-btn-next p-2 px-4 mt-2 text-white"
                                                          onClick={() => {
                                                            toast.error("User is not logged in.");
                                                            setTimeout(() => {
                                                              navigate("/login");
                                                            }, 2000);
                                                          }}
                                                        >
                                                          Book Now
                                                        </button>
                                                      )
                                                    }

                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}

                                    </>
                                  ) : (
                                    <div className='text-center'>
                                      <p className='text-danger'>Currently, no route details are available for the selected route. Please check back later.</p>
                                    </div>
                                  )
                                ) : (
                                  <img src={Images.hostel_booking} alt='' />
                                )
                              }
                            </>
                        }
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

export default TransportBooking