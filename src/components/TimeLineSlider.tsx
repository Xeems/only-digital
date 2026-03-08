import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import  ArrowRightIcon  from "../images/chevron-right.svg"
import  ArrowLeftIcon  from "../images/chevron-left.svg"
import "swiper/css"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

interface Event {
  year: number
  text: string
}

interface Props {
  events: Event[]
}

export default function TimelineSlider({ events }: Props) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);  
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(()=> {
    gsap.from(".timeline_slider", {
      opacity: 0,
      delay: 0.6,
      y: 20,
      duration: 0.5,
      ease: "power2.out"
    })

    return ()=> {
      gsap.to(".timeline_slider", {
      opacity: 0,
      y: 20,
      duration: 0.6
    })
    }
  },[events])


  return (
    <div className="timeline_slider">

      <div className="swiper_container">
        <button disabled={isBeginning} onClick={() => swiperRef.current?.swiper.slidePrev()}><ArrowLeftIcon/></button>
        
        <Swiper
        ref={swiperRef}
        spaceBetween={30}
        slidesPerView={3}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSwiper={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
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

        <button disabled={isEnd} onClick={() => swiperRef.current?.swiper.slideNext()}><ArrowRightIcon/></button>
      </div>
    </div>  
  )
}