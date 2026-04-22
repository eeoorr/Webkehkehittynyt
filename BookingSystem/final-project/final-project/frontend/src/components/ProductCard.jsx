import snowshovel from "../assets/snowshovel.jpg"
import snowshovel2 from "../assets/snowshovel2.jpg"
import example from "../assets/example.jpg"

const imageMap = {
  "snowshovel.jpg": snowshovel,
  "snowshovel2.jpg": snowshovel2,
  "example.jpg": example
}

function ProductCard({ title, image, summary, link }) {
  return (
    <article className="news-box">
      <img
        src={imageMap[image]}
        alt={title}
        className="news-image"
      />

      <h3 className="news-title">{title}</h3>

      <p className="news-summary">{summary}</p>

      <a href={link} className="read-more">
        View Product →
      </a>
    </article>
  )
}

export default ProductCard
