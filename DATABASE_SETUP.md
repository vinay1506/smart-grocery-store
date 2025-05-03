
# MySQL Database Setup for Grocery Store Application

This document provides instructions for setting up the MySQL database for the grocery store application.

## Database Structure

The application requires two main tables:

1. **categories** - Stores product categories
2. **products** - Stores product details with category references

## Database Schema

### Categories Table

```sql
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);
```

### Products Table

```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  categoryId INT,
  stock INT DEFAULT 0,
  description TEXT,
  image VARCHAR(255),
  FOREIGN KEY (categoryId) REFERENCES categories(id)
);
```

## Sample Data

### Insert Categories

```sql
INSERT INTO categories (name) VALUES
  ('Dairy'),
  ('Vegetables'),
  ('Beverages');
```

### Insert Products

```sql
INSERT INTO products (name, price, categoryId, stock, description, image) VALUES
  ('Milk', 2.50, 1, 100, 'Fresh milk', 'https://images.unsplash.com/photo-1635174241296-82d5762cd93e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1pbGt8ZW58MHx8MHx8&auto=format&fit=crop&w=300&h=300&q=80'),
  ('Apple', 1.20, 2, 200, 'Red apples', 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=300&h=300&q=80'),
  ('Orange Juice', 3.99, 3, 50, 'Fresh orange juice', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8anVpY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=300&h=300&q=80'),
  ('Cheese', 4.50, 1, 75, 'Cheddar cheese', 'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2hlZXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80'),
  ('Tomato', 1.00, 2, 150, 'Fresh tomatoes', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dG9tYXRvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80'),
  ('Coffee', 5.99, 3, 40, 'Ground coffee', 'https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80'),
  ('Yogurt', 2.75, 1, 80, 'Greek yogurt', 'https://images.unsplash.com/photo-1579954793243-3ba31251662d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8eW9ndXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80'),
  ('Carrot', 0.75, 2, 180, 'Fresh carrots', 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fycm90fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80');
```

## Configuration

To connect your application to the MySQL database, set the following environment variables:

- `DB_HOST`: Your MySQL host (default: localhost)
- `DB_USER`: Your MySQL username (default: root)
- `DB_PASSWORD`: Your MySQL password (default: empty string)
- `DB_NAME`: Your database name (default: grocery_store)

For local development, if you're not using environment variables, you can modify the default values in `src/utils/db.ts`.
