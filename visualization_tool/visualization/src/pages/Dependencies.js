
import { useLocation } from "react-router-dom";

function Dependencies(){
    let { state } = useLocation();
    const project = state.projectName;
    return(<div></div>)
}

export default Dependencies;