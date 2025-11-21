import { useEffect, useRef } from "react";
import "./CampSlideshow.css";

export default function CampSlideshow({ images = [] }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let scrollAmount = 0;

    const autoScroll = () => {
      scrollAmount += 0.6; // speed
      track.scrollLeft = scrollAmount;

      // loop back when reaching end
      if (scrollAmount >= track.scrollWidth - track.clientWidth) {
        scrollAmount = 0;
      }

      requestAnimationFrame(autoScroll);
    };

    autoScroll();
  }, []);

  return (
    <div className="slideshow-wrapper">
      <div className="slideshow-track" ref={trackRef}>
        {[...images, ...images].map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            className="slide-img"
          />
        ))}
      </div>
    </div>
  );
}
