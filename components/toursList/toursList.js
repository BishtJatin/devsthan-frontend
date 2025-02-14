import React from 'react'; 
import TourCard from '../tourCard/tourCard';

const ToursList = ({ tourData }) => {
  // Helper function to get the maximum price per person for a given season's pricing
  const getMaxPricePerPerson = (seasons) => {
    if (!seasons || seasons.length === 0) {
      return 0; // Default case when no seasons are available
    }

    const currentDate = new Date();

    // Find the season with the closest start date to the current date
    const closestSeason = seasons.reduce((closest, current) => {
      const currentStartDate = new Date(current.startDate);
      const closestStartDate = new Date(closest.startDate || Infinity);

      return Math.abs(currentStartDate - currentDate) < Math.abs(closestStartDate - currentDate)
        ? current
        : closest;
    });

    if (!closestSeason.pricing || closestSeason.pricing.length === 0) {
      return 0; // Return 0 if no pricing is found
    }

    // Find the maximum price in the closest season's pricing
    const maxPriceEntry = closestSeason.pricing.reduce((max, current) =>
      current.price > max.price ? current : max
    );

    // Calculate price per person
    return maxPriceEntry.price / maxPriceEntry.person;
  };

  return (
    <>
      {tourData.length > 0 &&
        tourData.map((data) => {
          let priceDetails = {};
          let fallbackToSeason = true;

          if (data.batch && data.batch.length > 0) {
            // Use batch data if available
            const latestBatch = data.batch[data.batch.length - 1]; // Latest batch
            const { groupSharingPrice, doubleSharingPrice, quadSharingPrice } = latestBatch;

            // Include all available pricing details
            if (groupSharingPrice || doubleSharingPrice || quadSharingPrice) {
              priceDetails = {
                groupSharingPrice: groupSharingPrice || "N/A",
                doubleSharingPrice: doubleSharingPrice || "N/A",
                quadSharingPrice: quadSharingPrice || "N/A",
              };
              fallbackToSeason = false;
            }
          }

          if (fallbackToSeason) {
            if (data.isStandard) {
              priceDetails = {
                seasonPrice: `Rs.${Math.floor(getMaxPricePerPerson(data.standardDetails?.seasons))}`,
              };
            } else if (data.isDeluxe) {
              priceDetails = {
                seasonPrice: `Rs.${Math.floor(getMaxPricePerPerson(data.deluxeDetails?.seasons))}`,
              };
            } else if (data.isPremium) {
              priceDetails = {
                seasonPrice: `Rs.${Math.floor(getMaxPricePerPerson(data.premiumDetails?.seasons))}`,
              };
            }
          }

          return (
            <TourCard
              key={data.uuid} // Add a unique key for each child in a list
              data={data}
              duration={data.duration}
              location={data.location}
              uuid={data.uuid}
              imageUrl={data.bannerImage}
              title={data.name}
              tourType={data.tourType}
              pricingDetails={priceDetails} // Pass pricing details as a prop
            />
          );
        })}
    </>
  );
};

export default ToursList;
