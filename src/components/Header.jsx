import { Outlet, Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <div className="header">
                <h4>Jump to: </h4>
                <nav>
                    <Link to="/">Dashboard</Link>
                    <br></br>
                    <Link to="/about">About</Link>
                </nav>
            </div>
            <Outlet />
        </div>

    );
}

export default Header;