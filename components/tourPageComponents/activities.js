import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "../../components/itinery/itinery.module.css";
import Image from "next/image";

const Meals = ({ itinerary }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1, // Show one photo at a time
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={styles["day-details-outer"]}>
      {/* Heading Section */}
      <div className={styles["day-details-heading"]}>
        <div className={styles["day-details-inner"]}>
          <p className={styles["day-details-dayheading"]}>Day {itinerary.day} :</p>
          <p>{itinerary.title}</p>
        </div>
      </div>

      {/* Day Details */}
      {itinerary?.activity?.isIncluded ? (
        <>
        <div className={styles["day-details"]}>
          <div className={styles["content"]}>
            {/* Render Activity Photos if Available */}
            {itinerary?.activity?.photos?.length > 0 ? (
              <Carousel
                responsive={responsive}
                infinite
                autoPlay={itinerary.activity.photos.length > 1}
                autoPlaySpeed={5000}
                arrows
              >
                {itinerary.activity.photos.map((photo, index) => (
                  <div key={index} className={styles["carousel-item"]}>
                    <Image
                      src={photo}
                      width={300}
                      height={300}
                      alt={`Day ${itinerary.day} - Image ${index}`}
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              // Fallback for No Photos
              <div>
                <p>No photo available</p>
              </div>
            )}
            {/* Render Description */}
            {isClient && itinerary.description && (
              <p
                className={styles["blog-card-description"]}
                dangerouslySetInnerHTML={{
                  __html: itinerary.description,
                }}
              />
            )}
          </div>
        </div>
        </>) : (
        // Fallback for No Activities
        <div className={styles["no-hotel"]}>
          <p>No activities included for this day</p>
        </div>
      )}
    </div>
  );
};

export default Meals;
