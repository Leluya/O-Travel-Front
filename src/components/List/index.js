// == Import
import './style.scss';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import flag from 'src/assets/images/canada-svgrepo-com.svg';

import { Card, Image } from 'semantic-ui-react';
import { getDestinations } from 'src/actions/listActions';
import { saveFavoritesDestination } from 'src/actions/favoritesActions';
import Loading from '../Loading';

// == Composant
const List = () => {
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(getDestinations());
    },
    [],
  );

  useEffect(() => {
    console.log('List change');
  });

  const destinations = useSelector((state) => state.list.destinations);

  return (

    <div className="trip-list">
      <h2 className="trip-title">Les voyages</h2>
      {destinations.length === 0 && <Loading />}
      {destinations.length > 0 && (
      <>
        <Card.Group>
          {destinations.map((destination) => (
            <Card key={destination.id}>
              <Link to={`/destinations/${destination.id}`}>
                <Card.Content>
                  {/* <Image src={flag} size="mini" /> */}
                  <Image
                    src={destination.picture}
                  />
                  <Card.Header>
                    {destination.state} | {destination.surname}
                    <Card.Description>
                      8 nuits | train
                    </Card.Description>
                  </Card.Header>
                </Card.Content>
              </Link>
              <Image
                ui={false}
                onClick={
                  () => {
                    dispatch(saveFavoritesDestination(destination.id));
                  }
                }
                fluid
                label={{ as: 'a', corner: 'right', icon: 'star' }}
              />
            </Card>
          ))}
        </Card.Group>
      </>
      )}
    </div>
  );
};

// == Export
export default List;
