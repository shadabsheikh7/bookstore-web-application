/** @format */

import dotenv from "dotenv";
dotenv.config();
import connection from "./conn/db.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userrouter from "./routes/user.js";
import bookrouter from "./routes/books.js";
import favouriterouter from "./routes/favourites.js";
import cartrouter from "./routes/cart.js";
import orderrouter from "./routes/order.js";
import Books from "./models/books.js";
import User from "./models/user.js";
import bcrypt from "bcrypt";
// ^ middlewares ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", userrouter);
app.use("/api/v1", bookrouter);
app.use("/api/v1", favouriterouter);
app.use("/api/v1", cartrouter);
app.use("/api/v1", orderrouter);

// *connecting the database
const startServer = async () => {
  try {
    await connection(process.env.MONGO_URI);
    console.log("✅ Database connected, starting server...");

    app.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

const port = process.env.PORT || 3000;
startServer();

// * Seed books route for testing
app.post("/api/v1/seed-books", async (req, res) => {
  try {
    const sampleBooks = [
      {
        url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 499,
        discount: 10,
        desc: "A classic American novel set in the Jazz Age.",
        language: "English",
        stock: 50,
      },
      {
        url: "https://images.unsplash.com/photo-1507842955617-c4d2a4934d5f?w=500",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 399,
        discount: 15,
        desc: "A gripping tale of racial injustice and childhood innocence.",
        language: "English",
        stock: 40,
      },
      {
        url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500",
        title: "1984",
        author: "George Orwell",
        price: 549,
        discount: 20,
        desc: "A dystopian novel about totalitarianism.",
        language: "English",
        stock: 35,
      },
      {
        url: "https://images.unsplash.com/photo-1543002588-d83cea1c2c7e?w=500",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 349,
        discount: 5,
        desc: "A romantic novel of manners and marriage.",
        language: "English",
        stock: 60,
      },
      {
        url: "https://images.unsplash.com/photo-1507842955617-c4d2a4934d5f?w=500",
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        price: 299,
        discount: 10,
        desc: "A story of teenage rebellion and alienation.",
        language: "English",
        stock: 45,
      },
      {
        url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        price: 599,
        discount: 25,
        desc: "An epic fantasy adventure.",
        language: "English",
        stock: 30,
      },
    ];

    await Books.deleteMany({});
    await Books.insertMany(sampleBooks);

    res.status(200).json({
      message: "Sample books added successfully",
      count: sampleBooks.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error seeding books",
      error: error.message,
    });
  }
});

// * Seed users route for testing
app.post("/api/v1/seed-users", async (req, res) => {
  try {
    // Hash passwords
    const userPassword = await bcrypt.hash("user", 10);
    const adminPassword = await bcrypt.hash("alpha", 10);

    const sampleUsers = [
      {
        username: "user",
        email: "user@gmail.com",
        password: userPassword,
        address: "123 Main St, City",
        role: "user",
      },
      {
        username: "admin",
        email: "alpha@gmail.com",
        password: adminPassword,
        address: "456 Admin Ave, City",
        role: "admin",
      },
    ];

    await User.deleteMany({});
    await User.insertMany(sampleUsers);

    res.status(200).json({
      message: "Sample users added successfully",
      count: sampleUsers.length,
      users: {
        user: { email: "user@gmail.com", password: "user", role: "user" },
        admin: { email: "alpha@gmail.com", password: "alpha", role: "admin" },
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error seeding users",
      error: error.message,
    });
  }
});

// Database is already started in startServer() above, no need for app.listen here
