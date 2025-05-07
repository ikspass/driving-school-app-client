import classes from './Button.module.css'

const Button = ({children, ...props}) =>{
    return (
        <button {...props} className={`normal-text ${classes.button}`}>{children}</button>
    )
}

export default Button;