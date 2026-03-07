import { Swiper, SwiperSlide } from "swiper/react"
import  ArrowRightIcon  from "../images/chevron-right.svg"
import  ArrowLeftIcon  from "../images/chevron-left.svg"
import "swiper/css"
import { useRef, useState } from "react"

interface Event {
  year: number
  text: string
}

interface Props {
  events: Event[]
}

export default function TimelineSlider({ events }: Props) {
   const [lastSlide, setLastSlide] = useState<number>(0)
   const swiperRef = useRef<any>(null);

  return (
    <div className="timeline_slider">
      {/* <span>{String().padStart(lastSlide, "0")} / {swiperRef.current?.swiper.slides.length}</span> */}
      <div className="timline_slider_navigation">
          <button onClick={() => swiperRef.current?.swiper.slidePrev()}><ArrowLeftIcon/></button>
          <button onClick={() => swiperRef.current?.swiper.slideNext()}><ArrowRightIcon/></button>
      </div>

      <div className="swiper_container">
        <button onClick={() => swiperRef.current?.swiper.slidePrev()}><ArrowLeftIcon/></button>
        
        <Swiper
        ref={swiperRef}
        spaceBetween={30}
        slidesPerView={3}
        onSlideChange={(swiper) => {
          let slidesPerView = swiper.params.slidesPerView;
          if (typeof slidesPerView !== "number") slidesPerView = 1;
          const lastVisibleIndex = swiper.activeIndex + slidesPerView;
          setLastSlide(lastVisibleIndex)
        }}
        >
          {events.map((e, i) => (
            <SwiperSlide key={i}>
              <div className="event">
                <h3>{e.year}</h3>
                <p>{e.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button onClick={() => swiperRef.current?.swiper.slideNext()}><ArrowRightIcon/></button>
      </div>
    </div>  
  )
}