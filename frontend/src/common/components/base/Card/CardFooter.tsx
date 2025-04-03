import { ReactNode } from 'react';

interface Props {
  className?: string;
  children?: ReactNode;
}

const CardFooter = ({ className = '', children }: Props) => {
  return (
    <div className={`p-3 card-actions justify-center ${className}`}>
      {children}
    </div>
  );
};
export default CardFooter;
