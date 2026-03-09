import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./backend/models/userModel.js";
import Product from "./backend/models/productModel.js";
import Category from "./backend/models/categoryModel.js";

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // 1. Create Admin
        const adminEmail = "admin@mrbeast.com";
        const adminPassword = "mrbeastpassword123";
        const existingAdmin = await User.findOne({ email: adminEmail });

        let adminUser;
        if (!existingAdmin) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminPassword, salt);
            adminUser = await User.create({
                username: "MrBeastAdmin",
                email: adminEmail,
                password: hashedPassword,
                isAdmin: true
            });
            console.log("Admin created successfully!");
        } else {
            adminUser = existingAdmin;
            console.log("Admin already exists.");
        }

        // 2. Create Clothing Category
        let clothingCategory = await Category.findOne({ name: "Clothing" });
        if (!clothingCategory) {
            clothingCategory = await Category.create({ name: "Clothing" });
            console.log("Clothing category created!");
        }

        // 3. Create MrBeast Clothing Products
        const mrBeastProducts = [
            {
                name: "MrBeast Logo Hoodie",
                image: "https://shopmrbeast.com/cdn/shop/files/MrBeast_Logo_Hoodie_Black_Hero.png",
                brand: "MrBeast",
                quantity: 100,
                category: clothingCategory._id,
                description: "The classic MrBeast logo hoodie. Super soft and comfortable, perfect for any fan.",
                price: 45,
                countInStock: 50
            },
            {
                name: "Beast Philanthropy Tee",
                image: "https://shopmrbeast.com/cdn/shop/products/Beast_Philanthropy_Tee_Blue.png",
                brand: "MrBeast",
                quantity: 200,
                category: clothingCategory._id,
                description: "Support a great cause with the official Beast Philanthropy t-shirt.",
                price: 25,
                countInStock: 100
            },
            {
                name: "MrBeast Frosted Logo Hat",
                image: "https://shopmrbeast.com/cdn/shop/products/MrBeast_Frosted_Logo_Hat_Pink.png",
                brand: "MrBeast",
                quantity: 150,
                category: clothingCategory._id,
                description: "Stylish pink hat featuring the iconic MrBeast frosted logo.",
                price: 20,
                countInStock: 75
            },
            {
                name: "Beast Gaming Jersey",
                image: "https://shopmrbeast.com/cdn/shop/products/Beast_Gaming_Jersey.png",
                brand: "MrBeast",
                quantity: 80,
                category: clothingCategory._id,
                description: "Level up your gaming sessions with the official MrBeast Gaming jersey.",
                price: 55,
                countInStock: 30
            },
            {
                name: "MrBeast Varsity Jacket",
                image: "https://shopmrbeast.com/cdn/shop/products/Varsity_Jacket_Front.png",
                brand: "MrBeast",
                quantity: 50,
                category: clothingCategory._id,
                description: "Premium varsity jacket for the ultimate MrBeast fan. High-quality materials and design.",
                price: 85,
                countInStock: 15
            }
        ];

        for (const p of mrBeastProducts) {
            const exists = await Product.findOne({ name: p.name });
            if (!exists) {
                await Product.create(p);
                console.log(`Product created: ${p.name}`);
            } else {
                console.log(`Product already exists: ${p.name}`);
            }
        }

        console.log("Seeding complete!");
        process.exit();
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seed();
