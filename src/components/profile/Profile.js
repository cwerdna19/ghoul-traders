import { useOutletContext } from 'react-router-dom';
import Agent from './Agent';

function Profile() {
    return(
        <div className="container text-bg-dark p-2 m-2 rounded" id="profile" >
            <div className="clearfix">
                <Agent context={useOutletContext()}/>
            </div>
        </div>
    )
}

export default Profile;