import classes from './Button.module.css';

const Button = ({ children, className, ...props }) => {
    return (
        <button {...props} className={`${className} normal-text ${classes.button} ${className === 'outline' ? classes.outline : classes.primary}`}>
            {children}
        </button>
    );
};

export default Button;