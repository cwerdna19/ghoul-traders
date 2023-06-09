import { useEffect, useState } from "react";
import { useOutletContext } from "react-router"
import { getUserShips } from "../../api/endpoints";
import { useRateLimit } from "../../api/useRateLimit";

import Accordion from "../Accordion";
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
                            <Accordion key={ship.symbol} name={ship.symbol} header={ship.symbol}>

                                {/* SHIP REGISTRATION ACCORDION */}
                                <Accordion name={ship.symbol} header="registration">
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
                                </Accordion>
                                {/* END SHIP REGISTRATION ACCORDION */}

                                {/* SHIP NAV ACCORDION */}
                                <Accordion name={ship.symbol} header="nav">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Status</th>
                                                <th scope="col">Location</th>
                                                <th scope="col">Flight Mode</th>
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
                                    
                                    <h5>{ship.nav.status === "DOCKED" ? "Last route" : "Current route"}</h5>
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
                                </Accordion>
                                {/* END SHIP NAV ACCORDION */}

                                {/* SHIP CREW ACCORDION */}
                                <Accordion name={ship.symbol} header="crew">
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
                                </Accordion>
                                {/* END SHIP CREW ACCORDION */}

                                {/* SHIP FRAME ACCORDION */}
                                <Accordion name={ship.symbol} header="frame">
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
                                </Accordion>
                                {/* END SHIP FRAME ACCORDION */}

                                {/* SHIP REACTOR ACCORDION */}
                                <Accordion name={ship.symbol} header="reactor">
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
                                </Accordion>
                                {/* END SHIP REACTOR ACCORDION */}

                                {/* SHIP ENGINE ACCORDION */}
                                <Accordion name={ship.symbol} header="engine">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Symbol</th>
                                                <th scope="col">Condition</th>
                                                <th scope="col">Speed</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{ship.engine.name}</td>
                                                <td>{ship.engine.symbol}</td>
                                                <td>{ship.engine.condition}</td>
                                                <td>{ship.engine.speed}</td>
                                            </tr>
                                            <tr>
                                                <th scope="col">Description</th>
                                            </tr>
                                            <tr>
                                                <td colSpan="4">{ship.engine.description}</td>
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
                                                <td>{ship.engine.requirements.power}</td>
                                                <td>{ship.engine.requirements.crew}</td>
                                                <td>{ship.engine.requirements.slots}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Accordion>
                                {/* END SHIP ENGINE ACCORDION */}

                                {/* SHIP MODULES ACCORDION */}
                                <Accordion name={ship.symbol} header="modules">
                                    {ship.modules.map( (module, index) => {
                                        return ( 
                                                <Accordion key={`${ship.symbol}-${module.symbol}-${index}`} symbol={`${module.symbol}-${index}`} header={module.name}>
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Symbol</th>
                                                                <th scope="col">Capacity</th>
                                                                <th scope="col">Range</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>{module.name}</td>
                                                                <td>{module.symbol}</td>
                                                                <td>{module.capacity}</td>
                                                                <td>{module.range}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="col">Description</th>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan="4">{module.description}</td>
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
                                                                <td>{module.requirements.power}</td>
                                                                <td>{module.requirements.crew}</td>
                                                                <td>{module.requirements.slots}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </Accordion>
                                        )})}
                                </Accordion>
                                {/* END SHIP MODULES ACCORDION */}
                                
                                {/* SHIP MOUNTS ACCORDION */}
                                <Accordion name={ship.symbol} header="mounts">
                                    {ship.mounts.map( (mount, index) => {
                                        return ( 
                                                <Accordion key={`${ship.symbol}-${mount.symbol}-${index}`} symbol={`${mount.symbol}-${index}`} header={mount.name}>
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Symbol</th>
                                                                <th scope="col">Strength</th>
                                                                <th scope="col">Deposits</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>{mount.name}</td>
                                                                <td>{mount.symbol}</td>
                                                                <td>{mount.strength}</td>
                                                                <td>{mount.deposits}</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="col">Description</th>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan="4">{mount.description}</td>
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
                                                                <td>{mount.requirements.power}</td>
                                                                <td>{mount.requirements.crew}</td>
                                                                <td>{mount.requirements.slots}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </Accordion>
                                        )})}
                                </Accordion>
                                {/* END SHIP MOUNTS ACCORDION */}

                                {/* SHIP CARGO ACCORDION */}
                                <Accordion name={ship.symbol} header="cargo">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Capacity</th>
                                                <th scope="col">Units</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{ship.cargo.capacity}</td>
                                                <td>{ship.cargo.units}</td>
                                            </tr>
                                            <tr>
                                                <th scope="col">Inventory</th>
                                            </tr>
                                            <tr>
                                                <td colSpan="4">{ship.cargo.description}</td>
                                            </tr>
                                            {ship.cargo.inventory.map( item => {
                                                <>
                                                    <tr>
                                                        <td>{item.name}</td>
                                                        <td>{item.symbol}</td>
                                                        <td>{item.units}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{item.description}</td>
                                                    </tr>
                                                </>
                                            })}
                                        </tbody>
                                    </table>
                                </Accordion>
                                {/* END SHIP CARGO ACCORDION */}

                                {/* SHIP FUEL ACCORDION */}
                                <Accordion name={ship.symbol} header="fuel">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Current</th>
                                                <th scope="col">Capacity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{ship.fuel.current}</td>
                                                <td>{ship.fuel.capacity}</td>
                                            </tr>
                                            <tr>
                                                <th scope="col" colSpan="2">Last Consumed</th>
                                            </tr>
                                            <tr>
                                                <td>Amount</td>
                                                <td>Timestamp</td>
                                            </tr>
                                            <tr>
                                                <td>{ship.fuel.consumed.amount}</td>
                                                <td>{ship.fuel.consumed.timestamp}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Accordion>
                                {/* END SHIP FUEL ACCORDION */}

                            </Accordion>
                        )
                    })}
                </div>
            ) : <Loader/> }
        </>
    )
}

export default Ship;