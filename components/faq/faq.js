import { useState, useEffect } from "react";
import styles from "../faq/faq.module.css";

const FAQ = ({
  uuid,
}) => {
  const [data, setData] = useState([]); // API data
  const [filteredCategories, setFilteredCategories] = useState([]); // Search result
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [expandedQuestions, setExpandedQuestions] = useState({}); // Expanded state for questions

  // Fetch data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/faqs"); // Replace with your API endpoint
//         const result = await response.json();
//         setData(result);
//         setFilteredCategories(result);
//       } catch (error) {
//         console.error("Error fetching FAQ data:", error);
//       }
//     };

//     fetchData();
//   }, []);

  // Filter categories based on search term
  useEffect(() => {
    if (searchTerm) {
      setFilteredCategories(
        data.filter((item) =>
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredCategories(data);
    }
  }, [searchTerm, data]);

  // Toggle the expanded state of a question
  const toggleQuestion = (index) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className={styles["faq-container"]}>
      <h2 className={styles["faq-heading"]}>Frequently Asked Questions</h2>
      <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles["search-input"]}
      />

      {selectedCategory ? (
        <>
          <div className={styles["selected-category"]}>
            <span>{selectedCategory}</span>
            <button
              onClick={() => setSelectedCategory(null)}
              className={styles["close-button"]}
            >
              ×
            </button>
          </div>
          <ul className={styles["questions-list"]}>
            {data
              .find((item) => item.category === selectedCategory)
              ?.questions.map((item, index) => (
                <li key={index} className={styles["question-item"]}>
                  <div
                    className={styles["question"]}
                    onClick={() => toggleQuestion(index)}
                  >
                    {item.question}
                    <span className={styles["toggle"]}>
                      {expandedQuestions[index] ? "▲" : "▼"}
                    </span>
                  </div>
                  {expandedQuestions[index] && (
                    <div className={styles["answer"]}>{item.answer}</div>
                  )}
                </li>
              ))}
          </ul>
        </>
      ) : (
        <ul className={styles["categories-list"]}>
          {filteredCategories.map((item, index) => (
            <li
              key={index}
              className={styles["category-item"]}
              onClick={() => setSelectedCategory(item.category)}
            >
              {item.category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FAQ;
