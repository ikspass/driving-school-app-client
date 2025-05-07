const Input = ({title, ...props}) =>{
    return (
        <div className="main-input">
        <p className="small-text">{title}</p>
        <input className="normal-text" {...props} />
    </div>
    )

}

export default Input;