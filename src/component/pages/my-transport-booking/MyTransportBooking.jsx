import React, { useEffect, useState } from 'react'
import Header from '../../common/header/Header'
import Footer from '../../common/footer/Footer'
import { transport_book } from '../../../api/Global';
import { User_Authentication } from '../../../user_authentication/User_Authentication';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { my_transport_bookings } from '../../../api/Booking';
import Loader from '../../../loader/Loader';
const MyTransportBooking = () => {
  const [isLoading,setIsLoading] = useState(false)
  const [my_transport_booking_list, set_My_Transport_Booking_List] = useState([]);


  useEffect(() => {
    const handle_My_Transport_Booking_List = async () => {
      setIsLoading(true)
      const token = User_Authentication();
      if (!token) {
        toast.error("user is not login here ");
      }
      try {
        const response = await my_transport_bookings({ Authorization: `Bearer ${token}` });
        if (response?.data?.status == "200") {
          set_My_Transport_Booking_List(response?.data?.data?.my_bookings)
          setIsLoading(false)
        }
        else{
            setIsLoading(false)
          }
        }
        catch (error) {
        setIsLoading(false)
      }
    }
    handle_My_Transport_Booking_List();
  }, [])

  const formatTimeToAMPM = (time) => {
    const [hour, minute] = time.split(':');
    let hours = parseInt(hour);
    const minutes = minute;
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes} ${ampm}`;
  };

  console.log("my_transport_booking_list", my_transport_booking_list)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div>
      <Header compo="my_transport_booking" />
      <div className="top_space pt-115"></div>
      {/* <-------- ToastContainer ------------> */}
      <ToastContainer style={{ marginTop: "120px" }} />
      {
        isLoading ? <Loader/> : 
      <div className="booking_section pb-115">
        <div className="gi-register-wrapper container">
          <h4 className="mb-3 fw-semibold">My Transport Booking Route</h4>
          {
            my_transport_booking_list?.map((my_transport_booking_list_result) => {
              return (
                <div className="bg-white shadow rounded mt-3">
                  <div className="p-4 py-3 border-bottom">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="bus_info">
                          <h6 className="fw-semibold"><i className="fas fa-bus" />{" "} {my_transport_booking_list_result?.boooking_detail?.bus_name}</h6>
                        </div>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className="bus_info">
                          <h6 className="fw-semibold"><span className="fw-normal">Driver Name: </span>{" "}{my_transport_booking_list_result?.boooking_detail?.driver_name}</h6>
                        </div>
                      </div>
                      <div className="col-md-4 text-md-end">
                        {
                          my_transport_booking_list_result?.joining_date != null && (
                            <div className="bus_info">
                              <h6 className="fw-semibold"><span className="fw-normal">Date:</span>{my_transport_booking_list_result?.joining_date}</h6>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="bus_info">
                          <h6 className="fw-normal text-secondary">Departure</h6>
                          <h6 className="fw-semibold py-2">{my_transport_booking_list_result?.route_from}</h6>
                          <div className="fw-semibold small text-danger">{my_transport_booking_list_result?.boooking_detail?.route_from_time ? formatTimeToAMPM(my_transport_booking_list_result?.boooking_detail.route_from_time) : ''}</div>
                        </div>
                      </div>
                      {/* <div className="col-md-2 col-lg-2 my-auto">
                        <div className="bus_info">
                          <div className="bg-light small py-2 px-3 text-center rounded-pill">8
                            Hours 30 minutes</div>
                        </div>
                      </div> */}
                      {/* <div className="col-md-4 col-lg-4">
        <div className="bus_info">
          <h6 className="fw-normal text-secondary">Arrival</h6>
          <h6 className="fw-semibold py-2">200 Ft Bypass, Jaipur (Rajasthan)</h6>
          <div className="fw-semibold small text-danger">04:15 PM</div>
        </div>
      </div> */}
                      <div className="col-md-4 col-lg-2">
                        <div className="bus_info">
                          <h6 className="fw-normal text-secondary">Price</h6>
                          <h6 className="fw-semibold text-danger py-2">Rs.{my_transport_booking_list_result?.boooking_detail?.amount}/-</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )

            })
          }

        </div>
      </div>

      }
      <Footer />
    </div>

  )
}

export default MyTransportBooking