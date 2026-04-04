"use client";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "../Assets/css/components/activity.css";
import Image from "next/image";
import { useState } from "react";

export default function Activity() {
  const images = [
    { id: 1, src: "/planting.png" },
    { id: 2, src: "/inspector.png" },
    { id: 3, src: "/education.png" },
  ];
  const imagesTitle = [
    {
      title: "PLANTIO EM CALÇADAS",
      desc: "Essa ação visa recuperar áreas degradadas, proteger recursos hídricos e arborizar áreas urbanas, fortalecendo a biodiversidade.",
    },
    {
      title: "FISCALIZAÇÃO CIDADÃ",
      desc: "importante para proteger o meio ambiente urbano e rural.",
    },
    {
      title: "EDUCAÇÃO AMBIENTAL",
      desc: "Visa conscientizar a importância de plantar mudas",
    },
  ];

  const [textActivity, setTextActivity] = useState("PLANTIO EM CALÇADAS");
  const [descActivity, setDescActivity] = useState(
    "Essa ação visa recuperar áreas degradadas, proteger recursos hídricos e arborizar áreas urbanas, fortalecendo a biodiversidade.",
  );

  function handleSlideChange(swiper: SwiperClass) {
    setTextActivity(imagesTitle[swiper.activeIndex].title);
    setDescActivity(imagesTitle[swiper.activeIndex].desc);
  }
  return (
    <>
      <div className="Container-activity">
        <div className="title">
          <p>ATIVIDADES DESENVOLVIDAS PELO ARBORIZA ITABORAÍ!</p>
        </div>

        <div className="box-carrosell">
          <div className="box-title">
            <h4>{textActivity}</h4>
            <span>{descActivity}</span>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            grabCursor={true}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSlideChange={handleSlideChange}
          >
            {images.map((img) => (
              <SwiperSlide key={img.id}>
                <Image
                  src={img.src}
                  width={200}
                  height={200}
                  alt={`Slide ${img.id}`}
                  draggable="false"
                  loading="eager"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
