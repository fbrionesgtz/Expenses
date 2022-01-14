import "./ToggleSwitch.css";

const ToggleSwitch = props => {
    const handleToggle = (e) => {
        props.onToggle(e.target.checked ,props.action);
    };

    return <div>
        <label className="switch">
            <input onChange={handleToggle} type="checkbox"/>
            <span className="slider round"/>
        </label>
    </div>;
};

export default ToggleSwitch;
