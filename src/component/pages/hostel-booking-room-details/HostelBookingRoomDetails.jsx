import React, { useEffect, useState, useRef, useCallback } from 'react'
import Images from '../../common/images/Images'
import Header from '../../common/header/Header'
import Footer from '../../common/footer/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { roombook, roomdetail } from '../../../api/Global'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { User_Authentication } from '../../../user_authentication/User_Authentication'
import { Viewer, ImagePanorama } from "panolens";
import { ImageUrl } from '../../../config/Config'
import ReactPannellum, { getConfig } from "react-pannellum";
import Payment_Gateway from '../../../payment_gateway/Payment_Gateway'
import Loader from '../../../loader/Loader'

const HostelBookingRoomDetails = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [get_room_details, set_Get_room_details] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState('');
  console.log("selectedPaymentType", selectedPaymentType)
  const [roomPrice, setRoomPrice] = useState(0);
  const isUserLoggedIn = User_Authentication();

  // Handle click to log the config
  const handleClick = useCallback(() => {
    console.log(getConfig());
  }, []);

  // Config for the panorama viewer
  const config = {
    autoRotate: -2, // Automatically rotate the image
  };

  // Handle image click to open in modal
  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };


  useEffect(() => {
    const Handle_get_room_details = async () => {
      setIsLoading(true)
      try {
        if (id) {
          const response = await roomdetail(id);
          if (response?.data?.status == "200") {
            set_Get_room_details(response?.data?.data);
            setIsLoading(false)
          } else if (response?.response?.data?.status == "500") {
            setIsLoading(false)
            toast.error(response?.response?.data?.message)
          }
          else {
            setIsLoading(false)
          }
        }
        setIsLoading(false)
      } catch (error) {
        console.log("Error fetching room details:", error);
      }
    }

    Handle_get_room_details();
  }, [id]);
  console.log("get_room_details", get_room_details)


  const handlePaymentChange = (e) => {
    const selectedType = e.target.value;
    setSelectedPaymentType(selectedType);

    if (selectedType) {
      const selectedPaymentDetails = get_room_details?.room_detail?.room_payments?.find(
        (payment) => payment?.payment_type === selectedType
      );

      if (selectedPaymentDetails) {
        setRoomPrice(selectedPaymentDetails?.room_price);
      }
    } else {
      setRoomPrice(0); // Reset price when no valid option is selected
    }
  };



  const handle_room_book_now = async (status,payment_method,transaction_id) => {
    const formData = new FormData();
    formData.append('hostel_id', get_room_details.room_detail.hostel_id);
    formData.append('block_id', get_room_details.room_detail.blog_id);
    formData.append('floor_id', get_room_details.room_detail.floor_id);
    formData.append('room_id', get_room_details.room_detail.id);
    formData.append('transaction_id', transaction_id);
    formData.append('payment_method', "Online");
    formData.append('place', "room_book");
    formData.append('status',"success");
    formData.append('amount', roomPrice);
    formData.append('booking_period', selectedPaymentType);
    formData.append('notes', get_room_details?.room_detail?.notes);

    const token = User_Authentication();
    if (!token) {
      toast.error("User is not logged in.");
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    }
    try {
      const response = await roombook(formData, { Authorization: `Bearer ${token}` });
      if (response?.data?.status == "200") {
        toast.success(response?.data?.message);
      }
      else if (response?.response?.data?.status == "401") {
        toast.error(response?.response?.data?.message)
      }
    }
    catch (error) {
      console.log("error", error?.response?.data)
      if (error?.response?.data.status == "500") {
        toast.error(error?.response?.data?.message)
      }
    }
  }




  useEffect(() => {
    if (get_room_details?.room_detail?.room_images?.image) {
      const panoramaImageUrl = `${ImageUrl}${get_room_details?.room_detail?.room_images?.image}`;

      // Assuming ImagePanorama and Viewer are part of a panorama library you're using
      const panorama = new ImagePanorama(panoramaImageUrl); // Create the panorama viewer with the image URL
      const viewer = new Viewer({
        container: document.querySelector("#panorama-container"), // Set the container where the image will be displayed
      });

      viewer.add(panorama); // Add the panorama image to the viewer
    }
  }, [get_room_details, ImageUrl])

  const handlePaymentSuccess = ({ status,payment_method,transaction_id}) => {
    if (status === "success") {
      handle_room_book_now(status,payment_method,transaction_id);
    }
  };

  return (
    <div>
      {
        isLoading ? (
          <Loader />
        ) : (
          <>
            <Header />
            {/* <-------- ToastContainer ------------> */}
            <ToastContainer style={{ marginTop: "120px" }} />
            <div className="top_space pt-115" />
            <div className="booking_section">
              <div className="gi-register-wrapper container">
                <h4 className="mb-3 fw-bold">Hostel Details</h4>
                <div className="bg_basic_details position-relative p-3">
                  <div className="bg_transparent">
                    <div className="gi-login-box bg-transparent">
                      <div className="rounded card border-0 shadow-sm">
                        <div className="card-body hover_floor">
                          <div className="row">
                            <div className="col-md-6 col-lg-8">
                              <div className="rounded card border-0 border-end">
                                <div className="card-body room_feature position-relative">
                                  <h4 className="fw-bold">Room Features</h4>
                                  <ul className="mt-3">
                                    {
                                      get_room_details?.room_features?.map((get_room_details_result) => {
                                        return (
                                          <>
                                            <li><b>{get_room_details_result?.title} : </b>  {get_room_details_result?.description}</li>
                                          </>
                                        )
                                      })
                                    }
                                  </ul>
                                  <div className="mt-4">
                                    <div className="d-flex gap-3 align-items-center">
                                      <div className="col">
                                        <div className="input-group input-group-two left-icon mb-20">
                                          <label>Please select the booking type</label>
                                          <select name="guest" id="guest" style={{ display: 'flex' }} onChange={handlePaymentChange}
                                            value={selectedPaymentType}>
                                            <option value="" className='option selected focus'>-- Select --</option>
                                            {
                                              get_room_details?.room_detail?.room_payments?.map((get_payment_details_result) => {
                                                return (
                                                  <>
                                                    {
                                                      get_payment_details_result?.payment_type == "1year" && (
                                                        <option className='option' style={{ margin: "5px" }} key={get_payment_details_result.id} value={get_payment_details_result.payment_type}>
                                                          {get_payment_details_result?.payment_type == "1year" && <>1 Year</>}
                                                        </option>
                                                      )
                                                    }

                                                  </>
                                                )
                                              })
                                            }
                                          </select>
                                        </div>
                                      </div>
                                      {
                                        roomPrice > 0 && (
                                          <div className="col">
                                            <h6 className="fw-bold">Price Room</h6>
                                            <h4 className="text-danger fw-bold">Rs. {roomPrice || "0"}</h4>
                                          </div>
                                        )
                                      }
                                    </div>
                                    {!selectedPaymentType ? (
                                      <button
                                        className="btn btn-danger js-btn-next p-2 px-4 mt-2 text-white"
                                        type="button"
                                        disabled={!selectedPaymentType}
                                        onClick={handle_room_book_now} // Ensures user is logged in before booking
                                      >
                                        Book Now
                                      </button>
                                    ) : isUserLoggedIn ? ( // Show Payment Gateway only if the user is logged in
                                      <Payment_Gateway
                                        Price={roomPrice}
                                        onPaymentSuccess={handlePaymentSuccess}
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
                                    )}


                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-lg-4 my-auto">
                              <div className="rounded card border-0">
                                {/* <div className="card-body room_feature position-relative">
                            <img src={`${ImageUrl}${get_room_details?.room_detail?.room_images?.image}`} className="img-fluid rounded w-100" data-bs-toggle="modal" data-bs-target="#exampleModal" alt='' />
                            <div id="panorama-container" style={{ width: "100%", height: "500px" }} />
                            <button className="btn btn-danger js-btn-next p-2 px-4 mt-3 text-white" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">View Room</button>
                          </div> */}

                                <div>
                                  <ReactPannellum style={{ width: "100%", height: "400px" }}
                                    id="1"
                                    sceneId="firstScene"
                                    // imageSource="https://pannellum.org/images/alma.jpg"
                                    imageSource="https://pannellum.org/images/alma.jpg"
                                    config={config}
                                  />
                                </div>
                                {/* <div className="card-body room_feature position-relative">
                            <div id="panorama-container" style={{ width: "100%", height: "500px" }} />
                            <button
                              className="btn btn-danger js-btn-next p-2 px-4 mt-3 text-white"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            >
                              View Room
                            </button>
                          </div> */}
                              </div>
                            </div>
                            {
                              get_room_details?.room_detail?.room_images?.map((room_images_result) => {
                                return (
                                  <div className="col-md-6 col-lg-4 col-sm-12 my-auto mt-5">
                                    <div className="image-gallery-item">
                                      <img
                                        src={`${ImageUrl}${room_images_result?.image}`}  
                                        alt="Image 1" 
                                        className="img-fluid rounded shadow"
                                        onClick={() => handleImageClick(`${ImageUrl}${room_images_result?.image}`)}
                                        style={{ cursor: 'pointer',width:"100%",height:"300px" }}
                                      />
                                    </div>
                                  </div>
                                )
                              })
                            }

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />

            {selectedImage && (
              <div
                className="modal fade show"
                id="imageModal"
                tabIndex="-1"
                aria-labelledby="imageModalLabel"
                aria-hidden={selectedImage ? 'false' : 'true'}
                style={{ display: 'block' }} // Show modal if image is selected
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => setSelectedImage(null)} // Close the modal
                      ></button>
                    </div>
                    <div className="modal-body">
                      <img src={selectedImage} alt="Selected" className="img-fluid" style={{ width: "100%", height: "100%" }} />
                    </div>
                  </div>
                </div>
              </div>
            )}


            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-fullscreen modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                  </div>
                  <div className="modal-body p-0">
                    <div className="Panorama_view" id="container" />
                    <div className="Panorama_view" id="loadFill" />
                    <div className="Panorama_view" id="cover" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }


    </div>

  )
}

export default HostelBookingRoomDetails