require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://library-management-n49h.web.app",
      "https://library-management-n49h.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Designed with love 💖 by Najib Hossain");
});

// MongoDB URI and client
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.SECRET_KEY}@cluster0.tqv0m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// verifyToken
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).send({ message: "unauthorized access-1" });
  jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access-2" });
    }
    req.user = decoded;
    next();
  });
};

// Database and Collection setup
let collection = client.db("Library-Management").collection("BookCollection");

async function run() {
  try {
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    // generate JWT token ⚠
    app.post("/jwt", async (req, res) => {
      const email = req.body;
      // create token
      const token = jwt.sign(email, process.env.SECRET_KEY_JWT, {
        expiresIn: "1h",
      });
      // console.log(token);
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // logout || clear cookie from browser JWT remove ⚠
    app.get("/logout", async (req, res) => {
      res
        .clearCookie("token", {
          maxAge: 0,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // >>>>>>>>>>>

    // Add-Book Route
    app.post("/add-book", verifyToken, async (req, res) => {
      const book = req.body;
      book.quantity = parseInt(book.quantity, 10);
      const result = await collection.insertOne(book);
      res.send({ message: "Book Added", BookId: result.insertedId });
    });

    // Get All Books Route
    app.get("/books", verifyToken, async (req, res) => {
      const books = await collection.find({}).toArray();
      res.send(books);
    });

    // Get Book by ID for Update
    app.get("/books/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      const book = await collection.findOne({ _id: new ObjectId(id) });
      res.send(book);
    });

    //  Update Book by ID
    app.put("/books/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      const updatedBook = req.body;
      try {
        const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedBook }
        );
        res.send({ message: "Book Updated Successfully" });
      } catch (error) {
        res.status(500).send({ error: "Error updating book" });
      }
    });

    // Route: Get Books by Category
    app.get("/books/category/:category", async (req, res) => {
      const { category } = req.params;
      // Find books that match the category
      const booksByCategory = await collection
        .find({ category: category })
        .toArray();
      res.send(booksByCategory);
    });

    // Route: Get Book by ID
    app.get("/books/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      try {
        const book = await collection.findOne({ _id: new ObjectId(id) });
        if (!book) {
          return res.status(404).send({ error: "Book not found" });
        }
        res.send(book);
      } catch (error) {
        console.error("Error fetching book details:", error);
        res.status(500).send({ error: "Internal server error" });
      }
    });

    // Route: Borrow a Book
    app.put("/books/borrow/:id", async (req, res) => {
      const { id } = req.params; // Book ID
      const { userName, userEmail, returnDate } = req.body; // User details and return date

      if (!userName || !userEmail || !returnDate) {
        return res.status(400).send({ error: "All fields are required." });
      }

      try {
        // Find the book by ID
        const book = await collection.findOne({ _id: new ObjectId(id) });

        if (!book) {
          return res.status(404).send({ error: "Book not found." });
        }

        // Check if the user has already borrowed the book
        const alreadyBorrowed = book?.borrowedBy?.some(
          (entry) => entry.userEmail === userEmail
        );

        if (alreadyBorrowed) {
          return res.status(400).send({
            error: "You have already borrowed this book.",
            alreadyBorrowed: true,
          });
        }

        // Check if the quantity is sufficient
        if (book.quantity <= 0) {
          return res.status(400).send({ error: "Book is out of stock." });
        }

        // Format the current date as YYYY-MM-DD
        const borrowedAt = new Date().toISOString().split("T")[0];

        // Update the book document
        const updateResult = await collection.updateOne(
          { _id: new ObjectId(id) },
          {
            $inc: { quantity: -1 }, // Decrease the quantity
            $push: {
              borrowedBy: {
                userName,
                userEmail,
                returnDate,
                borrowedAt, // Timestamp for borrowing
              },
            },
          }
        );

        res.send({ message: "Book borrowed successfully.", updateResult });
      } catch (error) {
        console.error("Error borrowing book:", error);
        res.status(500).send({ error: "Internal server error." });
      }
    });

    // Route: Get Books Borrowed by User Email
    app.get("/books/borrowed/:email", verifyToken, async (req, res) => {
      const { email } = req.params;

      try {
        // Find books borrowed by the user
        const borrowedBooks = await collection
          .find({ "borrowedBy.userEmail": email })
          .toArray();

        if (borrowedBooks.length === 0) {
          return res
            .status(404)
            .send({ error: "No books found for this email." });
        }

        res.send(borrowedBooks);
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
        res.status(500).send({ error: "Internal server error." });
      }
    });

    // Route: Return a Book
    app.put("/books/return/:id", async (req, res) => {
      const { id } = req.params; // Book ID
      const { userEmail } = req.body; // Borrower's email

      if (!userEmail) {
        return res.status(400).send({ error: "User email is required." });
      }

      try {
        // Find the book by ID
        const book = await collection.findOne({ _id: new ObjectId(id) });

        if (!book) {
          return res.status(404).send({ error: "Book not found." });
        }

        // Check if the user has borrowed the book
        const borrowerIndex = book.borrowedBy.findIndex(
          (borrower) => borrower.userEmail === userEmail
        );

        if (borrowerIndex === -1) {
          return res
            .status(400)
            .send({ error: "Borrower not found for this book." });
        }

        // Remove the borrower from the `borrowedBy` array and increase quantity
        const updateResult = await collection.updateOne(
          { _id: new ObjectId(id) },
          {
            $inc: { quantity: 1 }, // Increase the quantity
            $pull: { borrowedBy: { userEmail } }, // Remove the borrower
          }
        );

        res.send({ message: "Book returned successfully.", updateResult });
      } catch (error) {
        console.error("Error returning book:", error);
        res.status(500).send({ error: "Internal server error." });
      }
    });

    // >>>>>>>>>>>
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
run().catch(console.dir);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
