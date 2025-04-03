import { ReactNode } from 'react';

interface Props {
  className?: string;
  children?: ReactNode;
}

const CardBody = ({ className = '', children }: Props) => {
  return <div className={`border-primary/30 ${className}`}>{children}</div>;
};

export default CardBody;
