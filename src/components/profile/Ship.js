import { useEffect, useState } from "react";
import { useOutletContext } from "react-router"
import { getUserShips } from "../../api/endpoints";
import { useRateLimit } from "../../api/useRateLimit";

function Ship() {
    const [userShips, setUserShips] = useState();

    const [localStorageUserToken, setLocalStorageUserToken, isLoggedIn, setIsLoggedIn] = useOutletContext();
    
    const rateLimitedGetUserShips = useRateLimit(getUserShips, setUserShips, console.log);

    useEffect( () => {
        if (localStorageUserToken) {
            rateLimitedGetUserShips(localStorageUserToken);
        }

    }, [localStorageUserToken]);

    return (
        <>
            {userShips ? (
                <div className="card">
                    <div className="card-header">
                        <span>
                            <p className="h2 text-center">Ships</p>
                        </span>
                    </div>
                    <div className="card-body">
                        <div className="card-title">
                            <p className="h5">Ships: {userShips.meta.total} </p>
                        </div>
                    </div>
                    {userShips.data.map( ship => {
                        return (
                            <div className="accordion" id={`${ship.symbol}-accordion`} key={ship.symbol}>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${ship.symbol}-collapse`}>
                                            {ship.symbol}
                                        </button>
                                    </h2>
                                    <div className="accordion-collapse collapse" data-bs-parent={`#${ship.symbol}-accordion`} id={`${ship.symbol}-collapse`}>
                                        <div className="accordion-body">

                                            {/* SHIP REGISTRATION ACCORDION */}
                                            <div className="accordion" id={`${ship.symbol}-registration-accordion`}>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${ship.symbol}-registration-collapse`}>
                                                            Registration
                                                        </button>
                                                    </h2>
                                                    <div className="accordion-collapse collapse" data-bs-parent={`#${ship.symbol}-registration-accordion`} id={`${ship.symbol}-registration-collapse`}>
                                                        <div className="accordion-body">
                                                            <table class="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Name</th>
                                                                        <th scope="col">Faction</th>
                                                                        <th scope="col">Role</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>{ship.registration.name}</td>
                                                                        <td>{ship.registration.factionSymbol}</td>
                                                                        <td>{ship.registration.role}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>                                                    
                                                </div>
                                            </div>
                                            {/* END SHIP REGISTRATION ACCORDION */}

                                            {/* SHIP NAV ACCORDION */}
                                            <div className="accordion" id={`${ship.symbol}-nav-accordion`}>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${ship.symbol}-nav-collapse`}>
                                                            Nav
                                                        </button>
                                                    </h2>
                                                    <div className="accordion-collapse collapse" data-bs-parent={`#${ship.symbol}-nav-accordion`} id={`${ship.symbol}-nav-collapse`}>
                                                        <div className="accordion-body">
                                                            <table class="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Status</th>
                                                                        <th scope="col">Location</th>
                                                                        <th scope="col">Flight Mode</th>
                                                                        {/* <th scope="col">Role</th> */}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>{ship.nav.status}</td>
                                                                        <td>{ship.nav.waypointSymbol}</td>
                                                                        <td>{ship.nav.flightMode}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            
                                                            <h5>{ship.nav.status == "DOCKED" ? "Last route" : "Current route"}</h5>
                                                            <h6>Destination</h6>
                                                            <table class="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Waypoint</th>
                                                                        <th scope="col">Type</th>
                                                                        <th scope="col">x</th>
                                                                        <th scope="col">y</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>{ship.nav.route.destination.symbol}</td>
                                                                        <td>{ship.nav.route.destination.type}</td>
                                                                        <td>{ship.nav.route.destination.x}</td>
                                                                        <td>{ship.nav.route.destination.y}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                            <h6>Departure</h6>
                                                            <table class="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Waypoint</th>
                                                                        <th scope="col">Type</th>
                                                                        <th scope="col">x</th>
                                                                        <th scope="col">y</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>{ship.nav.route.departure.symbol}</td>
                                                                        <td>{ship.nav.route.departure.type}</td>
                                                                        <td>{ship.nav.route.departure.x}</td>
                                                                        <td>{ship.nav.route.departure.y}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>                                                    
                                                </div>
                                            </div>
                                            {/* END SHIP NAV ACCORDION */}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : <p className="">Loading...</p> }
        </>
    )
}

export default Ship;