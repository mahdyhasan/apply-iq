-- ApplyIQ Bangladesh - MySQL Database Schema
-- Complete schema for resume building platform

-- Create database
CREATE DATABASE IF NOT EXISTS applyiq_bangladesh CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE applyiq_bangladesh;

-- 1. Users table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
);

-- 2. User Profiles & Onboarding
CREATE TABLE user_profiles (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    career_goal TEXT,
    experience_level ENUM('entry', 'mid', 'senior', 'executive'),
    industry VARCHAR(255),
    location VARCHAR(255),
    onboarding_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_profile (user_id),
    INDEX idx_user_id (user_id),
    INDEX idx_onboarding (onboarding_completed)
);

-- 3. Subscription Packages
CREATE TABLE packages (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price_bdt INT,
    billing_period VARCHAR(20),
    resume_limit INT NOT NULL,
    revision_limit INT NOT NULL,
    job_match_limit INT NOT NULL,
    features JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_active (is_active),
    INDEX idx_price (price_bdt)
);

-- 4. User Subscriptions
CREATE TABLE user_subscriptions (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    package_id VARCHAR(50) NOT NULL,
    status ENUM('active', 'cancelled', 'expired') DEFAULT 'active',
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP NULL,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (package_id) REFERENCES packages(id),
    INDEX idx_user_status (user_id, status),
    INDEX idx_dates (start_date, end_date),
    INDEX idx_transaction (transaction_id)
);

-- 5. Resumes
CREATE TABLE resumes (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content JSON,
    template_id VARCHAR(100),
    ats_score INT CHECK (ats_score >= 0 AND ats_score <= 100),
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_status (user_id, status),
    INDEX idx_updated (updated_at),
    INDEX idx_ats_score (ats_score)
);

-- 6. Resume Revisions
CREATE TABLE resume_revisions (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    resume_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    changes JSON,
    revision_number INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_resume_revision (resume_id, revision_number),
    INDEX idx_user_revisions (user_id),
    INDEX idx_created (created_at)
);

-- 7. Job Matches
CREATE TABLE job_matches (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    salary VARCHAR(100),
    match_score INT CHECK (match_score >= 0 AND match_score <= 100),
    job_data JSON,
    source VARCHAR(100),
    applied_at TIMESTAMP NULL,
    saved_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_score (user_id, match_score DESC),
    INDEX idx_company (company),
    INDEX idx_location (location),
    INDEX idx_created (created_at)
);

-- 8. Usage Tracking
CREATE TABLE usage_stats (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    month_year VARCHAR(7) NOT NULL, -- Format: '2024-01'
    resumes_created INT DEFAULT 0,
    revisions_used INT DEFAULT 0,
    jobs_viewed INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_month (user_id, month_year),
    INDEX idx_month_year (month_year),
    INDEX idx_last_updated (last_updated)
);

-- 9. Payment Transactions
CREATE TABLE payment_transactions (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    subscription_id VARCHAR(36),
    amount_bdt INT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(255),
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subscription_id) REFERENCES user_subscriptions(id) ON DELETE SET NULL,
    INDEX idx_user_payment (user_id),
    INDEX idx_status (status),
    INDEX idx_transaction_id (transaction_id),
    INDEX idx_created (created_at)
);

-- 10. File Uploads (for resume files)
CREATE TABLE file_uploads (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    resume_id VARCHAR(36),
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    upload_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE SET NULL,
    INDEX idx_user_files (user_id),
    INDEX idx_resume_files (resume_id),
    INDEX idx_status (upload_status)
);

-- Insert Package Data
INSERT INTO packages (id, name, price_bdt, billing_period, resume_limit, revision_limit, job_match_limit, features) VALUES
('free', 'Free', 0, 'lifetime', 1, 3, 0, JSON_ARRAY(
    '1 resume creation',
    '3 revision attempts', 
    'Basic templates',
    'PDF export'
)),

('starter', 'Starter', 200, 'monthly', 1, 10, 3, JSON_ARRAY(
    '1 professional resume',
    '10 revision attempts',
    'Premium templates', 
    'ATS optimization',
    '3 job matches daily',
    'Basic job filters',
    'PDF & DOCX export',
    'Email support'
)),

('premium', 'Premium', 500, 'monthly', 5, -1, -1, JSON_ARRAY(
    '5 resume variations',
    'Unlimited revisions',
    'All premium templates',
    'Advanced ATS scoring', 
    'Unlimited job matches',
    'Advanced job filters',
    '24-hour job refresh',
    'Cover letter generator',
    'LinkedIn profile optimization',
    'Priority support'
)),

('elite', 'Elite', 1000, 'monthly', -1, -1, -1, JSON_ARRAY(
    'Unlimited resumes',
    'Unlimited revisions',
    'Exclusive templates',
    'AI-powered optimization',
    'Personal job curator',
    'Company insights', 
    'Interview preparation',
    'Salary negotiation tips',
    '1-on-1 career consultation',
    'Direct recruiter connections',
    '24/7 priority support'
));

-- Create stored procedures for common operations

