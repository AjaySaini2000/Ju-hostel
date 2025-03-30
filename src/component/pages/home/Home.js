import React, { useLayoutEffect, useState } from 'react'
import Header from '../../common/header/Header'
import Images from '../../../component/common/images/Images'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import Footer from '../../common/footer/Footer'
import Gallery from '../../common/gallery/Gallery'
import { homeData } from "../../../api/Global"
import { ImageUrl } from '../../../config/Config'
import Loader from '../../../loader/Loader'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [hostels, setHostels] = useState([])
  const [gallery, setGallery] = useState([])
  const [news, setNews] = useState([])
  const [role, setRole] = useState([])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    arrows: false,
  };
  useLayoutEffect(() => {
    const fetchHomeData = async () => {
      setIsLoading(true)
      try {
        const response = await homeData();
        console.log(response);
        if (response?.data?.status === 200) {
          setIsLoading(false)
          setHostels(response?.data?.data?.hostels
          )
          setGallery(response?.data?.data?.
            gallery
          )
          setNews(response?.data?.data?.
            news
          )
          setRole(response?.data?.data?.
            role
          )
        }

      } catch (error) {
        setIsLoading(false)
        console.log(error.message);

      }
    }
    fetchHomeData()
  }, [])

  console.log("hostels", hostels);
  console.log("gallery", gallery);
  console.log("news", news);
  console.log("role", role);

  return (
    <>
      {/* HEADER START */}
      <Header />
      {/* HEADER END */}

      {/* --====== BANNER PART START ======-- */}
      {
        isLoading ? <Loader /> :
          <div>
            <section className="banner-area banner-style-one">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-6">
                    <div className="banner-content">
                      <h1 data-aos="fade-right" className="title wow fadeInLeft" data-aos-delay="500"> Book your Hostel
                        Anywhere, Anytime</h1>
                      <span data-aos="fade-down" className="promo-tag wow fadeInDown" data-aos-delay="300">With Just your smart phone, you can
                        book any hostel in navrongo and pay with momo </span>
                      <ul>
                        <li>
                          <Link data-aos="fade-up" className="main-btn btn-filled wow fadeInUp" data-aos-delay="700" to="/hostel_booking">Get
                            Started</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div data-aos="fade-left" className="col-lg-6 col-md-6 wow fadeInRight" data-aos-delay="500">
                    <div className="banner-thumb d-none d-md-block">
                      <div className="hero-slider-one">
                        <Slider {...settings}>
                          <div className="single-thumb">
                            <img src={Images.banner_01} height={500} width="100%" alt="images" />
                          </div>
                          <div className="single-thumb">
                            <img src={Images.banner_02} height={500} width="100%" alt="images" />
                          </div>
                        </Slider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/*====== BANNER PART ENDS ======*/}
            {/*====== 	HOSTEL TYPE START ======*/}
            <section className="room-type-section bg-light pt-70 pb-70">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="section-title text-lg-left">
                      <span className="title-tag">Hostel List</span>
                      <h2>Hostel &amp; Rooms</h2>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <ul className="room-filter nav nav-pills justify-content-center justify-content-lg-end" id="room-tab" role="tablist">
                      <li className="nav-item">
                        <Link className="nav-link active" id="relex-tab" data-bs-toggle="pill" to="#relex">
                          Hostels
                        </Link>
                      </li>
                      {/* <li className="nav-item">
                        <Link className="nav-link" id="luxury-tab" data-bs-toggle="pill" to="#luxury">
                          Rooms
                        </Link>
                      </li> */}
                    </ul>
                  </div>
                </div>
                <div className="tab-content mt-65" id="room-tabContent">
                  <div className="tab-pane fade show active" id="relex" role="tabpanel">
                    <div className="room-items">
                      <div className="row">
                        {hostels?.slice(0,3)?.map((hostel) => (
                          <div className="col-lg-4" key={hostel.id}>
                            <div className="room-box extra-height">
                              <div className="room-bg">

                                <img src={`${ImageUrl}${hostel?.images?.image}`} className="reel" id="image2d" data-stitched={496} data-frames={30} data-frame={15} data-spacing={5} data-rows={3} data-row={2} data-loops="false" alt='' />
                              </div>
                              <div className="room-content">
                                <h3><Link to="#">{hostel?.name}</Link></h3>
                                <span className="room-count"><i className="flaticon-location-pin" />{hostel?.address}</span>
                              </div>
                              {/* <Link to="#" className="room-link"><i className="fal fa-arrow-right" /></Link> */}
                            </div>
                          </div>
                        ))}


                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade " id="luxury" role="tabpanel">
                    <div className="room-items">
                      <div className="row">
                        {hostels?.map((hostel) => (
                          <div className="col-lg-4" key={hostel.id}>
                            <div className="room-box extra-height">
                              <div className="room-bg">

                                <img src={`${ImageUrl}${hostel?.images?.image}`} className="reel" id="image2d" data-stitched={496} data-frames={30} data-frame={15} data-spacing={5} data-rows={3} data-row={2} data-loops="false" alt='' />
                              </div>
                              <div className="room-content">
                                <h3><Link to="#">{hostel?.name}</Link></h3>
                                <span className="room-count"><i className="flaticon-location-pin" />{hostel?.address}</span>
                              </div>
                              {/* <Link to="#" className="room-link"><i className="fal fa-arrow-right" /></Link> */}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/*====== HOSTEL TYPE END ======*/}
            {/* Hostel rooms */}
            <section className="text-block with-bg pt-70 pb-70">
              <div className="container">
                <div className="row align-items-center justify-content-center justify-content-lg-between">
                  <div data-aos="fade-left" className="col-lg-4 col-md-6 wow fadeInRight" data-aos-delay="500">
                    <div className="video-wrap">
                      <img src={Images.hostel_02} alt='hostel_02' />
                    </div>
                  </div>
                  <div data-aos="fade-right" className="col-lg-8 col-md-6 wow fadeInLeft" data-aos-delay="300">
                    <div className="block-text mb-small pl-20">
                      <div className="section-title mb-20">
                        <span className="title-tag">Hostel Rooms</span>
                        <h2>Types of Hostel Rooms</h2>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <div className="d-flex gap-1 align-items-center dorm_room">
                            <img src={Images.hostel_dorm} alt='' />
                            <div>
                              <h4>Dorm</h4>
                              <p>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex gap-1 align-items-center dorm_room">
                            <img src={Images.hostel_doublebed} alt='' />
                            <div>
                              <h4>Double bed dorm rooms </h4>
                              <p>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex gap-1 align-items-center dorm_room">
                            <img src={Images.hostel_alternative} alt='' />
                            <div>
                              <h4>Alternative dorms</h4>
                              <p>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link to="/hostel_booking" className="main-btn btn-filled mt-40">Room Booking</Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* hostel rooms */}
            {/* Transport Booking */}
            <section className="text-block with-bg pt-70 pb-70">
              <div className="container">
                <div className="row align-items-center justify-content-center justify-content-lg-between">
                  <div data-aos="fade-right" className="col-lg-7 col-md-6 wow fadeInLeft" data-aos-delay="300">
                    <div className="block-text mb-small pr-20">
                      <div className="section-title mb-20">
                        <span className="title-tag">Transport</span>
                        <h2>Transport Booking</h2>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <div className="d-flex gap-1 align-items-center dorm_room">
                            <img src={Images.hostel_route} alt='' />
                            <div>
                              <h4>Route and timing</h4>
                              <p>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex gap-1 align-items-center dorm_room">
                            <img src={Images.hostel_bus} alt='' />
                            <div>
                              <h4>Bus Availability Status</h4>
                              <p>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link to="/transport_booking" className="main-btn btn-filled mt-40">Transport Booking</Link>
                    </div>
                  </div>
                  <div data-aos="fade-left" className="col-lg-5 col-md-6 wow fadeInRight" data-aos-delay="500">
                    <div className="video-wrap">
                      <img src={Images.hostel_03} alt='' />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Transport Booking */}
            {/* Services */}
            <section className="text-block with-bg pt-70 pb-70">
              <div className="container">
                <div className="row align-items-center justify-content-center justify-content-lg-between">
                  <div data-aos="fade-left" className="col-lg-5 col-md-6 wow fadeInRight" data-aos-delay="500">
                    <div className="video-wrap">
                      <img src={Images.hostel_04png} alt='' />
                    </div>
                  </div>
                  <div data-aos="fade-right" className="col-lg-7 col-md-6 wow fadeInLeft" data-aos-delay="300">
                    <div className="block-text mb-small pl-20">
                      <div className="section-title mb-20">
                        <span className="title-tag">Services</span>
                        <h2>We Can Assist you with a variety of Services</h2>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <div className="d-flex gap-1 align-items-center dorm_room">
                            <img src={Images.hostel_map} alt='' />
                            <div>
                              <h4>Map &amp; Directions</h4>
                              <p>Our hostel is located in the downtown and not too far from airport and bus
                                station so it is quite easy to find us wherever you come from.</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex gap-1 align-items-center dorm_room">
                            <img src={Images.hostel_accommodation} alt='' />
                            <div>
                              <h4>Accommodation services</h4>
                              <p>Visit Hostel provides high-quality accommodation services to clients that
                                come to our city from all over the world throughout the year.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="d-flex gap-1 align-items-center dorm_room">
                            <img src={Images.hostel_great} alt='' />
                            <div>
                              <h4>Great experience</h4>
                              <p>With qualified and friendly staff and high level of comfort, we are sure you
                                will have a great experience of staying at the
                                Visit Hostel.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Services */}
            {/* gallery section */}
            <div className="banner-area bg-light pt-70 pb-70">
              <div className="container">
                <div className="row align-items-center justify-content-center justify-content-lg-between">
                  <div data-aos="fade-right" className="col-lg-12 col-md-12 text-center wow fadeInLeft" data-aos-delay="300">
                    <div className="block-text mb-small pl-20">
                      <div className="section-title mb-20">
                        <span className="title-tag">Our Gallery</span>
                        <h2>Explore Now</h2>
                      </div>
                    </div>
                  </div>
                  <div data-aos="fade-right" className="col-lg-12 col-md-12 text-center wow fadeInLeft" data-aos-delay="300">
                    <Gallery galleries={gallery} />
                  </div>
                </div>
              </div>
            </div>
            {/* gallery section end */}
            <div className="clear-fix" />
            {/*====== LATEST NEWS START ======*/}
            <section className="latest-news bg-white pt-70 pb-70">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-12 text-center">
                    <div className="section-title">
                      <span className="title-tag">News</span>
                      <h2>Our Latest News</h2>
                    </div>
                  </div>
                </div>
                {/* Latest post loop */}
                <div className="row mt-40">
                  {news?.map((newses) => {
                    const formattedDate = new Date(newses?.created_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,
                    });
                    return (
                      <div className="col-lg-4">
                        <Link to={`/news_details/${newses?.id}`}>
                          <div className="latest-post-box">
                            <div className="post-img">
                              <img src={`${ImageUrl}${newses?.image}`} style={{ width: "100%", height: "300px" }} alt='' />
                            </div>
                            <div className="post-desc">
                              <ul className="post-meta">
                                <li>
                                  <p><i className="fal fa-calendar-alt me-2" />{formattedDate
                                  }</p>
                                </li>
                              </ul>
                              <h4><Link to={`/news_details/${newses?.id}`}>{newses?.title}</Link></h4>
                              <p className="text-truncate-3 text-black">
                                {newses?.short_description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
            {/*====== LATEST NEWS END ======*/}
          </div>
      }
      <Footer />
    </>
  )
}

export default Home