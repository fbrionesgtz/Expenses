import {Fragment} from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Backdrop = (props) => {
    return <div className="backdrop"
                onClick={props.onClickBackdrop}
    />
};

const ModalOverlay = (props) => {
    return <div className="modal">
        <div>{props.children}</div>
    </div>
};

const portalDestination = document.getElementById("overlays");

const Modal = (props) => {
    return <Fragment>
        {ReactDOM.createPortal(
            <Backdrop
                onClickBackdrop={props.onClickBackdrop}
            />, portalDestination)}
        {ReactDOM.createPortal(
            <ModalOverlay>{props.children}</ModalOverlay>,
            portalDestination)}
    </Fragment>;
};

export default Modal;