import "../Button/Button.css";
import Button from "../Button/Button";

const ModalForm = (props) => {
    return <div>
        <p>{props.prompt}</p>
        <Button
            onClick={props.btnYesOnClick}
            content="Yes"
            classes="btnPrimary"
        />
        <Button
            onClick={props.btnNoOnClick}
            content="No"
            classes="btnPrimary"
        />
    </div>
}

export default ModalForm;