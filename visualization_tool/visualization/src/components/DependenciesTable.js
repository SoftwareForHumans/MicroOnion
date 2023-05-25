import { Tooltip } from "react-tooltip";

function DependenciesTable(props) {
  const tableContent = props.tableContent;
  
  function createArrayElement(arr) {
    let res = [];

    for (let [key, listOfDependencies] of arr) {
      let el = [];
      const size = listOfDependencies.length;
      el.push(
        <td className="px-3" rowSpan={size}>
          {key}
        </td>
      );
      Object.keys(listOfDependencies).map((k) => {
        
       
        for (let m of listOfDependencies[k]){
          if (el.length > 1) {
            el = [];
            el.push(<td></td>);
          }
          let dep = m[0].split(".").pop();
          el.push(
            <td
              className="px-3"
              style={{
                borderRight: "2px solid #092256",
                borderLeft: "2px solid #092256",
              }}
            >
              {k}
            </td>
          );
          el.push(
            <td
              className="px-3"
              data-tooltip-id="file-name"
              data-tooltip-content={m[0]}
              style={{ borderRight: "2px solid #092256" }}
            >
              {dep}
            </td>
          );
  
          let deps = "";
          m.map((v, index) => {
            if (v !== m[0]) {
              deps += v;
              if (index !== m.length - 1) {
                deps += ", ";
              }
            }
            return deps;
          });
          el.push(<td className="px-3">{deps}</td>);
          res.push(el);
          
        }
        return res;
      });
         
        }

    return res;
  }
  return (
    <>
      <table className="blue-text" style={{ border: "2px solid #092256", width: "100%", backgroundColor:"white"}}>
        <thead>
          <tr
            style={{
              border: "2px solid #092256",
              backgroundColor: "#092256",
              color: "white",
            }}
          >
            <th className="px-3" style={{ borderRight: "2px solid #092256" }}>
              Component
            </th>
            <th className="px-3" style={{ borderRight: "2px solid #092256" }}>
              File
            </th>
            <th className="px-3" style={{ borderRight: "2px solid #092256" }}>
              Dependency
            </th>
            <th className="px-3" style={{ borderRight: "2px solid #092256" }}>
              Type
            </th>
          </tr>
        </thead>
        <tbody>
          <Tooltip id="file-name" />
          {createArrayElement(tableContent).map((obj) => (
            <tr>{obj}</tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DependenciesTable;
