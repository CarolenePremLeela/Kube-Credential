-- Initialize database with proper permissions
CREATE DATABASE IF NOT EXISTS kube_credential_db;

-- Create application user with privileges
CREATE USER IF NOT EXISTS 'app_user'@'%' IDENTIFIED BY 'app_password';
GRANT ALL PRIVILEGES ON kube_credential_db.* TO 'app_user'@'%';
FLUSH PRIVILEGES;

-- Create tables
USE kube_credential_db;

CREATE TABLE IF NOT EXISTS credentials (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    credential_type VARCHAR(100) NOT NULL,
    credential_data JSON NOT NULL,
    worker_id VARCHAR(100) NOT NULL,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_credential (email, credential_type)
);

-- Insert sample data for testing (optional)
INSERT IGNORE INTO credentials (id, email, credential_type, credential_data, worker_id) 
VALUES 
('sample-id-1', 'test@example.com', 'degree', '{"name": "Test User", "degree": "BSc"}', 'worker-sample-1');