import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { ReactIcon } from './ReactIcon';

import '../styles/PasswordInput.scss';

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
      <ReactIcon
        icon={showPassword ? AiFillEye : AiFillEyeInvisible}
        className="password-eye"
        onClick={handleToogle}
      />
    </div>
  );
};
