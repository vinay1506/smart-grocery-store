-- Create Product_Category table
CREATE TABLE IF NOT EXISTS Product_Category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

-- Create Product_Details table
CREATE TABLE IF NOT EXISTS Product_Details (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES Product_Category(category_id)
);

-- Create Orders table
CREATE TABLE IF NOT EXISTS Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Order_Details table
CREATE TABLE IF NOT EXISTS Order_Details (
    order_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Product_Details(product_id)
);

-- Insert sample categories
INSERT INTO Product_Category (category_name) VALUES
('Fruits'),
('Vegetables'),
('Dairy'),
('Bakery'),
('Meat'),
('Snacks');

-- Insert sample products
INSERT INTO Product_Details (name, category_id, price, stock_quantity, description) VALUES
('Apple', 1, 1.99, 100, 'Fresh red apples'),
('Banana', 1, 0.99, 150, 'Ripe bananas'),
('Carrot', 2, 0.79, 200, 'Fresh carrots'),
('Milk', 3, 2.99, 50, 'Whole milk'),
('Bread', 4, 2.49, 30, 'White bread'),
('Chicken', 5, 5.99, 40, 'Fresh chicken breast'),
('Potato Chips', 6, 1.49, 100, 'Classic potato chips'); 