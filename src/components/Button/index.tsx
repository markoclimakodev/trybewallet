import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  id?: string
  variantGreen?: boolean
}
function Button({ title, id = '', variantGreen = false, ...rest }:ButtonProps) {
  return (
    <button
      className={ `${variantGreen && styles.button_Green} ${styles.button}` }
      data-testid={ id }
      { ...rest }
    >
      {title}
    </button>
  );
}

export default Button;
