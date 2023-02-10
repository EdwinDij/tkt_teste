const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const companyRoutes = require('./Routes/company.routes.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello from the server');
}
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/companies', companyRoutes);

module.exports = app;
