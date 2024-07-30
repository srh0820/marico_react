import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/swiper-bundle.min.css'; // Swiper 스타일 추가

import snsscss from '../scss/srh.module.scss'; 
import imgIndices from '../../json/snsImgdata.json';

function SnsImg() {
    const [isGrid, setIsGrid] = useState(window.innerWidth > 1024);

    // 호버 이벤트 핸들러
    const handleHover = (index) => {
        document.querySelectorAll(".hoverimgaction > div").forEach((v, i) => {
            if (i !== index) {
                v.classList.add(snsscss.blurred);
            } else {
                v.classList.remove(snsscss.blurred);
            }
        });
    };

    // 블러 제거
    const handleRemoveBlur = () => {
        document.querySelectorAll(".hoverimgaction > div").forEach((v) => {
            v.classList.remove(snsscss.blurred);
        });
    };

    // 태블릿사이즈
    useEffect(() => {
        const handleResize = () => {
            setIsGrid(window.innerWidth > 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="{snsscss.sns} container-1400">
            {isGrid ? (
                <div className="row d-flex align-items-stretch">
                    {imgIndices.images.map((index, i) => (
                        <div
                            key={index}
                            className="col-lg-3 col-md-6 mb-4 hoverimgaction"
                            onMouseEnter={() => handleHover(i)}
                            onMouseLeave={handleRemoveBlur}
                        >
                            <div className={`${snsscss.snsImgR} d-flex justify-content-center align-items-center`}>
                                <img src={index} alt={`인스타그램 이미지 ${i}번`} className="img-fluid" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // tablet
                <div className={snsscss.tablet}>
                    <Swiper
                        spaceBetween={20}
                        loop={true}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                    >
                        {imgIndices.images.map((index, i) => (
                            <SwiperSlide key={index}>
                                <div>
                                    <div className={`${snsscss.snsImgR} d-flex justify-content-center align-items-center`}>
                                        <img src={index} alt={`인스타그램 이미지 ${i}번`} className="img-fluid" />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
}

export default SnsImg;
