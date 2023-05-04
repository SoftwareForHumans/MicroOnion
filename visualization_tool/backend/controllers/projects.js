const fs = require('fs');
const path = require('path');

exports.getProjects = async (req, res) => {
    res.status(200).send();
};

exports.getProject = async (req, res) => {
    const { name } = req.params;
    const folder = getProjectFolder(name);

    try {
        const jsonPath = path.join(__dirname, '..', 'files', folder, '/refactorings_sequence.json');
        const data = fs.readFileSync(jsonPath, 'utf8');
        let jsonData = JSON.parse(data);
        
        res.status(200).json();
    } catch (err) {
        console.log(err);
        res.status(400).send();
    }
};


function getProjectFolder(name){
    if (name.toLowerCase().includes('restaurant')) return "restaurantServer"
    else if (name.toLowerCase().includes('proyecto')) return "proyectoUNAM"
    else if (name.toLowerCase().includes("hotel")) return "hotelManagementSystem"
    else return ""
}