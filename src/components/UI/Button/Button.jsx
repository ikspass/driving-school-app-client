import classes from './Button.module.css';

const Button = ({ children, disabled, className, ...props }) => {
    return (
        <button 
            {...props} 
            className={`${className} normal-text ${classes.button} ${disabled ? classes.disabled : ''} ${className === 'outline' ? classes.outline : ''} ${className === 'danger' ? classes.danger : ''}`}
            disabled={disabled} // Передаем значение disabled
        >
            {children}
        </button>
    );
};

export default Button;