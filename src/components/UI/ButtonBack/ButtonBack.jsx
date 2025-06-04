import { ReactComponent as ArrowIcon } from './arrow-left.svg'
import classes from './ButtonBack.module.css'

const ButtonBack = () => {
    return (
        <div className={classes.buttonBack}>
            <ArrowIcon/>
            <p className="normal-text">Назад</p>
        </div>
    )
}
export default ButtonBack;