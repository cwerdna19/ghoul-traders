import { useEffect, useState } from "react";
import { useOutletContext } from "react-router"
import { getUserShips } from "../../api/endpoints";
import { useRateLimit } from "../../api/useRateLimit";
import Loader from "../Loader";

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
                                                            <table className="table">
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
                                                            <table className="table">
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
                                                            <table className="table">
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
                                                            <table className="table">
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

                                            {/* SHIP CREW ACCORDION */}
                                            <div className="accordion" id={`${ship.symbol}-crew-accordion`}>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${ship.symbol}-crew-collapse`}>
                                                            Crew
                                                        </button>
                                                    </h2>
                                                    <div className="accordion-collapse collapse" data-bs-parent={`#${ship.symbol}-crew-accordion`} id={`${ship.symbol}-crew-collapse`}>
                                                        <div className="accordion-body">
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Current</th>
                                                                        <th scope="col">Required</th>
                                                                        <th scope="col">Capacity</th>
                                                                        <th scope="col">Rotation</th>
                                                                        <th scope="col">Morale</th>
                                                                        <th scope="col">Wages</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>{ship.crew.current}</td>
                                                                        <td>{ship.crew.required}</td>
                                                                        <td>{ship.crew.capacity}</td>
                                                                        <td>{ship.crew.rotation}</td>
                                                                        <td>{ship.crew.morale}</td>
                                                                        <td>{ship.crew.wages}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>                                                    
                                                </div>
                                            </div>
                                            {/* END SHIP CREW ACCORDION */}

                                            {/* SHIP FRAME ACCORDION */}
                                            <div className="accordion" id={`${ship.symbol}-frame-accordion`}>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${ship.symbol}-frame-collapse`}>
                                                            Frame
                                                        </button>
                                                    </h2>
                                                    <div className="accordion-collapse collapse" data-bs-parent={`#${ship.symbol}-frame-accordion`} id={`${ship.symbol}-frame-collapse`}>
                                                        <div className="accordion-body">
                                                            <div className="table-responsive">
                                                                <table className="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">Name</th>
                                                                            <th scope="col">Symbol</th>
                                                                            <th scope="col">Condition</th>
                                                                            <th scope="col">Module Slots</th>
                                                                            <th scope="col">Mounting Points</th>
                                                                            <th scope="col">Fuel Capacity</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>{ship.frame.name}</td>
                                                                            <td>{ship.frame.symbol}</td>
                                                                            <td>{ship.frame.condition}</td>
                                                                            <td>{ship.frame.moduleSlots}</td>
                                                                            <td>{ship.frame.mountingPoints}</td>
                                                                            <td>{ship.frame.fuelCapacity}</td>
                                                                            
                                                                        </tr>
                                                                        <tr>
                                                                            <th colSpan="100" scope="col">Description</th>
                                                                        </tr>
                                                                        <tr>
                                                                            <td colSpan="5">{ship.frame.description}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th scope="col">Requirements</th>
                                                                        </tr>
                                                                        <tr>
                                                                            <th scope="col">Power</th>
                                                                            <th scope="col">Crew</th>
                                                                            <th scope="col">Slots</th>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>{ship.frame.requirements.power}</td>
                                                                            <td>{ship.frame.requirements.crew}</td>
                                                                            <td>{ship.frame.requirements.slots}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
 
                                                            
                                                        </div>
                                                    </div>                                                    
                                                </div>
                                            </div>
                                            {/* END SHIP FRAME ACCORDION */}

                                            {/* SHIP REACTOR ACCORDION */}
                                            <div className="accordion" id={`${ship.symbol}-reactor-accordion`}>
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${ship.symbol}-reactor-collapse`}>
                                                            Reactor
                                                        </button>
                                                    </h2>
                                                    <div className="accordion-collapse collapse" data-bs-parent={`#${ship.symbol}-reactor-accordion`} id={`${ship.symbol}-reactor-collapse`}>
                                                        <div className="accordion-body">
                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Name</th>
                                                                        <th scope="col">Symbol</th>
                                                                        <th scope="col">Condition</th>
                                                                        <th scope="col">Power Output</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>{ship.reactor.name}</td>
                                                                        <td>{ship.reactor.symbol}</td>
                                                                        <td>{ship.reactor.condition}</td>
                                                                        <td>{ship.reactor.powerOutput}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="col">Description</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colSpan="4">{ship.reactor.description}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="col">Requirements</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="col">Power</th>
                                                                        <th scope="col">Crew</th>
                                                                        <th scope="col">Slots</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>{ship.reactor.requirements.power}</td>
                                                                        <td>{ship.reactor.requirements.crew}</td>
                                                                        <td>{ship.reactor.requirements.slots}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>                                                    
                                                </div>
                                            </div>
                                            {/* END SHIP REACTOR ACCORDION */}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : <Loader/> }
        </>
    )
}

export default Ship;