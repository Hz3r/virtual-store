import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import { Navigation } from "swiper/modules";

const SwiperMain = () => {
  return (
    <Swiper 
      navigation={true} 
      modules={[Navigation]} 
      className="mySwiper bg-amber-300 w-full h-full"
    >
      <SwiperSlide className="flex items-center justify-center">
        <div className="text-center">
          Slide 1
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center">
        <div className="text-center">
          Slide 2
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center">
        <div className="text-center">
          Slide 3
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center">
        <div className="text-center">
          Slide 4
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center">
        <div className="text-center">
          Slide 5
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center">
        <div className="text-center">
          Slide 6
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center">
        <div className="text-center">
          Slide 7
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center">
        <div className="text-center">
          Slide 8
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center">
        <div className="text-center">
          Slide 9
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperMain;
