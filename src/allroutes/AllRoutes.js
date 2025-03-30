import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../component/pages/home/Home'
import Login from '../auth/Login'
import Register from '../auth/Register'
import HostelBooking from '../component/pages/hostel-booking/HostelBooking'
import TransportBooking from '../component/pages/transport-booking/TransportBooking'
import HosteFees from '../component/pages/hostel-fees/HostelFees'
import NewsList from '../component/pages/news-list/NewsList'
import ContactUs from '../component/pages/contact-us/ContactUs'
import HostelBookingRoom from '../component/pages/hostel-booking-room/HostelBookingRoom'
import TransportBookingList from '../component/pages/transport-booking-list/TransportBookingList'
import NewsDetails from '../component/pages/news-details/NewsDetails'
import HostelBookingRoomDetails from '../component/pages/hostel-booking-room-details/HostelBookingRoomDetails'
import BookingRoomPayment from '../component/pages/booking-room-payment/BookingRoomPayment'
import TransportPayment from '../component/pages/transport-payment/TransportPayment'
import MyBooking from '../component/pages/my-booking/MyBooking'
import MyTransportBooking from '../component/pages/my-transport-booking/MyTransportBooking'
import TermsConditions from '../component/pages/terms-conditions/TermsConditions'
import PrivacyPolicy from '../component/pages/privacy-policy/PrivacyPolicy'
import HostelRules from '../component/pages/hostel-rules/HostelRules'
import RegisterOtp from '../auth/register-otp/RegisterOtp'
import LoginOtp from '../auth/register-otp/LoginOtp'


const AllRoutes = () => {
  return (
    <div>
      <Routes >

      <Route path ="/login" element={<Login/>}/>
      <Route path ="/register" element={<Register/>}/>
        
        <Route path="/" element={<Home/>}>

        </Route>
        
        <Route path ="/hostel_booking" element={<HostelBooking/>}/>
        <Route path="/transport_booking" element={<TransportBooking/>}/>
        <Route path="/hostel_fees" element={<HosteFees/>}/>
        <Route path="/news_list" element={<NewsList/>}/>
        <Route path="/contact_us" element={<ContactUs/>}/>

        <Route path="/hostel_rules" element={<HostelRules/>}/>

        <Route path="/hostel_booking_room/:id" element={<HostelBookingRoom/>}/>
        <Route path="/transport_booking_list" element={<TransportBookingList/>}/>
        <Route path="/news_details/:id" element={<NewsDetails/>}/>
        <Route path="/hostel_booking_room_details/:id" element={<HostelBookingRoomDetails/>}/>
        <Route path="/booking_room_payment" element={<BookingRoomPayment/>}/>
        <Route path="/transport_payment" element={<TransportPayment/>}/>
        <Route path="/my_booking" element={<MyBooking/>}/>
        <Route path="/my_transport_booking" element={<MyTransportBooking/>}/>
        <Route path="/terms_conditions" element={<TermsConditions/>}/>
        <Route path="/privacy_policy" element={<PrivacyPolicy/>}/>
        <Route path="/register-otp" element={<RegisterOtp/>}/>
        <Route path="/login-otp" element={<LoginOtp/>}/>
        

      </Routes>
    </div>
  )
}

export default AllRoutes