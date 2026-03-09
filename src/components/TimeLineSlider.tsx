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
    if(!swiperRef.current) return
    setIsBeginning(swiperRef.current.swiper.isBeginning);
    setIsEnd(swiperRef.current.swiper.isEnd)

    const el = document.querySelector(".timeline_slider")
    if (!el) return
    gsap.killTweensOf(el)
    gsap.set(el, { opacity: 1, y: 0 })

    gsap.from(".timeline_slider", {
      opacity: 0,
      delay: 0.5,
      y: 20,
      duration: 0.5,
      ease: "power2.out"
    })

    return ()=> {
      gsap.killTweensOf(el)
      swiperRef.current?.swiper.slideTo(0)
    }
  },[events])


  return (
    <div className="timeline_slider">
      <div className="swiper_container">
        <button disabled={isBeginning} onClick={() => swiperRef.current?.swiper.slidePrev()}><ArrowLeftIcon/></button>
        
        <Swiper
          ref={swiperRef}
          touchEventsTarget="container"
          breakpoints={{
            0: {
              spaceBetween: 20,   
            },
            1440: {
              spaceBetween: 80,   
            },
          }}
          slidesPerView={'auto'}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          freeMode={true}                   
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