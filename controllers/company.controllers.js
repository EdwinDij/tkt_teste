const fs = require('fs');
const file = fs.readFileSync('config\\tkt_mock_data(1).json')
const data = JSON.parse(file);


//basic functions 


exports.getCompanies = (req, res) => {
    res.send(data);
}

exports.addCompanies = (req, res) => {
    const newCompany = {
        "name": req.body.name,
        "sector": req.body.sector,
        "siren": req.body.siren,
        "results": [
            {
                "ca": req.body.ca,
                "margin": req.body.margin,
                "ebitda": req.body.ebitda,
                "loss": req.body.loss,
                "year": req.body.year
            },
            {
                "ca": req.body.ca1,
                "margin": req.body.margin1,
                "ebitda": req.body.ebitda1,
                "loss": req.body.loss1,
                "year": req.body.year1,
            },
        ]
    }
    if (data.some(company => company.name === newCompany.name)) {
        res.status(400).send('Company already exists');
    }
    if (!newCompany.name && !newCompany.sector && !newCompany.siren && !newCompany.results[0].ca && !newCompany.results[0].margin &&
        !newCompany.results[0].ebitda && !newCompany.results[0].loss && !newCompany.results[0].year && !newCompany.results[1].ca
        && !newCompany.results[1].margin && !newCompany.results[1].ebitda
        && !newCompany.results[1].loss && !newCompany.results[1].year) {
        res.status(400).send('Please fill all the fields');
    } else {
        fs.readFile('./config/tkt_mock_data(1).json', 'utf8', function (err, data) {
            if (err) throw err;
            let companies = JSON.parse(data);
            companies.push(newCompany);
            fs.writeFile('./config/tkt_mock_data(1).json', JSON.stringify(companies), 'utf8', function (err) {
                if (err) throw err;
                console.log("The new company was added to the file successfully.");
            });
        })
        res.status(201).send(newCompany);
    }
}

exports.addNewResults =(req, res) => {
    const companySiren = req.params.siren;
    const newResults = {
        "ca": req.body.ca,
        "margin": req.body.margin,
        "ebitda": req.body.ebitda,
        "loss": req.body.loss,
        "year": req.body.year
    }
    const companyToUpdate = data.find(company => company.siren == companySiren);
    if (!companyToUpdate) {
        res.status(400).send('Company not found');
    } else {
        companyToUpdate.results.unshift(newResults);
        fs.writeFile('./config/tkt_mock_data(1).json', JSON.stringify(data), 'utf8', function (err) {
            if (err) throw err;
            console.log("New results add to the new file.");
        });
        res.status(200).send(companyToUpdate);
    }
}

exports.deleteCompany = (req, res) => {
    const companySiren = req.params.siren;
   //find the company by siren and delete it
    const companyToDelete = data.find(company => company.siren == companySiren);
    if (!companyToDelete) {
        res.status(400).send('Company not found');
    } else {
        const index = data.indexOf(companyToDelete);
        data.splice(index, 1);
        fs.writeFile('./config/tkt_mock_data(1).json', JSON.stringify(data), 'utf8', function (err) {
            if (err) throw err;
            console.log("The company was deleted from the file successfully.");
        });
        res.status(200).send(companyToDelete);
    }
};


//sorted functions
//sort data by name
exports.sortCompaniesByName = (req, res) => {
    const sortedCompanies = data.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
    res.send(sortedCompanies);
}

exports.sortCompaniesBySector = (req, res) => {
    const sortedCompanies = data.sort((a, b) => {
        if (a.sector < b.sector) {
            return -1;
        }
        if (a.sector > b.sector) {
            return 1;
        }
        return 0;
    });
    res.send(sortedCompanies);
}

exports.sortCompaniesBySiren = (req, res) => {
    const sortedCompanies = data.sort((a, b) => {
        if (a.siren < b.siren) {
            return -1;
        }
        if (a.siren > b.siren) {
            return 1;
        }
        return 0;
    });
    res.send(sortedCompanies);
}

exports.sortCompaniesByCa = (req, res) => {
    const sortedCompanies = data.sort((a, b) => {
        if (a.results[0].ca < b.results[0].ca) {
            return -1;
        }
        if (a.results[0].ca > b.results[0].ca) {
            return 1;
        }
        return 0;
    });
    res.send(sortedCompanies);
}

exports.sortCompaniesByPreviousCa = (req, res) => {
    const sortedCompanies = data.sort((a, b) => {
        if (a.results[1].margin < b.results[1].margin) {
            return -1;
        }
        if (a.results[1].margin > b.results[1].margin) {
            return 1;
        }
        return 0;
    });
    res.send(sortedCompanies);
}

exports.sortCompaniesByMargin = (req, res) => {
    const sortedCompanies = data.sort((a, b) => {
        if (a.results[0].margin < b.results[0].margin) {
            return -1;
        }
        if (a.results[0].margin > b.results[0].margin) {
            return 1;
        }
        return 0;
    });
    res.send(sortedCompanies);
}

exports.sortCompaniesByPreviousMargin = (req, res) => {
    const sortedCompanies = data.sort((a, b) => {
        if (a.results[1].margin < b.results[1].margin) {
            return -1;
        }
        if (a.results[1].margin > b.results[1].margin) {
            return 1;
        }
        return 0;
    });
    res.send(sortedCompanies);
}

exports.sortCompaniesByEbitda = (req, res) => {
    const sortedCompanies = data.sort((a, b) => {
        if (a.results[0].ebitda < b.results[0].ebitda) {
            return -1;
        }
        if (a.results[0].ebitda > b.results[0].ebitda) {
            return 1;
        }
        return 0;
    });
    res.send(sortedCompanies);
}

exports.sortCompaniesByPreviousEbitda = (req, res) => {
    const sortedCompanies = data.sort((a, b) => {
        if (a.results[1].ebitda < b.results[1].ebitda) {
            return -1;
        }
        if (a.results[1].ebitda > b.results[1].ebitda) {
            return 1;
        }
        return 0;
    });
    res.send(sortedCompanies);
}

exports.sortCompaniesByLoss = (req, res) => {
    const sortedCompanies = data.sort((a, b) => {
        if (a.results[0].loss < b.results[0].loss) {
            return -1;
        }
        if (a.results[0].loss > b.results[0].loss) {
            return 1;
        }
        return 0;
    });
    res.send(sortedCompanies);
}

exports.sortCompaniesByPreviousLoss = (req, res) => {
    const sortedCompanies = data.sort((a, b) => {
        if (a.results[1].loss < b.results[1].loss) {
            return -1;
        }
        if (a.results[1].loss > b.results[1].loss) {
            return 1;
        }
        return 0;
    });
    res.send(sortedCompanies);
}


exports.filterCompaniesBySector = (req, res) => {
    const sector = req.params.sector;
    const filteredCompanies = data.filter(c => c.sector === sector);
    res.send(filteredCompanies);

}

exports.filterCompaniesBySiren = (req, res) => {
    const siren = req.params.siren;
    const filteredCompanies = data.filter(c => c.siren == siren);
    res.send(filteredCompanies);
}

