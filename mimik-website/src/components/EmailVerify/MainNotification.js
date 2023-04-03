import { useAuth } from '../../context/userAuthContext';
import Notify from './Notify';

const MainNotification = () => {
  const {
    alert: { location },
  } = useAuth();
  return location === 'main' && <Notify />;
};

export default MainNotification;