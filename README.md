# Bike Servicing Management 🚴‍♂️

Bike Servicing Management is a backend system designed to manage bike service bookings, track service status, and handle customer and service personnel data efficiently. The project is structured with scalability and performance in mind using modern technologies.

## 🚀 Live Backend

[Click here to access the live backend](https://bike-serviceing-management.vercel.app)  


## 🛠 Tech Stack

- **Backend Framework**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Runtime Environment**: Node.js

## ⚙️ Setup Guide

1. **Clone the repository**

   ```bash
   git clone https://github.com/mdyeasinhn/Bike-serviceing-management.git
   cd bike-servicing-management

   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   DATABASE_URL="your_postgresql_connection_string"
   PORT=3000
   ```

4. **Run Prisma migrations**
   ```bash
   npx prisma migrate dev --name init
   ```
5. **Start the development server**

   ```bash
   npm run dev
   ```
