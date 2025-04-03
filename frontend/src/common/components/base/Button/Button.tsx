import '@/common/components/base/Button/Button.css';

type ButtonType = 'button' | 'submit' | 'reset';

interface Props {
  tooltip?: string;
  className?: string;
  type?: ButtonType;
  form?: string;
  onClick?: (arg?: any) => void;
  disabled?: boolean; // Ajout de disabled
  children: React.ReactNode;
}

const Button = ({
  tooltip = '',
  className = '',
  type = 'button',
  form = '',
  onClick,
  disabled = false, // Valeur par défaut
  children,
}: Props) => {
  return (
    <button
      className={`btn px-2 ${className}`}
      title={tooltip}
      type={type}
      form={form}
      onClick={(e) => onClick && onClick(e)}
      disabled={disabled} // Ajout ici
    >
      {children}
    </button>
  );
};

export default Button;
