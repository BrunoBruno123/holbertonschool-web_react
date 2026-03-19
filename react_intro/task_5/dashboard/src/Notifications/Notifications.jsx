import './Notifications.css';
import closeButton from '../assets/close-button.png'
import { getLatestNotification } from '../utils/utils';

const Notifications = () => {

    const handleClick = () => {
        console.log("Close button has been clicked");
    }
    return (
        <div className="notification-items">
            <p>Here is the list of notifications</p>
            <ul>
                <li data-priority="default">New course available</li>
                <li data-priority="urgent">New resume available</li>
                <li data-priority="urgent" dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
            </ul>
            <button aria-label="Close" onClick={handleClick}>
                <img src={closeButton} alt="close" style={{ width: "13px", height: "10px" }} />
            </button>
        </div>
    )
}

export default Notifications;