import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/controller';
import { Navigation, Pagination, Autoplay, Controller } from 'swiper/modules';
import { Link } from 'react-router-dom';
import mainSlider from './scss/srh.module.scss';
import slidesData from '../json/maindata.json';

const MainSlider = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [bgColor, setBgColor] = useState(slidesData[0].bgcolor);
  const progressBarRef = useRef(null);
  const textSwiperRef = useRef(null);
  const imgSwiperRef = useRef(null);
  const mainsliderobjRef = useRef(null);

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = '100%';
      progressBarRef.current.style.transition = `width 5000ms linear`;
    }
  }, [isPlaying]);

  const handleSlideChange = (swiper) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const bgcolor = activeSlide.dataset.bgcolor;
    setBgColor(bgcolor);

    if (isPlaying) {
      if (progressBarRef.current) {
        progressBarRef.current.style.transition = 'none';
        progressBarRef.current.style.width = '0%';
        setTimeout(() => {
          progressBarRef.current.style.transition = `width 5000ms linear`;
          progressBarRef.current.style.width = '100%';
        }, 0);
      }
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      if (textSwiperRef.current && textSwiperRef.current.swiper) {
        textSwiperRef.current.swiper.autoplay.stop();
      }
      if (imgSwiperRef.current && imgSwiperRef.current.swiper) {
        imgSwiperRef.current.swiper.autoplay.stop();
      }
    } else {
      if (textSwiperRef.current && textSwiperRef.current.swiper) {
        textSwiperRef.current.swiper.autoplay.start();
      }
      if (imgSwiperRef.current && imgSwiperRef.current.swiper) {
        imgSwiperRef.current.swiper.autoplay.start();
      }
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section ref={mainsliderobjRef} className={`${mainSlider.mainslider} overflow-hidden`} style={{ backgroundColor: bgColor }}>
      <div className={`${mainSlider.mainwrapper} d-flex justify-content-center start-50 position-relative`}>
        <div className={`${mainSlider.mainTextbox} d-flex mx-0 position-relative`}>
          <Swiper
            ref={textSwiperRef}
            spaceBetween={0}
            loop={true}
            loopAdditionalSlides={2}
            pagination={{
              el: ".mainPagebox .numberui",
              type: 'fraction',
              formatFractionCurrent: number => ('0' + number).slice(-2),
              formatFractionTotal: number => ('0' + number).slice(-2),
            }}
            navigation={{
              nextEl: ".mainPagebox .button_next",
              prevEl: ".mainPagebox .button_prev",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Pagination, Autoplay, Controller]}
            onSlideChange={(swiper) => handleSlideChange(swiper)}
          >
            {slidesData.map((slide, index) => (
              <SwiperSlide key={index} className={mainSlider.mainSlidetext} data-bgcolor={slide.bgcolor}>
                <p className="mb-3 px-2 d-inline-flex w-auto">{slide.description}</p>
                <strong className="d-block">{slide.title.split('|')[0]}<br />{slide.title.split('|')[1]}</strong>
                <Link to={slide.link} className={`${mainSlider.text_with_underline} d-block mt-3`}>자세히보기</Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="col overflow-hidden position-relative">
          <div className={`${mainSlider.mainImgbox} mx-0 overflow-visible`}>
            <Swiper
              className={mainSlider.visible}
              ref={imgSwiperRef}
              spaceBetween={30}
              loop={true}
              loopAdditionalSlides={2}
              pagination={{
                el: ".mainPagebox .swiper-progress-bar .fill",
              }}
              slidesPerView={1}
              modules={[Navigation, Pagination, Autoplay, Controller]}
              onSlideChange={(swiper) => handleSlideChange(swiper)}
            >
              {slidesData.map((slide, index) => (
                <SwiperSlide key={index}>
                  <Link to={slide.link}>
                    <img src={slide.imgSrc} alt={slide.imgAlt} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className={`${mainSlider.mainPagebox} d-flex align-items-center`}>
          <div className="Page d-flex align-items-centern justify-content-between">
            <div className={`swiper_pagination ${mainSlider.swiper_progress_bar} d-flex align-items-center col`}>
              <span className={mainSlider.slide_progress_bar}>
                <span className={mainSlider.fill} ref={progressBarRef}></span>
              </span>
            </div>
            <div className={`swiper_pagination ${mainSlider.numberui} d-flex align-items-center`}></div>
            <div className={`${mainSlider.btn} d-flex align-items-center justify-content-between`}>
              <div className={mainSlider.button_prev}>
                <span className="visually-hidden">이전</span>
              </div>
              <div className={mainSlider.button_auto}>
                <button className={mainSlider.button_autoControl} onClick={togglePlayPause}>
                  <span className="visually-hidden">{isPlaying ? '멈춤' : '재생'}</span>
                </button>
              </div>
              <div className={mainSlider.button_next}>
                <span className="visually-hidden">다음</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSlider;
