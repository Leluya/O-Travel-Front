import './style.scss';
import ItineraryIcon from 'src/assets/svg/itinerary.svg';
import PropTypes from 'prop-types';

const Itinerary = ({ summary }) => (
  <div className="itinerary">

    <img className="itinerary_icon" src={ItineraryIcon} alt="Itinéraire" />

    <p className="itinerary_text">{summary}<br /><br />
    </p>

  </div>
);

Itinerary.propTypes = {
  summary: PropTypes.string.isRequired,
};

export default Itinerary;
