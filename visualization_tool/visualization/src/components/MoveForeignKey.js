// tem sempre a opção de replicar os dados - tentar incluir
//split table - impossivel incluir

// # - remove foreign key constraints - remover anotação
//         # - in th entity class creare an instance variable that represents the other entity involved
//         # - create two separate databases
//         # - create an interface for each of these database that implements the methods of data manipulation - criar interface para a entidade
//         # - identify the methods tha use/manipulate data from different databases and change them to use the newly created interfaces

//         # - change local methods call to service calls using the primary key as a parameter
import Col from "react-bootstrap/Col";
import SquaredButton from "../components/SquaredButton";
function MoveForeignKey(props) {
    const project = props.project;
    const service = props.service;
    const index = props.index;
    const refactoring = props.refactoring;
    console.log(refactoring)
    return (
      <>
        <h6 className="py-2">{(index + 1).toString() + ". " + refactoring.name[0] + refactoring.name.slice(1).toLowerCase()}</h6>
        {refactoring.refactorings &&
          refactoring.refactorings.map((item, index) => {
            return (
              <>
                <Col className="d-inline">
                  <SquaredButton
                    item={item}
                    // handleClick={setRefactoring}
                    sequence={refactoring.refactorings}
                    index={index}
                    color="#1E488F"
                  ></SquaredButton>
                </Col>
              </>
            );
          })}
      </>
    );
}

export default MoveForeignKey;
