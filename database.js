import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const setupDatabase = async () => {
    const db = await open({
        filename: './public/database/clothing.db',
        driver: sqlite3.Database
    });

    // Create the table if it doesn't exist, with UNIQUE constraint
    await db.exec(`
        CREATE TABLE IF NOT EXISTS clothing (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT,
            color TEXT,
            cost REAL,
            brand TEXT,
            sex TEXT,
            available BOOLEAN,
            image TEXT, -- New column for storing the image path
            UNIQUE(type, color, brand) -- Prevent duplicate entries
        )
    `);

    // List of clothing items to insert
    const items = [
        { type: 'T-shirt', color: 'Black', cost: 19.99, brand: 'Nike', sex: 'M', available: 1, image: '/images/tshirt.jpg' },
        { type: 'Jeans', color: 'Blue', cost: 49.99, brand: 'Levi\'s', sex: 'F', available: 1, image: '/images/jeans.jpg' },
        { type: 'Jacket', color: 'Black', cost: 89.99, brand: 'Adidas', sex: 'M', available: 0, image: '/images/jacket.jpg' },
        { type: 'Shirt', color: 'Black', cost: 29.99, brand: 'Polo', sex: 'M', available: 1, image: '/images/shirt.jpg' },
        { type: 'Skirt', color: 'Red', cost: 35.99, brand: 'H&M', sex: 'F', available: 0, image: '/images/skirt.jpg' },
        { type: 'Sweater', color: 'Black', cost: 59.99, brand: 'Zara', sex: 'F', available: 1, image: '/images/sweater.jpg' },
        { type: 'Shorts', color: 'Black', cost: 24.99, brand: 'Reebok', sex: 'M', available: 1, image: '/images/shorts.jpg' },
        { type: 'Dress', color: 'Blue', cost: 79.99, brand: 'Gucci', sex: 'F', available: 0, image: '/images/dress.jpg' },
        { type: 'Blazer', color: 'Navy', cost: 129.99, brand: 'Armani', sex: 'M', available: 1, image: '/images/blazer.jpg' },
        { type: 'Pants', color: 'Tan', cost: 44.99, brand: 'Tommy Hilfiger', sex: 'F', available: 0, image: '/images/pants.jpg' },
        { type: 'Hoodie', color: 'Black', cost: 39.99, brand: 'Under Armour', sex: 'M', available: 1, image: '/images/hoodie.jpg' },
        { type: 'Jumpsuit', color: 'Black', cost: 59.99, brand: 'Forever 21', sex: 'F', available: 1, image: '/images/jumpsuit.jpg' },
        { type: 'Hat', color: 'Black', cost: 19.99, brand: 'New Era', sex: 'M', available: 0, image: '/images/hat.jpg' },
        { type: 'Gloves', color: 'Gray', cost: 14.99, brand: 'Columbia', sex: 'F', available: 1, image: '/images/gloves.jpg' },
        { type: 'Scarf', color: 'Red', cost: 25.99, brand: 'Burberry', sex: 'F', available: 0, image: '/images/scarf.jpg' },
        { type: 'Belt', color: 'Brown', cost: 49.99, brand: 'Calvin Klein', sex: 'M', available: 1, image: '/images/belt.jpg' },
        { type: 'Boots', color: 'Red', cost: 99.99, brand: 'Timberland', sex: 'F', available: 0, image: '/images/boots.jpg' },
        { type: 'Sandals', color: 'Black', cost: 29.99, brand: 'Birkenstock', sex: 'F', available: 1, image: '/images/sandals.jpg' },
        { type: 'Suit', color: 'Gray', cost: 199.99, brand: 'Hugo Boss', sex: 'M', available: 1, image: '/images/suit.jpg' },
        { type: 'Cap', color: 'Blue', cost: 15.99, brand: 'Adidas', sex: 'M', available: 0, image: '/images/cap.jpg' }
    ];


    // Insert items if they don't already exist
    for (const item of items) {
        try {
            await db.run(`
            INSERT INTO clothing (type, color, cost, brand, sex, available, image)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [item.type, item.color, item.cost, item.brand, item.sex, item.available, item.image]);
        } catch (error) {
            if (error.code === 'SQLITE_CONSTRAINT') {
                console.log(`Item "${item.type} (${item.color} - ${item.brand})" already exists. Skipping.`);
            } else {
                throw error;
            }
        }
    }


    console.log('Clothing table setup complete with no duplicates inserted.');
};

export const getDbConnection = async () => {
    return open({
        filename: './public/database/clothing.db',
        driver: sqlite3.Database
    });
};
