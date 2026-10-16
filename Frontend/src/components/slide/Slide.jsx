import React from "react";
import "./Slide.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const Slide = ({ children, ...props }) => {
  return (
    <div className="slide">
      <div className="container">
        <Swiper modules={[Navigation]} {...props}>
          {React.Children.map(children, (child) => (
            <SwiperSlide key={child?.key}>
              {child}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slide;