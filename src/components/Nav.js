import { useOutletContext } from "react-router";

function Nav() {
    const isLoggedIn = useOutletContext;
    const title = "Ghoul Traders"

    if (isLoggedIn) {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">{title}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
                        <span className="navbar-toggerl-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link active" href="/profile">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/shipyard">Shipyard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/factions">Factions</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link" href="/logout">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">{title}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
                    <span className="navbar-toggerl-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/shipyard">Shipyard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/factions">Factions</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto mb-2 mb-md-0">
                        <li className="nav-item float-right">
                            <a className="nav-link float-right" href="/login">Login</a>
                        </li>
                        <li className="nav-item float-right">
                            <a className="nav-link float-right" href="/signup">Sign Up</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;