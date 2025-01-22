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


INSERT INTO stores (storeName, district, typeOfStore, sizeOfStore, revenue, yearlyResult, resultAfterFinancialNet, totalAssets, profitMargin, solvency, cashFlow, grossProfitMargin, numEmployees, numDeptStores)
VALUES
('Ahlens', 'Oster', 'Clothes', 'Medium/large', 5807316, -408336, -406569, 2573720, -6.8, 66.1, 25.2, 35.3, 3000, 70),
('Akademibokhandeln', 'Oster', 'Book Store', 'Medium/small', 24, 14473, 7785, 566998, 0, 10.5, 2.4, 0, 580, 95),
('Apoteket AB', 'Ingen', 'Medicin', 'Medium/small', 21297000, 402000, 516000, 13309000, 2.5, 63.3, 143.4, 18.6, 3500, 390),
('Apotek Hjartat', 'Ingen', 'Medicin', 'Medium', 16962564, -621789, -14689, 4053176, 0.1, 2.9, 53.9, 25.3, 3000, 390),
('Ashur Brud & Fest - Skradderi', 'Ingen', 'Clothes', 'Small', 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
('Asia livs', 'Ingen', 'Laundry Store', 'Small', 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
('Atelje Creativ i Jonkoping/Finrummet', 'Vaster', 'Art', 'Small', 150000, 0, 0, 0, 0, 0, 0, 0, 0, 1);


