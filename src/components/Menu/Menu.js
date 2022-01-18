import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import React, {useState, useReducer} from "react";
import "./Menu.css";
import IconMenu from "../IconsComponents/IconMenu";
import IconX from "../IconsComponents/IconX";

const toggleReducer = (state, action) => {
    if (action.type === "delete" && action.checked) {
        return {editToggle: false, deleteToggle: true}
    }

    if (!state.editToggle && action.type === "delete" && !action.checked) {
        return {editToggle: false, deleteToggle: false}
    }

    if (action.type === "edit" && action.checked) {
        return {editToggle: true, deleteToggle: false}
    }

    if (!state.deleteToggle && action.type === "edit" && !action.checked) {
        return {editToggle: false, deleteToggle: false}
    }
};

const Menu = (props) => {
    const [displayMenu, setDisplayMenu] = useState(false);
    const [activeToggle, dispatchActiveToggle] = useReducer(toggleReducer, {
        editToggle: false,
        deleteToggle: false
    });

    const handleOpenMenu = () => {
        setDisplayMenu(true);
    };

    const handleCloseMenu = () => {
        setDisplayMenu(false);
    };

    const handleToggle = (checked, action) => {
        props.onToggle(checked, action);
    };

    const handleChange = (checked, action) => {
        dispatchActiveToggle({type: action, checked: checked});
    };

    return <div className="menu">
        {!displayMenu ? <button type="button" onClick={handleOpenMenu}>
                <IconMenu height="2.5em" width="2.5em" color="white" strokeWidth="0.17em"/>
            </button> :
            <div className="menu-open">
                <button type="button" onClick={handleCloseMenu}>
                    <IconX height="2.5em" width="2.5em" color="white" strokeWidth="0.17em"/>
                </button>
                <div className="menu-option">
                    <label>Delete</label>
                    <ToggleSwitch
                        onToggle={handleToggle}
                        onChange={handleChange}
                        action={"delete"}
                        checked={activeToggle.deleteToggle}
                    />
                </div>
                <div className="menu-option">
                    <label>Edit</label>
                    <ToggleSwitch
                        onToggle={handleToggle}
                        onChange={handleChange}
                        action={"edit"}
                        checked={activeToggle.editToggle}
                    />
                </div>
            </div>}
    </div>;
}

export default Menu;