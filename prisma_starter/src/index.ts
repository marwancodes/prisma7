import express from "express";
import { prisma } from './lib/prisma';
import 'dotenv/config';


const app = express(); 

app.use(express.json());

app.post("/users", async (req, res) => {
    const { name, email, age, isMarried, nationality } = req.body;
    const user = await prisma.user.create({
        data: {
            name,
            email,
            age,
            isMarried,
            nationality
        }
    });
    res.json(user);
})

app.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const users = await prisma.user.findUnique({
        where: {
        id: +id,
      },
    });
    res.json(users);
});

app.get("/users", async (_, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const updateUser = await prisma.user.update({
        where: { id: +id },
        data: req.body,
    });
    res.json(updateUser);
});

app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    await prisma.user.delete({
        where: { id: +id },
    });
    res.json({ message: "User deleted successfully" });
});

app.listen(4000, () => {
    console.log(`Server is running at http://localhost:4000`);
});