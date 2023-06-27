import { MouseEventHandler } from 'react';
import { IconContext, IconType } from 'react-icons';

type ReactIconProps = {
  className: string;
  icon: IconType;
  onClick?: MouseEventHandler;
};

export const ReactIcon: React.FC<ReactIconProps> = ({
  icon: Icon,
  className,
  onClick,
}) => {
  return (
    <IconContext.Provider value={{ className: `${className}` }}>
      <Icon onClick={onClick} />
    </IconContext.Provider>
  );
};
