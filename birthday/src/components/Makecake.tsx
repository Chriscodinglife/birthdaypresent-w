import React, { useEffect, useState } from "react";

export const Makecake = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [numImages, setNumImages] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [hasRequestedNewCake, setHasRequestedNewCake] = useState(false); // New flag

  const handleGetNewCake = async () => {
    setButtonDisabled(true);
    setIsLoading(true);

    const timestamp = Date.now();
    const url = `http://localhost:8000/get_image?timestamp=${timestamp}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageSrc(imageUrl);
      } else {
        console.error("Failed to fetch new cake image");
      }
    } catch (error) {
      console.error("Failed to fetch new cake image", error);
    } finally {
      setButtonDisabled(false);
      setIsLoading(false);
      fetchNumImages();
      setHasRequestedNewCake(false); // Reset the flag after handling the request
    }
  };

  useEffect(() => {
    const fetchInitialCake = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:8000/get_image");
        if (response.ok) {
          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          setImageSrc(imageUrl);
        } else {
          console.error("Failed to fetch initial cake image");
        }
      } catch (error) {
        console.error("Failed to fetch initial cake image", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialCake(); // Fetch the initial cake image

    // ... your existing code for fetching the number of images and polling
  }, []);

  useEffect(() => {
    fetchNumImages();

    const intervalId = setInterval(fetchNumImages, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (numImages <= 2 && hasRequestedNewCake === false) {
      // Check the flag before making a request
      setHasRequestedNewCake(true); // Set the flag to indicate a request has been made
      handleGetNewCake();
    }
  }, [numImages, hasRequestedNewCake]); // Include hasRequestedNewCake in the dependency array

  const fetchNumImages = async () => {
    try {
      const response = await fetch("http://localhost:8000/get_num_images");
      if (response.ok) {
        const data = await response.json();
        console.log("Num images: ", data.num_images);
        setNumImages(data.num_images);
      } else {
        console.error("Failed to fetch number of images");
      }
    } catch (error) {
      console.error("Failed to fetch number of images", error);
    } finally {
      setHasRequestedNewCake(false); // Reset the flag after handling the request
    }
  };

  return (
    <div id="makecake" className="w-full p-10">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row items-center justify-center">
          <h2 className="text-white font-semi-bold w-1/3 p-7 m-5">
            Make some awesome 8-bit dragons with our{" "}
            <span className="text-blue-600">Dragon and Cake Generator</span>.
            <br />
            <br />
            <br />
            🤔Who knows, this can be your next discord icon?
          </h2>
          <div className="flex flex-col items-center justify-center w-2/3">
            <img src={imageSrc} alt="ai_image" className="w-1/2" />
            <div className="p-10">
              <button
                className={`bg-white text-black font-semi-bold px-4 py-2 rounded ${
                  numImages <= 2
                    ? "bg-gray-300 cursor-not-allowed"
                    : "hover:bg-blue-600 hover:text-white"
                }`}
                onClick={handleGetNewCake}
                disabled={buttonDisabled}
              >
                {isLoading
                  ? "One Moment Bruh"
                  : numImages <= 2
                  ? "One Moment Bruh"
                  : "Get New Cake 🍑"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Makecake;
