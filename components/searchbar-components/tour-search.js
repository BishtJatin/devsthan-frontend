import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "../../components/homeBanner/homeBanner.module.css";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const TourSearch = ({ locations }) => {
  const [destination, setDestination] = useState(null);
  const [showSelect, setShowSelect] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(
    locations.destinations
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const router = useRouter();

  const dropdownRef = useRef(null);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchText(query);
    // Check if locations is an array before filtering
    if (Array.isArray(locations.destinations)) {
      const filtered = locations.destinations.filter((location) =>
        location.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      console.error("locations.destinations is not an array");
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      // Format the date as dd-MM-yyyy and save it

      const formattedDate = formatDate(date);
      localStorage.setItem("departureDate", formattedDate);
    }
  };

  const handleOptionClick = (option) => {
    setDestination(option);
    setSearchText(option);
    setShowSelect(false);
  };

  const handleButtonClick = () => {
    if (!destination) {
      toast.error("Please select a destination!");
    } else {
      router.push(`/tours/${destination.toLowerCase()}`);
    }
  };

  const handleInputClick = (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up and closing the dropdown
  };

  return (
    <div className={styles["search-options-outer"]}>
      <div className={styles["search-options"]}>
        {/* Destination Input */}
        <div
          className={styles["search-options-tour"]}
          onClick={() => setShowSelect(!showSelect)} // Toggle dropdown visibility
        >
          <FiMapPin />
          <div className={styles["search-options-destination"]}>
            <p>Destination</p>
            <p className={styles["search-button"]}>
              {destination ? destination : "Select Destination"}
            </p>
          </div>
          <MdOutlineKeyboardArrowDown className={styles["arrow-down"]} />
          {showSelect && (
            <div className={styles["select-dropdown"]} ref={dropdownRef}>
              <input
                type="text"
                value={searchText}
                onChange={handleSearch} // Handle search input
                onClick={handleInputClick} // Prevent dropdown close when clicking the input
                placeholder="Search destination..."
                className={styles["search-input"]}
              />
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => handleOptionClick(option)} // Handle option click
                    className={styles["dropdown-option"]}
                  >
                    {option}
                  </div>
                ))
              ) : (
                <div className={styles["dropdown-option"]}>
                  No results found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Departure Date */}
        <div className={styles["search-options-tour"]}>
          <FiMapPin />
          <div className={styles["search-options-destination"]}>
            <p>Departure Date</p>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              placeholderText="Select Date"
              dateFormat="dd/MM/yyyy"
              className={styles["datepicker-input"]}
              minDate={new Date()} // Disable previous dates
            />
          </div>
          <MdOutlineKeyboardArrowDown className={styles["arrow-down"]} />
        </div>
      </div>

      <button
        className={styles["search-options-button"]}
        onClick={handleButtonClick}
        style={{
          backgroundColor: "",
          color: "white",
          cursor: destination ? "pointer" : "not-allowed",
        }}
      >
        Search
      </button>

      <ToastContainer style={{ marginTop: 80 }} />
    </div>
  );
};

export default TourSearch;
