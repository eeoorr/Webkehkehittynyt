import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function HomePage() {
  return (
    <>
      <Header />

      <main className="home-page">
        <section className="hero">
          <h2 className="article-title">SUPER SNOW SHINE SHOVEL™</h2>
          <p className="article-summary">
            The ultimate winter companion for clean, safe, and shiny pathways.
          </p>
          <button
            className="read-more"
            onClick={() => (window.location.href = "/form")}
          >
            React Form Demo
          </button>
        </section>

        <section className="product-section">
          <h3>Why SUPER SNOW SHINE SHOVEL™?</h3>
          <ul>
            <li>Lightweight yet durable construction</li>
            <li>Ergonomic handle for long sessions</li>
            <li>Optimized blade for wet and dry snow</li>
          </ul>
        </section>

        <section className="info-section">
          <h3>Order & Demo</h3>
          <p>
            Use the React Form Demo page to simulate an order and store the data
            into the database.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default HomePage;
