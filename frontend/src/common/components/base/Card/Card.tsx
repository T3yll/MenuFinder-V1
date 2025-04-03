import { ReactNode, MouseEvent } from 'react';

interface Props {
  className?: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  children: ReactNode[] | ReactNode;
}

const Card = ({ className = '', children, onClick }: Props) => {
  return (
    <div
      className={`card shadow-lg rounded bg-base-100 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
