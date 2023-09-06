import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect, Image } from "react-konva";
import ImageCatalog from "./ImagesCatalog";
const DrawAnnotations = () => {
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
    imageId: null,
    imagesLength: 0,
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log(annotations);

  const handleNextImage = () => {
    if (currentImageIndex < imageDimensions.imagesLength - 1) {
      setCurrentImageIndex((prev) => prev + 1);
      annotationsToDraw = [];
      setAnnotations([]);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
      annotationsToDraw = [];
      setAnnotations([]);
    }
  };

  const handleReset = () => {
   
      annotationsToDraw = [];
      setAnnotations([]);
   
  };

  const handleMouseDown = (event) => {
    if (newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
    }
  };

  const handleMouseUp = (event) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: annotations.length + 1,
      };
      annotations.push(annotationToAdd);
      setNewAnnotation([]);
      setAnnotations(annotations);
    }
  };

  const handleMouseMove = (event) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: "0",
        },
      ]);
    }
  };

  let annotationsToDraw = [...annotations, ...newAnnotation];
  const handleExportAnnotations = () => {
    // Implement logic to export annotations as JSON
    const json = JSON.stringify({
      [imageDimensions.imageId]: annotationsToDraw,
    });
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "annotations.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    annotationsToDraw = [];
    setAnnotations([]);
  };

  console.log("dimension", annotationsToDraw);
  return (
    <>
      <Stage
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        width={imageDimensions.width}
        height={imageDimensions.height}
      >
        <Layer>
          <ImageCatalog
            setImageDimensions={setImageDimensions}
            currentImageIndex={currentImageIndex}
          />
          {annotationsToDraw.map((value) => {
            return (
              <Rect
                x={value.x}
                y={value.y}
                width={value.width}
                height={value.height}
                fill='transparent'
                stroke='black'
              />
            );
          })}
        </Layer>
      </Stage>
      <div className='buttons '>
        <button onClick={() => handlePrevImage()}>Previous</button>
        <button onClick={() => handleNextImage()}> Next</button>
        <button onClick={() => handleExportAnnotations()}>Save & Download</button>
        <button onClick={() => handleReset()}>Reset Annotations</button>

      </div>
    </>
  );
};

export default DrawAnnotations;
