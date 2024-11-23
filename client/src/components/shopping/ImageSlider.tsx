import { cn } from "@/lib/utils";
import {useState } from "react";
import { Button } from "../ui/button";

interface Props {
  images: string[];
}

const ImageSlider: React.FC<Props> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextSlide = () => {
    const isLastIndex = currentImage === images.length - 1;
    const next = isLastIndex ? 0 : currentImage + 1;
    setCurrentImage(next);
  };

  const prevSlide = () => {
    const isFirstIndex = currentImage === 0;
    const next = isFirstIndex ? images.length - 1 : currentImage - 1;
    setCurrentImage(next);
  };

  const moveIndex = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto h-80 overflow-hidden rounded-lg border">
      <div
        className={`flex h-full transition-transform duration-700 ease-in-out`}
		style={{transform: `translateX(-${currentImage * 100}%)`}}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Slide image"
            className={cn("w-full flex-shrink-0 object-cover")}
          />
        ))}
      </div>
      <button
        className="absolute top-0 left-0 text-2xl p-5 h-full hover:bg-black/20 duration-300"
        onClick={() => prevSlide()}
      >
        &#10094;
      </button>
      <button
        className="absolute top-0 right-0 text-2xl p-5 h-full hover:bg-black/20 duration-300"
        onClick={() => nextSlide()}
      >
        &#10095;
      </button>

      <div className="space-x-2 absolute bottom-4 w-full text-center">
        {images.map((_, index) => (
          <Button
            key={index}
            className={cn("h-3 w-3 rounded-full bg-gray-600/30 ", {
              "bg-gray-900": index === currentImage,
            })}
            onClick={() => moveIndex(index)}
          ></Button>
        ))}
      </div>
    </div>
  );
};
export default ImageSlider;
