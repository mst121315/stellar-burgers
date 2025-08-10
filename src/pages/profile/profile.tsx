import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../services/store';
import { RootState } from '../../services/store';
import { updateUserApi } from '@api';
import { setUser } from '../../features/auth/authSlice';

export const Profile: FC = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    updateUserApi(formValue)
      .then((result) => {
        if (result && result.success && result.user) {
          dispatch(setUser(result.user));
        }
      })
      .catch((err) => {
        console.error('error on update:', err);
      });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
