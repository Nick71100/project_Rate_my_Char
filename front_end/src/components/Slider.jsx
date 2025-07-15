const imageModules = import.meta.glob("/src/assets/slider/*.{jpg,jpeg,png}", {
  eager: true,
});
const images = Object.values(imageModules).map((mod) => mod.default);

const Slider = () => {
  const allImages = [...images, ...images];

  return (
    <div className="slider">
      <div className="slider-track">
        {allImages.map((src, index) => (
          <div className="slide" key={index}>
            <img src={src} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
