import { useSelector } from 'react-redux';
import { Row } from 'react-materialize';
import Loader from '../utils/Loader';

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  const { user, loading } = auth;

  return !loading && user ? (
    <Row className="center" style={{ height: '75vh' }}>
      <h1>Welcome {user.firstName}</h1>
      {user.avatar && <img className="circle" src={user.avatar} alt="" />}
    </Row>
  ) : (
    <Loader />
  );
};

export default Dashboard;
