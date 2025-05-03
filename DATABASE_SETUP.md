
# MySQL Database Setup for Grocery Store Application

This document provides instructions for setting up the MySQL database for the grocery store application.

## Database Structure

The application uses the following tables:

1. **Admin** - Store administrator information
2. **Customer** - Store customer information
3. **Product_Category** - Store product categories
4. **Product_Details** - Store product details with category references
5. **Orders** - Store order information
6. **Order_Details** - Store order item details
7. **Payment** - Store payment information
8. **Shipping_Info** - Store shipping information
9. **Supplier** - Store supplier information
10. **Tracking_Info** - Store tracking information
11. **Reviews** - Store product reviews
12. **Website** - Store website information

## Database Schema

### Admin Table
```sql
CREATE TABLE Admin (
   admin_id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   email VARCHAR(100) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL
);
```

### Customer Table
```sql
CREATE TABLE Customer (
   customer_id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   email VARCHAR(100) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   phone VARCHAR(15) UNIQUE NOT NULL,
   address TEXT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Product_Category Table
```sql
CREATE TABLE Product_Category (
   category_id INT AUTO_INCREMENT PRIMARY KEY,
   category_name VARCHAR(100) UNIQUE NOT NULL
);
```

### Supplier Table
```sql
CREATE TABLE Supplier (
   supplier_id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   contact_person VARCHAR(100) NOT NULL,
   phone VARCHAR(15) UNIQUE NOT NULL,
   email VARCHAR(100) UNIQUE NOT NULL,
   address TEXT NOT NULL
);
```

### Product_Details Table
```sql
CREATE TABLE Product_Details (
   product_id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   category_id INT,
   supplier_id INT,
   price DECIMAL(10,2) NOT NULL,
   stock_quantity INT NOT NULL,
   description TEXT,
   FOREIGN KEY (category_id) REFERENCES Product_Category(category_id) ON DELETE CASCADE,
   FOREIGN KEY (supplier_id) REFERENCES Supplier(supplier_id) ON DELETE SET NULL
);
```

### Orders Table
```sql
CREATE TABLE Orders (
   order_id INT AUTO_INCREMENT PRIMARY KEY,
   customer_id INT,
   order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   total_price DECIMAL(10,2) NOT NULL,
   status ENUM('pending', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
   FOREIGN KEY (customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE
);
```

### Order_Details Table
```sql
CREATE TABLE Order_Details (
   order_detail_id INT AUTO_INCREMENT PRIMARY KEY,
   order_id INT,
   product_id INT,
   quantity INT NOT NULL,
   subtotal DECIMAL(10,2) NOT NULL,
   FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
   FOREIGN KEY (product_id) REFERENCES Product_Details(product_id) ON DELETE CASCADE
);
```

### Payment Table
```sql
CREATE TABLE Payment (
   payment_id INT AUTO_INCREMENT PRIMARY KEY,
   order_id INT,
   payment_method ENUM('credit_card', 'debit_card', 'UPI', 'net_banking', 'cash_on_delivery') NOT NULL,
   payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
   transaction_id VARCHAR(100) UNIQUE,
   amount DECIMAL(10,2) NOT NULL,
   payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE
);
```

### Shipping_Info Table
```sql
CREATE TABLE Shipping_Info (
   shipping_id INT AUTO_INCREMENT PRIMARY KEY,
   order_id INT,
   tracking_number VARCHAR(50) UNIQUE NOT NULL,
   delivery_address TEXT NOT NULL,
   delivery_status ENUM('processing', 'shipped', 'out_for_delivery', 'delivered') DEFAULT 'processing',
   estimated_arrival DATE,
   FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE
);
```

### Tracking_Info Table
```sql
CREATE TABLE Tracking_Info (
   tracking_id INT AUTO_INCREMENT PRIMARY KEY,
   order_id INT,
   status ENUM('shipped', 'in_transit', 'out_for_delivery', 'delivered', 'cancelled') DEFAULT 'shipped',
   last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE
);
```

### Reviews Table
```sql
CREATE TABLE Reviews (
   review_id INT AUTO_INCREMENT PRIMARY KEY,
   customer_id INT,
   product_id INT,
   rating INT CHECK (rating BETWEEN 1 AND 5),
   comment TEXT,
   review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (customer_id) REFERENCES Customer(customer_id) ON DELETE CASCADE,
   FOREIGN KEY (product_id) REFERENCES Product_Details(product_id) ON DELETE CASCADE
);
```

### Website Table
```sql
CREATE TABLE Website (
   website_id INT AUTO_INCREMENT PRIMARY KEY,
   site_name VARCHAR(100) NOT NULL,
   contact_email VARCHAR(100) UNIQUE NOT NULL,
   contact_phone VARCHAR(15) UNIQUE NOT NULL,
   about_us TEXT NOT NULL,
   terms_and_conditions TEXT NOT NULL
);
```

## Sample Data

### Admin Data
```sql
INSERT INTO Admin (name, email, password)
VALUES
('John Doe', 'admin@grocery.com', 'admin123'),
('Jane Smith', 'jane@grocery.com', 'securepass');
```

### Customer Data
```sql
INSERT INTO Customer (name, email, password, phone, address)
VALUES
('Alice Brown', 'alice@gmail.com', 'pass123', '9876543210', '123 Main St, NY'),
('Bob Johnson', 'bob@yahoo.com', 'mypass789', '8765432109', '456 Oak Ave, CA');
```

### Product_Category Data
```sql
INSERT INTO Product_Category (category_name)
VALUES
('Dairy'),
('Vegetables'),
('Beverages');
```

### Supplier Data
```sql
INSERT INTO Supplier (name, contact_person, phone, email, address)
VALUES
('DairyCo', 'Mike Johnson', '1234567890', 'dairy@gmail.com', '12 Milk St'),
('FreshFarm', 'Emma Lee', '9876543210', 'fresh@yahoo.com', '34 Veg Rd');
```

### Product_Details Data
```sql
INSERT INTO Product_Details (name, category_id, supplier_id, price, stock_quantity, description)
VALUES
('Milk', 1, 1, 2.50, 100, 'Fresh milk'),
('Apple', 2, 2, 1.20, 200, 'Red apples');
```

### Orders Data
```sql
INSERT INTO Orders (customer_id, total_price, status)
VALUES
(1, 10.00, 'pending');
```

### Order_Details Data
```sql
INSERT INTO Order_Details (order_id, product_id, quantity, subtotal)
VALUES
(1, 1, 2, 5.00),
(1, 2, 5, 6.00);
```

### Payment Data
```sql
INSERT INTO Payment (order_id, payment_method, payment_status, transaction_id, amount)
VALUES
(1, 'UPI', 'completed', 'TXN12345', 10.00);
```

### Shipping_Info Data
```sql
INSERT INTO Shipping_Info (order_id, tracking_number, delivery_address, delivery_status, estimated_arrival)
VALUES
(1, 'TRK12345', '123 Main St, NY', 'shipped', '2025-03-20');
```

### Tracking_Info Data
```sql
INSERT INTO Tracking_Info (order_id, status)
VALUES
(1, 'shipped');
```

### Reviews Data
```sql
INSERT INTO Reviews (customer_id, product_id, rating, comment)
VALUES
(1, 1, 5, 'Great milk!');
```

### Website Data
```sql
INSERT INTO Website (site_name, contact_email, contact_phone, about_us, terms_and_conditions)
VALUES
('GroceryApp', 'support@grocery.com', '1234567890', 'Best online store', 'All rights reserved');
```

## Configuration

To connect your application to the MySQL database, set the following environment variables:

- `DB_HOST`: Your MySQL host (default: localhost)
- `DB_USER`: Your MySQL username (default: root)
- `DB_PASSWORD`: Your MySQL password (default: empty string)
- `DB_NAME`: Your database name (default: grocery_store)

For local development, if you're not using environment variables, you can modify the default values in `src/utils/env.ts`.
