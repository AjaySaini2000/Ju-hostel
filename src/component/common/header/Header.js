import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Images from '../images/Images'
import { User_Authentication } from '../../../user_authentication/User_Authentication'
import { toast } from "react-toastify";
import { logOut, userProfile } from '../../../api/Auth'
import { settings } from '../../../api/Global';
import { ImageUrl } from '../../../config/Config';

const Header = (props) => {
  const { compo } = props

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isToggleMenu, setIsToggleMenu] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [userprofile, setUserprofile] = useState({})
  console.log("userprofile",userprofile)
  const [get_settings, set_Get_Settings] = useState({});
  // const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const toggleMenu = () => {
    setIsToggleMenu(!isToggleMenu)
  }
  useEffect(() => {
    const loginStatus = localStorage.getItem('user_is_active')
    // console.log(loginStatus);
    setLoginStatus(loginStatus)

  })
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = User_Authentication();
        if (!token) {
          // toast("token not found")
          // console.log("token not found");
          throw new Error("user token not found");

        }
        const response = await userProfile({ Authorization: `Bearer ${token}` });
        // console.log(response);
        if (response?.data?.status === true) {
          setUserprofile(
            response?.data?.data
          );
        }
      } catch (error) {
        // toast(error.message)
      }
    }
    fetchUserProfile()
  }, [])
  useEffect(() => {
    // Function to update menu state based on screen size
    const handleResize = () => {
      // Check if screen width is greater than medium (e.g., 768px)
      if (window.innerWidth > 991) {
        setIsMenuOpen(false);
        setIsToggleMenu(false)

      }
      else {
        setIsMenuOpen(true);
      }
    };
    handleResize();
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const Handle_get_settings = async () => {
      // setIsLoading(true)
      try {
        const response = await settings()
        if (response?.data?.status == "200") {
          set_Get_Settings(response?.data?.data?.setting)
          // setIsLoading(false)
        }
      }
      catch (error) {
        // setIsLoading(false)
      }
    }
    Handle_get_settings();
  }, [])

  const handleLogOut = async () => {
    try {
      const token = User_Authentication();
      if (!token) {
        // toast("token not found")
        console.log("token not found");
        return
      }
      const response = await logOut({ Authorization: `Bearer ${token}` });
      // console.log("gh",response);
      if (response?.data?.status == "200") {

        toast.success(response?.data?.message)
        localStorage.clear();
        navigate('/login')
      } else if (response?.response?.data?.status == "500") {
        toast.error(response?.response?.data?.message)
      }
    } catch (error) {
      console.log("arror", error.message);
      toast.error(error.message)
    }



  }
  return (
    <>

      {/* // ====== HEADER START ====== */}
      <header className="header-absolute sticky-header">
        <div className="container container-custom-two">
          <div className={`nav-container d-flex align-items-center justify-content-between ${isMenuOpen && 'breakpoint-on'}`}>
            {/* Main Menu   */}
            {/* Site Logo  */}
            <div className="site-logo">
              <Link to="/" className="h3 fw-bold text-dark">{
                get_settings[0]?.footer_logo != null ? (
                  <img src={`${ImageUrl}${get_settings[0]?.footer_logo}`} alt="Logo" style={{ width: "200px", height: "40px" }}></img>
                ) : (
                  <h2 className="fw-bold">Ju Hostel</h2>
                )
              }</Link>
            </div>
            <div className={`nav-menu d-lg-flex align-items-center ${isToggleMenu && 'menu-on'}`}>
              {/* Navbar Close Icon  */}

              {/* Mneu Items */}
              <div className="menu-items">
                <ul>
                  <li>
                    <Link to="/hostel_booking">Room Booking</Link>
                  </li>
                  <li>
                    <Link to="/transport_booking">Transport Booking</Link>
                  </li>
                  <li>
                    <Link to="/hostel_fees">Fee Structure</Link>
                  </li>
                  <li><Link to="/news_list">News</Link></li>
                  <li><Link to="/contact_us">Contact Us</Link></li>
                </ul>
              </div>
              {/* from pushed-item */}
              <div className="nav-pushed-item" >
                {
                  // compo==="hostelbooking" || compo==="my_transport_booking" ||compo==="mybooking" 
                  loginStatus
                    ?
                    <>
                      <div className="header-info gap-3 d-lg-flex align-items-center">
                      </div>
                      <nav className="navbar dropdown_menu menu-items">
                        <div className="dropdown">
                          <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {

                            }
                            <img src={userprofile?.profileImage || Images.author} className="rounded-circle me-2" width={40} height={40} alt='' /> {userprofile?.name}
                          </button>
                          <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/my_booking">My Booking</Link></li>
                            <li><Link className="dropdown-item" to="/my_transport_booking">My Transport</Link></li>
                            <li><Link className="dropdown-item" onClick={() => { handleLogOut() }}>Log Out</Link></li>
                          </ul>
                        </div>
                      </nav>
                    </>
                    :
                    <div className="header-info gap-3 d-lg-flex align-items-center">
                      <Link to="/login">Login</Link>
                      <Link to="/register" className="btn btn-danger">Registration</Link>
                    </div>
                }
              </div>
            </div>
            {/* Header Info Pussed To Menu Wrap */}
            <div className={`nav-push-item ${isMenuOpen ? 'd-none' : 'd-block'}`}>
              {/* Header Info */}
              {
                // compo==="hostelbooking" || compo==="my_transport_booking" ||compo==="mybooking" 
                loginStatus
                  ?
                  <>
                    <div className="header-info gap-3 d-lg-flex align-items-center">
                    </div>
                    <nav className="navbar dropdown_menu menu-items">
                      <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <img src={userProfile?.profileImage || Images.author} className="rounded-circle me-2" width={40} height={40} alt='' />{userprofile?.name || ""}
                        </button>
                        <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" to="/my_booking">My Booking</Link></li>
                          <li><Link className="dropdown-item" to="/my_transport_booking">My Transport</Link></li>
                          <li><Link className="dropdown-item" onClick={() => { handleLogOut() }}>Log Out</Link></li>
                        </ul>
                      </div>
                    </nav>
                  </>
                  :
                  <div className="header-info gap-3 d-lg-flex align-items-center">
                    <Link to="/login">Login</Link>
                    <Link to="/register" className="btn btn-danger">Registration</Link>
                  </div>
              }
            </div>
            {/* Navbar Toggler */}
            <div className={`navbar-toggler ${isToggleMenu && 'active'}`} onClick={() => { toggleMenu() }}>
              <span /><span /><span />
            </div>
          </div>
        </div>
      </header>
      {/* // ====== HEADER PART END ====== */}
    </>
  )
}

export default Header