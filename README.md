# 🌿 PlantDoc – Houseplant Documentation Manager

**PlantDoc** is a progressive web application (PWA) built in **Next.js**, designed for professionals and indoor plant
enthusiasts.

It helps users track plant records, such as sold plants, purchased plants, and gather information about their personal
collection and plant expenses, all in a sleek, mobile-friendly interface.

## ✨ Features

* 🩴 Manage your personal plant collection with custom photos
* 🔔 Expenses history
* 🗕️ Exportable data in tables regarding plant sales and purchases
* 📱 Installable as a mobile PWA with offline support
* 🔐 Authentication with session management
* 🌙 Light and dark mode support

## 🧰 Tech Stack

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **ShadCN UI**
* **Resend**
* **NextAuth.js** (authentication)
* **MongoDb**
* **Vercel** (deployment and hosting)

## 🚀 Getting Started

To run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/plantdoc.git
   cd plantdoc
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file based on `.env.example` and fill in the required values:

   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser.

## 📁 Project Structure

```bash
├── app/              # App Router pages and layouts
├── components/       # Reusable UI components
├── actions/          # Server actions for form handling
├── lib/              # Utility functions and validators
├── prisma/           # Prisma schema and DB seed
└── public/           # Static assets (images, icons)
```

## ☁️ Deployment

Deployed on [Vercel](https://vercel.com/) with continuous integration from GitHub.

## 🚣 Docker Usage

This project includes Docker support for production use without Docker Compose.

### 🔧 Build and Run with Docker (based on `Dockerfile` and `run.sh`)

1. Make sure you have a valid `.env.local` file:

   ```env
   DATABASE_URL=mongodb://host.docker.internal:27017/plantdoc
   NEXTAUTH_SECRET=your_secret_here
   ```

2. Use the provided script to build and run the container:

   ```bash
   ./run.sh
   ```

   Or run manually:

   ```bash
   export $(grep -v '^#' .env.local | xargs)

   docker build \
     --build-arg DATABASE_URL \
     --build-arg NEXTAUTH_SECRET \
     -t plant-doc .

   docker run -p 3000:3000 \
     --env-file .env.local \
     plant-doc
   ```

3. Open `http://localhost:3000` in your browser.

> ⚠️ On Windows/macOS, Docker uses `host.docker.internal` to access local services like MongoDB.

## 👤 Author

Built by **Monika Cilińska** as part of a personal portfolio.
📧 [monika.cilinska@gmail.com](mailto:monika.cilinska@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/monika-cilinska/)

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
