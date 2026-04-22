import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function SavedDataPage() {
  const [entries, setEntries] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("/api/form")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEntries(data);
        } else {
          setEntries([]);
        }
      })
      .catch(() => {
        setErrorMessage("Failed to load saved data.");
      });
  }, []);

  return (
    <>
      <Header />

      <div className="form-page">
        <h2 className="article-title">Saved Form Submissions</h2>

        {errorMessage && <p className="error-text">{errorMessage}</p>}

        {entries.length === 0 && !errorMessage && <p>No entries found.</p>}

        {entries.length > 0 && (
          <div className="response-box">
            {entries.map((item) => (
              <div key={item.id} className="saved-item">
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Date:</strong> {item.date}</p>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default SavedDataPage;
