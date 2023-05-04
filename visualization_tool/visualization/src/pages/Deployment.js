import { useLocation } from "react-router-dom";

function Deployment(){
    let { state } = useLocation();
    const project = state.projectName;
    return <div></div>
}

export default Deployment;