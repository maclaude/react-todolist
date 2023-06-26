import { IconContext, IconType } from 'react-icons';

type ReactIconProps = {
  className: string;
  icon: IconType;
};

export const ReactIcon = ({ className, icon: Icon }: ReactIconProps) => {
  return (
    <IconContext.Provider value={{ className: `${className}` }}>
      <Icon />
    </IconContext.Provider>
  );
};
