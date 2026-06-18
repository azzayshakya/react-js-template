# 🚀 dev-stack

> **A modular, plug-and-play toolkit for scaling React apps effortlessly!**  
> Designed for **state management, API handling, authentication, and UI magic** ✨

---

## 🎯 What is this?

Think of **dev-stack** as your 🛠 **Swiss Army knife** for React development. No more writing boilerplate code! This kit is:

- **🔗 Modular** – Use what you need, ditch what you don’t.
- **⚡ Performance-Optimized** – Handles API calls, authentication, and local storage like a pro.
- **💾 State-Managed** – Powered by Zustand & TanStack Query for buttery-smooth data flow.

---

## 🏗 Structure

```
📂 apis         # API services (Axios-based)
📂 constants    # Application-wide constants
📂 dtos         # Data Transfer Objects
📂 enums        # Enumerations for better code clarity
📂 features     # Core features and business logic
📂 hooks        # Reusable hooks for API calls & session management
📂 lib          # Library utilities & configurations
📂 pages        # Page components and views
📂 stores       # Zustand state management
📂 styles       # Global styles and themes
📂 utils        # Helper functions & authentication logic
```

---

## 📌 Features

✅ **Seamless Authentication** (JWT, Local Storage, Session Handling) 🔐  
✅ **Global State Management** with Zustand ⚙️  
✅ **API Calls Simplified** (Axios + TanStack Query) 🚀  
✅ **Error Handling & Toast Notifications** (Sonner) ⚠️  
✅ **Developer-Friendly Hooks** for Queries, Mutations & Validation 🛠  

---

## 🔌 Installation & Usage

### 1️⃣ Install dependencies
```sh
npm install
# or
yarn add
```

### 2️⃣ Import & Use Components or Hooks
```tsx
import { axiosInstance } from "@/apis/axios-instance";
import { useUserSessionStore } from "@/stores/user-session-store";

const { userSession } = useUserSessionStore();
```

### 3️⃣ Build & Run
```sh
npm run dev
```

---

## 🛠 Tech Stack

🚀 **React 18+**  
🔮 **TypeScript**  
⚡ **Vite**  
🌊 **Zustand** (State Management)  
🔄 **TanStack Query** (API Caching)  
🎨 **TailwindCSS + ShadCN** (UI Components)  
🔥 **Axios** (API Calls)  
🔔 **Sonner** (Notifications)

---

## 🏆 Why use this?

> "A great developer toolkit should feel **invisible** – always there, never in your way!"

💡 **Less Code, More Productivity** – Stop writing repetitive logic.  
📦 **Ready-to-Go Modules** – Just plug in your API and ship faster.  
🌍 **Scalable & Extensible** – Built for projects big & small.  
💻 **Dev-Friendly DX** – Say goodbye to spaghetti code!  

---

## 📢 Contributing

Got ideas? Found a bug? **PRs are welcome!** 🎉  
Clone the repo, make your changes, and submit a PR!  

```sh
git clone https://github.com/dev-stack.git
cd dev-stack
npm install
```

---

## 💬 Let's Connect!

🐦 **Twitter:** [Ajay Shakya](https://twitter.com/azzayshakya)  
💼 **LinkedIn:** [Ajay Shakya](https://linkedin.com/in/azayshakya)  
🚀 **Portfolio:** [Coming Soon!]  

---

**Made with ❤️ by Ajay Shakya**

