import { useState, useEffect } from "react";
import styles from "../faq/faq.module.css";

const FAQ = ({ faqData }) => {
  const [filteredData, setFilteredData] = useState([]); // Filtered questions and answers
  const [searchSuggestions, setSearchSuggestions] = useState([]); // Categories for search suggestions
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [expandedQuestions, setExpandedQuestions] = useState({}); // Tracks expanded questions

  // Generate category suggestions on load
  useEffect(() => {
    const uniqueCategories = [
      ...new Set(faqData.map((item) => item.category)),
    ];
    setSearchSuggestions(uniqueCategories);
    setFilteredData(faqData);
  }, [faqData]);

  // Filter questions and answers based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = faqData.filter((item) =>
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(faqData); // Show all questions by default
    }
  }, [searchTerm, faqData]);

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

      {/* Search Input */}
      <div className={styles["search-wrapper"]}>
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles["search-input"]}
          list="category-suggestions"
        />
        <datalist id="category-suggestions">
          {searchSuggestions.map((category, index) => (
            <option key={index} value={category} />
          ))}
        </datalist>
      </div>

      {/* Display Questions and Answers */}
      <ul className={styles["questions-list"]}>
        {filteredData.map((item, index) => (
          <li key={item._id} className={styles["question-item"]}>
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
    </div>
  );
};

export default FAQ;
