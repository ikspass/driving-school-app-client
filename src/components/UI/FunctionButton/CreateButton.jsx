import { ReactComponent as PlusIcon } from '../../../styles/svg/plus.svg'

function CreateButton({...props}) {
    return(
        <button {...props} className="function-button">
            <PlusIcon/>
        </button>
    )
}
export default CreateButton;