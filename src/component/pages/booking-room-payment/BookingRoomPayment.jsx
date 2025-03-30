import React from 'react'
import Images from '../../common/images/Images'
import Header from '../../common/header/Header'
import Footer from '../../common/footer/Footer'

const BookingRoomPayment = () => {
  return (
   <div>
    <Header/>
  <div className="top_space pt-115" />
  <div className="booking_section">
    <div className="gi-register-wrapper container">
      <h4 className="mb-3 fw-bold">Hostel Details</h4>
      <div className="bg_basic_details position-relative p-3">
        <div className="bg_transparent">
          <div className="gi-login-box bg-transparent">
            <div className="card-body bg-white rounded" style={{backgroundImage: `url(${Images.hostel_map_bg})`}}>
              <div className="row">
                <div className="col-md-6 my-auto text-center">
                  <div className="rounded">
                    <div className="card-body room_feature position-relative">
                      <h5 className="fw-bold">Payment</h5>
                      <h3 className="text-danger fw-bold">Rs. 50,000/-
                      </h3>
                      <button className="btn btn-danger mt-4 p-2 px-5 text-white" type="button" title="Submit">Pay Now</button>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="rounded card border-0">
                    <div className="card-body room_feature position-relative">
                      <img src={Images.payment} alt='' />
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
  <Footer/>
</div>

  )
}

export default BookingRoomPayment