---
# Next.js PayPal Clone

This project is a simple PayPal clone, built using Next.js. It leverages PostgreSQL as the database and NextAuth.js for authentication.
---

## Installation

The following instructions will guide you through setting up and running the project locally.

### 1\. Clone the Repository

```bash
git clone <repository-address>
cd nextjs-paypal-clone
```

### 2\. PostgreSQL Database Setup

We recommend using **Docker Compose** to easily set up a PostgreSQL instance.
Otherwise, you can use standalone PostgreSQL instance.

Start the database using Docker Compose:

```bash
docker-compose up -d
```

This will spin up a PostgreSQL container running on port `5432`.

### 3\. Environment Variables Configuration

Create a file named **`.env`** in the root directory of your project and add the following environment variables:

```
# .env.local

DATABASE_URL=postgres://<username>:<password>@localhost:5432/paypal_clone
DATABASE_PASSWORD=<password>

NEXTAUTH_URL=http://localhost:3000/
NEXTAUTH_SECRET=<secure_key>
```

**Important:** Ensure that `DATABASE_PASSWORD` matches the password you set in your `docker-compose.yml` file. For `NEXTAUTH_SECRET`, it's highly recommended to generate your own strong key (you can use `openssl rand -base64 32` in a Linux/macOS terminal or an online generator).

### 4\. Install Dependencies and Run the Project

```bash
npm install
npm run dev # npm run start
```

The project will now be accessible at `http://localhost:3000`.

---

## Usage

Once the application is successfully running, you can explore the PayPal clone. Feel free to register to test the application.
