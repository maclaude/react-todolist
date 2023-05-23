import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IconContext } from 'react-icons';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import './PasswordInput.scss';

interface PasswordInputProps {
  id: string;
  register: UseFormRegister<any>;
}

export const PasswordInput = ({ id, register }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToogle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-container">
      <input
        id={id}
        className="form-input password-input"
        type={showPassword ? 'text' : 'password'}
        {...register(id)}
      />
      <IconContext.Provider value={{ className: 'password-eye' }}>
        {showPassword ? (
          <AiFillEye onClick={handleToogle} />
        ) : (
          <AiFillEyeInvisible onClick={handleToogle} />
        )}
      </IconContext.Provider>
    </div>
  );
};
