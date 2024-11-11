
// Too slow, sadly... very cool library though

import React, { useEffect, useState } from "react";
import { removeBackground } from "@imgly/background-removal";

const ImageBackgroundRemover: React.FC<{ src: string }> = ({ src }) => {
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const processImage = async () => {
      setLoading(true);
      try {
        const response = await fetch(src);
        const blob = await response.blob();
        const resultBlob = await removeBackground(blob);
        const url = URL.createObjectURL(resultBlob);

        setImageUrl(url);
      } catch (error) {
        console.error("Error removing background:", error);
      } finally {
        setLoading(false);
      }
    };

    processImage();
  }, [src]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {imageUrl && <img alt="Processed" src={imageUrl} />}
    </div>
  );
};

export default ImageBackgroundRemover;