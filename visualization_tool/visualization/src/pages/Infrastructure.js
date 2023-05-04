
import { useLocation } from "react-router-dom";

function Infrastructure(){
    let { state } = useLocation();
    const project = state.projectName;
    return <div></div>
}

export default Infrastructure;