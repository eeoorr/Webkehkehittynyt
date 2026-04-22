import { useState } from "react";
import { z } from "zod";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";


const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, "Name can only contain letters"),
  email: z.string().email("Please enter a valid email address"),
  date: z.string().min(1, "Please select a date"),
});

function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
  });

  const [errors, setErrors] = useState({});
  const [responseData, setResponseData] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      setResponseData(null);
      return;
    }

    setErrors({});

    const response = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    });

    const json = await response.json();
    setResponseData(json);
  }

  return (
    <>
      <Header />

      <div className="form-page">
        <h2 className="article-title">React Form with Validation</h2>
        <p className="article-summary">
          Fill out the form below. The data will be validated and sent to httpbin.
        </p>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-field">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <p className="error-text">{errors.date}</p>}
          </div>

          <button type="submit" className="read-more">
            Submit Form
          </button>
        </form>

        {responseData && (
          <div className="response-box">
            <h3>Server Response</h3>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default FormPage;
