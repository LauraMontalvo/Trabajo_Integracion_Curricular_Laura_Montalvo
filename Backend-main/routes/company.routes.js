const CompanyController = require('../controllers/company.controller');

module.exports = function(app){
    app.post('/api/company/new', CompanyController.createCompany);
    app.get('/api/companies', CompanyController.getAllCompanies);
    app.get('/api/company/:id',CompanyController.getCompany);
    app.put('/api/company/:id/',CompanyController.updateCompany);
    app.delete('/api/company/:id', CompanyController.deleteCompany);
}