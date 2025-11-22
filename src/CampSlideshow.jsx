import "./CampSlideshow.css";

export default function CampSlideshow({ images = [] }) {
  // Duplicate the array for a seamless infinite loop
  const doubled = [...images, ...images];

  return (
    <div className="camp-slider">
      <div className="camp-track">
        {doubled.map((src, i) => (
          <div className="camp-slide" key={i}>
            <img src={src} alt={`camp-${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
