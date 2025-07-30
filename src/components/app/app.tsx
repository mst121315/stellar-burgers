import { ConstructorPage, Feed, Login, Register, ForgotPassword, ResetPassword, Profile, ProfileOrders, NotFound404 } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
	Routes,
	Route,
  useLocation,
  Navigate
} from 'react-router-dom';

import { AppHeader } from '@components';
import { Modal } from '../modal/modal';
import { OrderInfo } from '../order-info';
import { IngredientDetails } from '../ingredient-details';
import { Preloader } from '../ui';



// export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//     const isAuthChecked = useSelector(isAuthCheckedSelector); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
//     const user = useSelector(userDataSelector); // userDataSelector — селектор получения пользователя из store

//   if (!isAuthChecked) { // пока идёт чекаут пользователя, показываем прелоадер
//     return <Preloader />;
//   }

//   if (!user) { // если пользователя в хранилище нет, то делаем редирект
//     return <Navigate replace to='/login'/>;
//   }

//     return children ;
// }


const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

    return (
  <div className={styles.app}>
    <AppHeader />
      <Routes>
        <Route path="/" element={<ConstructorPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
        <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
        <Route path="/reset-password" element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/profile/orders" element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>} />
        <Route path="*" element={<NotFound404 />} />
    </Routes>
    
    {backgroundLocation && (
      <Routes>
        <Route path="/feed/:number" element={<Modal><OrderInfo /></Modal>} />
        <Route path="/ingredients/:id" element={<Modal><IngredientDetails /></Modal>} />
        <Route path="/profile/orders/:number" element={<ProtectedRoute><Modal><OrderInfo /></Modal></ProtectedRoute>} />
    </Routes>
    )}
    </div>
  );
};

export default App;
