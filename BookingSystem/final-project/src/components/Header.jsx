import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>SUPER SNOW SHINE SHOVEL™</h1>
      <nav>
        <Link to="/">About us</Link>
        <Link to="/catalogue">View Catalogue</Link>
        <Link to="/product">Make an Order</Link>
        <Link to="/form">Make an Order</Link>
      </nav>
    </header>
  );
}

export default Header;
