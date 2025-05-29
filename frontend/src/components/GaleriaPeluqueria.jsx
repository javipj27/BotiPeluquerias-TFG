export default function GaleriaPeluqueria({ galeria, slideIndex, nextSlide, prevSlide }) {
  return (
    <div className="relative w-full h-96 overflow-hidden">
      {galeria.map((url, idx) => (
        <img
          key={idx}
          src={url}
          alt={`Foto ${idx + 1}`}
          className={`absolute w-full h-full object-cover transition-transform duration-700 ${
            idx === slideIndex ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ transform: `translateX(${(idx - slideIndex) * 100}%)` }}
        />
      ))}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        ❯
      </button>
    </div>
  );
}