import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const Menu = (props) => {
    const handleToggle = (checked, action) => {
        props.onToggle(checked, action);
    };

    const handleChange = (e) => {
        let checked = e.target.checked;
        console.log(checked)
    };

    return <div>
        <div>
            <label>Delete</label>
            <ToggleSwitch
                onToggle={handleToggle}
                action={"delete"}
                defaultChecked={handleChange}
            />
        </div>
        <div>
            <label>Edit</label>
            <ToggleSwitch
                onToggle={handleToggle}
                action={"edit"}
            />
        </div>
    </div>;
}

export default Menu;