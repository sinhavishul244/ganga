import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import { Pagination } from "swiper/modules";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
const SwiperCustom = () => {
    return (<>
        {/* <h1>Swiper</h1> */}
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={true}
            delay={500}
            // onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
        >
            <SwiperSlide>
                {/* text1 */}
                <div
                    className="image-container"
                    style={{
                        backgroundImage:
                            "url(https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-18032024-MainBannerDailyChanging-Z1-P1-HOLISPECIAL-4080.gif)",
                    }}
                ></div>
            </SwiperSlide>
            <SwiperSlide>
                {/* text 2 */}
                <div
                    className="image-container"
                    style={{
                        backgroundImage:
                            "url(https://publish-p33712-e119997.adobeaemcloud.com/content/dam/adityabirlafashionandretailprogram/homepage/fy-2023-2024/mar2024/1/202403-KurtaSets-D.jpg.transform/i1680x550/image.jpeg)",
                        // border: "2px solid red",
                    }}
                ></div>
            </SwiperSlide>
            <SwiperSlide>
                {/* text 3 */}
                <div
                    className="image-container"
                    style={{
                        backgroundImage:
                            "url(https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-18032024-MainBannerDailyChanging-Z1-P6-LEE-WRANGLER-MIN50.jpg)",
                    }}
                ></div>
            </SwiperSlide>
            <SwiperSlide>
                {/* text 4 */}
                <div
                    className="image-container"
                    style={{
                        backgroundImage:
                            "url(https://img-prd-pim.poorvika.com/cdn-cgi/image/width=1900,height=600,quality=75/pageimg/stay-connected-stay-smart-smartwatch-banner-web-2.jpg)",
                    }}
                ></div>
            </SwiperSlide>
            <SwiperSlide>
                {/* text 5 */}
                <div
                    className="image-container"
                    style={{
                        backgroundImage:
                            "url(https://img-prd-pim.poorvika.com/cdn-cgi/image/width=1900,height=600,quality=75/pageimg/Apple-MacBook-Air-M3-avaialble-at-poorvika-web-banner.jpg)",
                    }}
                ></div>
            </SwiperSlide>
        </Swiper>
    </>
    );
};

export default SwiperCustom;