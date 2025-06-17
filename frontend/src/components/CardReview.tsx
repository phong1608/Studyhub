"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import Image from "next/image";
import { slides } from "@/constants/dataReview";

const animation = { duration: 20000, easing: (t: number) => t };

const CardReview = () => {

  //   const [hovered, setHovered] = useState(false);
  //   const animation = {
  //     duration: hovered ? 70000 : 20000,
  //     easing: (t: number) => t,
  //   };

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    slides: {
      perView: 3,
      spacing: 0, 
    },
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 10, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 10, true, animation);
    },
  });

  return (
    <ul className="flex items-start justify-start ">
      {/* <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white to-transparent pointer-events-none"></div> */}

      <div
        ref={sliderRef}
        className="keen-slider "
        // onMouseEnter={() => setHovered(true)}
        // onMouseLeave={() => setHovered(false)}
      >
        {slides.map((slide) => (
          <li
            key={slide.id}
            className={`keen-slider__slide number-slide${slide.id}`}
          >
            <div className="flex flex-col p-8 gap-6">
              <div className="flex flex-row gap-6">
                <Image
                  src={slide.img}
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-lg bg-red-600 w-[50px] h-[50px]"
                />
                <div className="flex flex-col ">
                  <div className="font-bold	text-lg">{slide.name}</div>
                  <div className="text-lg">{slide.postion}</div>
                </div>
              </div>
              <p className="text-lg">{slide.review}</p>
            </div>
          </li>
        ))}
      </div>
      {/* <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div> */}

    </ul>
  );
};

export default CardReview;
