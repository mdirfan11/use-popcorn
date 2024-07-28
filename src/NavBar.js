import Logo from "./Logo";
import Search from "./Search";

function NavBar({ children }) {

    return (
        <nav className="nav-bar">
            <Logo />
            <Search />
            {children}
        </nav>
    );
}

export default NavBar;