import { ReactComponent as TrashIcon } from '../../../styles/svg/trash.svg'

function DeleteButton({...props}) {
    return(
        <button {...props} className="function-button">
            <TrashIcon/>
        </button>
    )
}
export default DeleteButton;