-- Procedure to create a new user with profile and free subscription
DELIMITER //
CREATE PROCEDURE CreateUser(
    IN p_email VARCHAR(255),
    IN p_password_hash VARCHAR(255),
    IN p_full_name VARCHAR(255),
    IN p_phone VARCHAR(20)
)
BEGIN
    DECLARE user_id VARCHAR(36);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Create user
    SET user_id = UUID();
    INSERT INTO users (id, email, password_hash, full_name, phone)
    VALUES (user_id, p_email, p_password_hash, p_full_name, p_phone);
    
    -- Create user profile
    INSERT INTO user_profiles (user_id, onboarding_completed)
    VALUES (user_id, FALSE);
    
    -- Assign free package
    INSERT INTO user_subscriptions (user_id, package_id, status)
    VALUES (user_id, 'free', 'active');
    
    -- Initialize usage stats for current month
    INSERT INTO usage_stats (user_id, month_year, resumes_created, revisions_used, jobs_viewed)
    VALUES (user_id, DATE_FORMAT(NOW(), '%Y-%m'), 0, 0, 0);
    
    COMMIT;
    SELECT user_id;
END //
DELIMITER ;

-- Procedure to upgrade user package
DELIMITER //
CREATE PROCEDURE UpgradeUserPackage(
    IN p_user_id VARCHAR(36),
    IN p_package_id VARCHAR(50),
    IN p_payment_method VARCHAR(50),
    IN p_transaction_id VARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- End current subscription
    UPDATE user_subscriptions 
    SET status = 'cancelled', end_date = NOW()
    WHERE user_id = p_user_id AND status = 'active';
    
    -- Create new subscription
    INSERT INTO user_subscriptions (user_id, package_id, status, payment_method, transaction_id)
    VALUES (p_user_id, p_package_id, 'active', p_payment_method, p_transaction_id);
    
    COMMIT;
END //
DELIMITER ;

-- Procedure to increment usage stats
DELIMITER //
CREATE PROCEDURE IncrementUsage(
    IN p_user_id VARCHAR(36),
    IN p_field VARCHAR(50)
)
BEGIN
    DECLARE current_month VARCHAR(7);
    SET current_month = DATE_FORMAT(NOW(), '%Y-%m');
    
    IF p_field = 'resumes_created' THEN
        INSERT INTO usage_stats (user_id, month_year, resumes_created, revisions_used, jobs_viewed)
        VALUES (p_user_id, current_month, 1, 0, 0)
        ON DUPLICATE KEY UPDATE 
            resumes_created = resumes_created + 1,
            last_updated = NOW();
    ELSEIF p_field = 'revisions_used' THEN
        INSERT INTO usage_stats (user_id, month_year, resumes_created, revisions_used, jobs_viewed)
        VALUES (p_user_id, current_month, 0, 1, 0)
        ON DUPLICATE KEY UPDATE 
            revisions_used = revisions_used + 1,
            last_updated = NOW();
    ELSEIF p_field = 'jobs_viewed' THEN
        INSERT INTO usage_stats (user_id, month_year, resumes_created, revisions_used, jobs_viewed)
        VALUES (p_user_id, current_month, 0, 0, 1)
        ON DUPLICATE KEY UPDATE 
            jobs_viewed = jobs_viewed + 1,
            last_updated = NOW();
    END IF;
END //
DELIMITER ;

-- Create views for easier data access

-- View for user dashboard data
CREATE VIEW user_dashboard_data AS
SELECT 
    u.id,
    u.email,
    u.full_name,
    up.onboarding_completed,
    up.career_goal,
    up.experience_level,
    up.industry,
    up.location,
    us.package_id,
    p.name as package_name,
    p.price_bdt,
    p.billing_period,
    p.resume_limit,
    p.revision_limit,
    p.job_match_limit,
    p.features,
    us.status as subscription_status,
    us.start_date,
    us.end_date,
    COALESCE(ust.resumes_created, 0) as resumes_created,
    COALESCE(ust.revisions_used, 0) as revisions_used,
    COALESCE(ust.jobs_viewed, 0) as jobs_viewed
FROM users u
LEFT JOIN user_profiles up ON u.id = up.user_id
LEFT JOIN user_subscriptions us ON u.id = us.user_id AND us.status = 'active'
LEFT JOIN packages p ON us.package_id = p.id
LEFT JOIN usage_stats ust ON u.id = ust.user_id AND ust.month_year = DATE_FORMAT(NOW(), '%Y-%m');

-- View for resume list with revision count
CREATE VIEW resume_list AS
SELECT 
    r.id,
    r.user_id,
    r.title,
    r.template_id,
    r.ats_score,
    r.status,
    r.created_at,
    r.updated_at,
    COUNT(rr.id) as revision_count
FROM resumes r
LEFT JOIN resume_revisions rr ON r.id = rr.resume_id
GROUP BY r.id, r.user_id, r.title, r.template_id, r.ats_score, r.status, r.created_at, r.updated_at;

-- Sample data for testing (optional)
-- Uncomment the following if you want sample data

/*
-- Create a demo user
CALL CreateUser(
    'demo@applyiq.bd',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: password
    'Demo User',
    '+880123456789'
);

-- Add some sample job matches (you'll need the actual user_id from above)
-- INSERT INTO job_matches (user_id, job_title, company, location, salary, match_score, job_data, source) VALUES
-- ('[USER_ID]', 'Senior Software Engineer', 'BRAC Bank', 'Dhaka', '৳80,000-120,000', 95, 
--  JSON_OBJECT('type', 'Full-time', 'experience', '4-6 years', 'posted', '2 hours ago'), 'BDJobs');
*/

-- Index optimization for better performance
ANALYZE TABLE users, user_profiles, packages, user_subscriptions, resumes, resume_revisions, job_matches, usage_stats, payment_transactions, file_uploads;
