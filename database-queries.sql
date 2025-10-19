-- SQLTools Connection Configuration for Eventra Database
-- This file can be used to test SQL queries against your Render PostgreSQL database

-- Connection Details (Already configured in VS Code SQLTools):
-- Connection name: eventra
-- Server: dpg-d3p1tu2li9vc73cojcqg-a.oregon-postgres.render.com
-- Port: 5432
-- Database: eventra_backend_db
-- Username: eventra_backend_db_user
-- Password: RzUNMl80MiW1nWyNWYz3wdFp5uxlE1rR
-- SSL: Required

-- Test Queries:

-- 1. Check database connection
SELECT NOW() as current_time, version() as postgres_version;

-- 2. List all tables in the database
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- 3. Check users table
SELECT id, email, "firstName", "lastName", role, "isActive", "createdAt"
FROM users
LIMIT 10;

-- 4. Check events table
SELECT id, title, description, category, status, "startDate", "endDate", "organizerId"
FROM events
LIMIT 10;

-- 5. Count records in each table
SELECT 
    'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 
    'events' as table_name, COUNT(*) as record_count FROM events
UNION ALL
SELECT 
    'registrations' as table_name, COUNT(*) as record_count FROM registrations;

-- 6. Check database schema version
SELECT * FROM "_prisma_migrations" ORDER BY "finished_at" DESC LIMIT 5;