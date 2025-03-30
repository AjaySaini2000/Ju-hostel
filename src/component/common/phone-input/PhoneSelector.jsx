import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PhoneSelector = (props) => {

  
  const{phnumber,phoneInput}=props
  const options = {
    country: 'us',
    preferredCountries: ['in', 'us', 'gb'],
    enableSearch:true
  }
  return (
    <div>
      <PhoneInput
        {...options}
        placeholder="Phone Number"
        className="custom-phone-input"
        // value={phnumber}
        name='phnumber'
        onChange={(value) => {
          phoneInput(value); 
        }}
      />
      
    </div>
  )
}

export default PhoneSelector