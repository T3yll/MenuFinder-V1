import { ReactNode } from 'react';

interface Props {
  className?: string;
  children?: ReactNode;
}

const CardHeader = ({ className = '', children }: Props) => {
  return (
    <div className={`card-title font-medium py-3 pl-2 ${className}`}>
      {children}
    </div>
  );
};

export default CardHeader;
