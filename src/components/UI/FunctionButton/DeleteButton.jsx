import { ReactComponent as TrashIcon } from '../../../styles/svg/trash.svg'

function DeleteButton() {
    return(
        <button className="function-button">
            <TrashIcon/>
        </button>
    )
}
export default DeleteButton;