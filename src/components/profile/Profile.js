import { useOutletContext } from 'react-router-dom';
import AgentComponent from './AgentComponent';
import Ship from './Ship';
import Starmap from '../starmap/Starmap';

function Profile() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-0">
                        <AgentComponent context={useOutletContext()}/>
                    </div>

                    <div className="col-md-6 offset-md-0">
                        <Ship context={useOutletContext()}/>
                    </div>
                    

                </div>
                <div className="row">
                    <div className="col">
                        
                    </div>
                </div>

                {/* <div className="container text-bg-dark p-2 m-2 rounded" id="profile" >
                    <div className="clearfix">
                        <Starmap context={useOutletContext()}/>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default Profile;