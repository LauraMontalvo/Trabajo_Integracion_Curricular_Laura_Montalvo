const express = require('express');
const cors = require('cors');  
const app = express();
const port = 8000;

require('./config/mongoose.config.js');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

const allRolRoutes = require('./routes/rol.routes');
allRolRoutes(app);

const allUserRoutes = require('./routes/user.routes');
allUserRoutes(app);

const allSchoolRoutes = require('./routes/school.routes');
allSchoolRoutes(app);

const allAcadTrainingRoutes = require('./routes/acadTraining.routes');
allAcadTrainingRoutes(app);

const allCertificationRoutes = require('./routes/certification.routes');
allCertificationRoutes(app);

const allWorkExperienceRoutes = require('./routes/workExperience.routes');
allWorkExperienceRoutes(app);

const allCompanyRoutes = require('./routes/company.routes');
allCompanyRoutes(app);

const allJobRoutes = require('./routes/job.routes');
allJobRoutes(app);

const allPostulationRoutes = require('./routes/postulation.routes');
allPostulationRoutes(app);

const allLogInRoutes = require('./routes/login.routes');
allLogInRoutes(app);

app.listen(port, () => console.log("Server is listening at port ", port));