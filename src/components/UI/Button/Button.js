const Button = (props) => {
    return <button
        type={props.type ? props.type : "button"}
        className={props.classes}
        onClick={props.onClick}>
        {props.content}
    </button>
}

export default Button;