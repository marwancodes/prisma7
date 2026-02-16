# 🚀 Express + TypeScript + Prisma 7 Starter

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v20-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7.4-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

A modern, production-ready starter template for building REST APIs with Express.js, TypeScript, and Prisma ORM v7.

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Common Issues](#-common-issues)

</div>

---

## ✨ Features

- ⚡ **Express 5** - Latest version with native async error handling
- 🔷 **TypeScript** - Full type safety with strict mode enabled
- 🗄️ **Prisma 7** - Modern ORM with driver adapters architecture
- 📦 **ESM** - Native ES Modules support (`type: "module"`)
- 🔥 **Hot Reload** - Development server with `tsx` and `nodemon`
- 🐘 **Neon PostgreSQL** - Serverless Postgres with instant setup
- 🔐 **Environment Variables** - Secure configuration with `dotenv`

## 📋 Prerequisites

- **Node.js** v20.x LTS ([Download](https://nodejs.org/))
- **Neon PostgreSQL** account ([Sign up free](https://neon.tech/))
- **npm** or **yarn**

## 🚀 Quick Start

### 1️⃣ Clone the repository

```bash
git clone https://github.com/marwancodes/prisma7
cd prisma_starter
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up Neon PostgreSQL

1. Go to [neon.tech](https://neon.tech/) and sign up (free tier available)
2. Create a new project
3. Copy your connection string (it looks like this):
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

### 4️⃣ Configure environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require"
PORT=4000
```

> 💡 **Tip:** Add `.env` to your `.gitignore` to keep credentials safe

### 5️⃣ Set up the database

Run migrations to create the database schema:

```bash
npx prisma migrate dev --name init
```

### 6️⃣ Seed the database (optional)

Populate your database with sample data:

```bash
npx prisma db seed
```

### 7️⃣ Start the development server

```bash
npm run dev
```

The server will start at `http://localhost:4000`

🎉 **Done!** Visit `http://localhost:4000/users` to see your API in action.

## 📁 Project Structure

```
prisma_starter/
├── src/
│   ├── lib/
│   │   └── prisma.ts          # Prisma client singleton with adapter
│   ├── generated/
│   │   └── prisma/            # Generated Prisma client (auto-generated)
│   └── index.ts               # Express app entry point
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Database seeding script
│   └── migrations/            # Migration history
├── prisma.config.ts           # Prisma v7 configuration
├── tsconfig.json              # TypeScript configuration
├── nodemon.json               # Nodemon configuration
└── package.json
```

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled production build |
| `npx prisma generate` | Regenerate Prisma client types |
| `npx prisma migrate dev` | Create and apply a new migration |
| `npx prisma db seed` | Seed the database with sample data |
| `npx prisma studio` | Open Prisma Studio (database GUI) |

## 🗄️ Database Schema

```prisma
model User {
  id          Int      @id @default(autoincrement())
  name        String
  email       String   @unique
  age         Int
  isMarried   Boolean?
  nationality String
}
```

## 🔌 API Endpoints

### `GET /users`

Retrieve the first user from the database.

**Request:**
```bash
curl http://localhost:4000/users
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Marwan",
  "email": "marwan@mail.com",
  "age": 30,
  "isMarried": true,
  "nationality": "Moroccan"
}
```

> 🔨 **Extend this:** Add more routes like `POST /users`, `GET /users/:id`, `PUT /users/:id`, `DELETE /users/:id`

---

## 🎯 Key Implementation Details

### ⚠️ Prisma v7 Breaking Changes

This project uses **Prisma v7**, which introduced significant changes from v6:

#### 1. Driver Adapters Required

`PrismaClient` now requires an adapter:

```typescript
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client.js';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
```

#### 2. Import Path Changed

Import from generated folder, not `@prisma/client`:

```typescript
// ❌ Old way (v6)
import { PrismaClient } from '@prisma/client';

// ✅ New way (v7)
import { PrismaClient } from './generated/prisma/client.js';
```

#### 3. Configuration File

Database URL moved to `prisma.config.ts`:

```typescript
export default defineConfig({
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

### 📦 ESM + TypeScript

This project uses **ES Modules** with TypeScript. Key points:

| Configuration | Value | Why |
|--------------|-------|-----|
| `package.json` | `"type": "module"` | Enables ESM |
| `tsconfig.json` | `"module": "NodeNext"` | Modern Node ESM |
| Import extensions | `.js` | Required for ESM |

**Example:**
```typescript
import { prisma } from './lib/prisma.js'; // ✅ .js extension required
import { prisma } from './lib/prisma';    // ❌ Will fail
```

### 🔧 Development with tsx

We use **`tsx`** instead of `ts-node` for better ESM compatibility:

```json
{
  "exec": "tsx src/index.ts"
}
```

**Why tsx?** It handles TypeScript + ESM natively without loader flags or cycle errors that `ts-node` causes.

---

## 🐛 Common Issues & Solutions

<details>
<summary><b>❌ <code>process is not defined</code></b></summary>

<br>

**Problem:** TypeScript doesn't recognize Node.js globals.

**Solution:** Add `"types": ["node"]` to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["node"]
  }
}
```

</details>

<details>
<summary><b>❌ <code>Cannot find module './lib/prisma.js'</code></b></summary>

<br>

**Problem:** `ts-node` is being used instead of `tsx`.

**Solution:** Update `nodemon.json`:

```json
{
  "exec": "tsx src/index.ts"
}
```

And ensure your `package.json` script is:

```json
{
  "scripts": {
    "dev": "nodemon"
  }
}
```

</details>

<details>
<summary><b>❌ <code>Expected 1 arguments, but got 0</code> when creating PrismaClient</b></summary>

<br>

**Problem:** Prisma v7 requires a driver adapter.

**Solution:** Always pass the adapter:

```typescript
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter }); // ✅ adapter required
```

</details>

<details>
<summary><b>❌ <code>ERR_REQUIRE_CYCLE_MODULE</code> error</b></summary>

<br>

**Problem:** Using `ts-node/esm` loader on Node v20+.

**Solution:** Switch to `tsx`:

```bash
npm install -D tsx
```

Then update your scripts to use `tsx` instead of `ts-node`.

</details>

---

## 📚 Learn More

### Official Documentation

- 📘 [Prisma v7 Documentation](https://www.prisma.io/docs) - Complete Prisma ORM guide
- 📗 [Express 5 Documentation](https://expressjs.com/) - Express.js reference
- 📙 [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript language guide
- 📕 [Node.js ESM Guide](https://nodejs.org/api/esm.html) - ES Modules in Node.js

### Helpful Resources

- [Neon PostgreSQL Docs](https://neon.tech/docs) - Serverless Postgres guide
- [Prisma Migrate Guide](https://www.prisma.io/docs/concepts/components/prisma-migrate) - Database migrations
- [TypeScript ESM Setup](https://www.typescriptlang.org/docs/handbook/esm-node.html) - ESM + TS configuration

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">

**Built with ❤️ using Express, TypeScript, and Prisma 7**

⭐ Star this repo if you found it helpful!

</div>
