import { useLocation } from "react-router-dom";

function Principles(){
    let { state } = useLocation();
    const project = state.projectName;
    return <div></div>
}

export default Principles;