DROP TABLE IF EXISTS SavedCharts;

CREATE TABLE SavedCharts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    columnsUsed JSON,
    chartType VARCHAR(50),
    title VARCHAR(255),
    conclusion TEXT,
    dataSummary TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
