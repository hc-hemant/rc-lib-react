import styles from './Button.module.scss';
import { ButtonProps } from './Button.types';

const Button = ({ testId ,children, appearance='primary' }: ButtonProps) => {
    const btnStyles = appearance === 'secondary'
        ? styles['btn-secondary']
        : styles['btn-primary'];

    return <button 
        data-testid={`btn-${appearance}-${testId}`} 
        className={`${styles.btn} ${btnStyles}`}>
            {children}
        </button>;
}

export default Button;
