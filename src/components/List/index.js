// == Import
import './style.scss';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import flag from 'src/assets/images/canada-svgrepo-com.svg';

import { Card, Image, Pagination } from 'semantic-ui-react';
import { getDestinations } from 'src/actions/listActions';
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

  const destinations = useSelector((state) => state.list.destinations);

  return (

    <div className="trip-list">
      <h2 className="trip-title">Les voyages</h2>
      {destinations.length === 0 || true && <Loading />}
      {destinations.length > 0 && false && (
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
                fluid
                label={{ as: 'a', corner: 'right', icon: 'star' }}
              />
            </Card>
          ))}
        </Card.Group>
        <Pagination
          defaultActivePage={1}
          firstItem={null}
          lastItem={null}
          pointing
          secondary
          totalPages={3}
        />
      </>
      )}
    </div>
  );
};

// == Export
export default List;
