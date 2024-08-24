import Logo from "./Logo";
import Search from "./Search";

function NavBar({ query, setQuery, children }) {

    return (
        <nav className="nav-bar">
            <Logo />
            <Search query={query} setQuery={setQuery} />
            {children}
        </nav>
    );
}

export default NavBar;