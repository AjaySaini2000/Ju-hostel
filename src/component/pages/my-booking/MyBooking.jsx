import React, { useEffect, useState } from 'react'
import Header from '../../common/header/Header'
import Footer from '../../common/footer/Footer'
import { my_room_bookings } from '../../../api/Booking';
import { User_Authentication } from '../../../user_authentication/User_Authentication';
import Loader from '../../../loader/Loader';

const MyBooking = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [my_room_bookings_list, set_my_room_bookings] = useState([]);

  useEffect(() => {
    const Handle_my_room_bookings_list = async () => {
      setIsLoading(true)
      const token = User_Authentication();
      if (!token) {
        // setIsLoading(false);
        setIsLoading(false)
        throw new Error("User token not found");
      }
      try {

        const response = await my_room_bookings({ Authorization: `Bearer ${token}` });
        set_my_room_bookings(response?.data?.data?.my_bookings)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.log("error", error)
      }
    }
    Handle_my_room_bookings_list()
  }, [])
  console.log("my_room_bookings_list", my_room_bookings_list)
  return (
    <div>
      <Header compo="mybooking" />
      <div className="top_space pt-115" />
      <div className="booking_section pb-115">
        <div className="gi-register-wrapper container-fluid">
          <h4 className="mb-3 fw-semibold">My Hostel Booking Room</h4>
          <div className="bg-white shadow rounded">
            <div className="p-4 py-3 border-bottom">
              <div className="row">
                {/* <div className="col-md-12">
                  <div className="bus_info">
                    <h6 className="fw-semibold"><span className="fw-normal">Joining Date:</span>
                      10 January 2024</h6>
                  </div>
                </div> */}
              </div>
            </div>
            {
              isLoading ? <Loader /> :
                <div className="p-4">
                  <div className="row">
                    {my_room_bookings_list?.length > 0 ? (
                      <div className="col-md-12">
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead className="table-dark">
                              <tr>
                                <th>Hostel Name</th>
                                <th>Block</th>
                                <th>Floor</th>
                                <th>Room No.</th>
                                <th>Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {my_room_bookings_list?.map((booking) => (
                                <tr key={booking?.id}>
                                  <td>{booking?.boooking_detail?.hostel_name}</td>
                                  <td>{booking?.boooking_detail?.block_name}</td>
                                  <td>{booking?.boooking_detail?.floor_name}</td>
                                  <td>{booking?.boooking_detail?.room_number}</td>
                                  <td className="text-danger fw-bold">{booking?.amount}/-</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p>No room bookings are available at this time.</p>
                      </div>
                    )}
                  </div>

                </div>
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>

  )
}

export default MyBooking