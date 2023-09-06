import React, { useEffect, useState } from "react";
import Image1 from "../assets/Image1.jpg";
import Image2 from "../assets/Image2.jpg";
import Image4 from "../assets/Image4.jpg";
import Image5 from "../assets/Image5.jpg";
import useImage from "use-image";
import { Image, Group } from "react-konva";

const images = [
  { src: Image1, id: 111 },
  { src: Image2, id: 222 },
  { src: Image4, id: 333 },
  { src: Image5, id: 444 },
];
const ImageCatalog = ({ setImageDimensions, currentImageIndex }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  console.log("currentImageIndex", currentImageIndex);
  const [image] = useImage(images[currentImageIndex].src);
  useEffect(() => {
    if (image) {
      setImageDimensions({
        width: image?.width,
        height: image.height,
        imageId: images[1].id,
        imagesLength: images.length,
      });
      setIsImageLoaded(true);
    }
  }, [image]);

  return <>{isImageLoaded && <Image image={image} />}</>;
};

export default ImageCatalog;
