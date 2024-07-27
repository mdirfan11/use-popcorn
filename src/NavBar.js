import { useState } from "react";
import Logo from "./Logo"

function NavBar({ movies }) {
    const [query, setQuery] = useState("");
    return (
        <nav className="nav-bar">
            <Logo />
            <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
            <p className="num-results">
            Found <strong>{movies.length}</strong> results
            </p>
        </nav>
    );
}

export default NavBar;