-- database/init.sql
USE abc;


-- Drop Stores table if it exists to avoid conflicts during setup
DROP TABLE IF EXISTS stores;

-- Create the Stores table to store CSV data
CREATE TABLE stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    storeName VARCHAR(100),
    district VARCHAR(100),
    typeOfStore VARCHAR(50),
    sizeOfStore VARCHAR(50),
    revenue BIGINT,
    yearlyResult INT,
    resultAfterFinancialNet INT,
    totalAssets BIGINT,
    profitMargin FLOAT,
    solvency FLOAT,
    cashFlow FLOAT,
    grossProfitMargin FLOAT,
    numEmployees INT,
    numDeptStores INT,
    longitude DECIMAL(10, 8),
    latitude DECIMAL(10, 8)
);


-- Create the SavedCharts table for storing analysis results
DROP TABLE IF EXISTS SavedCharts;

CREATE TABLE SavedCharts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    columnsUsed JSON,
    chartType VARCHAR(50),
    dataSummary TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO stores (storeName, district, typeOfStore, sizeOfStore, revenue, yearlyResult, resultAfterFinancialNet, totalAssets, profitMargin, solvency, cashFlow, grossProfitMargin, numEmployees, numDeptStores, longitude, latitude) VALUES 
('Ahlens', 'Oster', 'Clothes', 'Medium/large', 5807316, -408336, -406569, 2573720, -0.0683, 0.661, 0.2519, 0.3533, 3000, 70, 14.174874559926424, 57.78237409771282),
('Akademibokhandeln', 'Oster', 'Book Store', 'Medium/small', 24, 14473, 7785, 566998, NULL, 0.1049, 0.0242, NULL, 580, 95, 14.171551942849105, 57.78660990431919),
('Apoteket AB', NULL, 'Medicin', 'Medium/small', 21297000, 402000, 516000, 13309000, 0.0251, 0.6333, 1.4335, 0.1864, 3500, 390, 14.174359573465336, 57.78305964824419),
('Apoteket AB', NULL, 'Medicin', 'Medium/small', 21297000, 402000, 516000, 13309000, 0.0251, 0.6333, 1.4335, 0.1864, 3500, 390, 14.174359573465336, 57.78305964824419),
('Apotek Hjartat', NULL, 'Medicin', 'Medium', 16962564, -621789, -14689, 4053176, 0.0009, 0.0289, 0.539, 0.2527, 3000, 390, 14.170115433417717, 57.783348181762314),
('Ashur Brud & Fest - Skradderi', NULL, 'Clothes', 'Small', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 14.15878435119998, 57.78281087027537),
('Asia livs', NULL, 'Laundry Store', 'Small', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 14.185679309322838, 57.781416791177094),
('Atelje Creativ i Jonkoping/Finrummet', 'Vaster', 'Art', 'Small', 150000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 14.162675310965714, 57.782590772091126);




