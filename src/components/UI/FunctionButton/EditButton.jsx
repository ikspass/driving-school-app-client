import { ReactComponent as EditIcon } from '../../../styles/svg/edit.svg';

function EditButton({...props}) {
    return(
        <button {...props} className="function-button">
            <EditIcon/>
        </button>
    )
}
export default EditButton;