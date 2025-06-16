
# Questly Backend


Welcome to the **Questly Backend** repository! This project powers the backend of **Questly**, a gamified educational platform designed to motivate and track learners' progress through quests, streaks, and experience points.

> 🚀 Repository: [https://github.com/KrishnaGrg1/Questly-Backend.git](https://github.com/KrishnaGrg1/Questly-Backend)

---

## 🏗️ Features

- ✅ User registration and login (JWT-based auth)
- 🎯 Quest creation and completion tracking
- 🧠 XP, levels, and streak calculation logic
- 📊 Goal setting and personal progression
- 🔒 JWT-based session handling
- 💾 PostgreSQL with Prisma O

---

## 🛠️ Tech Stack

| Layer        | Technology     |
|--------------|----------------|
| Backend      | Node.js, Express.js |
| Database     | PostgreSQL + Prisma ORM |
| Auth         | JWT (JSON Web Tokens) |
| Deployment   | Railway / Render / Vercel (suggested) |

---

## 📦 Installation

1. **Clone the repo:**

```bash
git clone https://github.com/KrishnaGrg1/Questly-Backend.git
cd Questly-Backend
```

2. **Setup Backend:**

```bash
cd Questly-Backend
npm install
```

3. **Create your `.env` file inside `backend/`:**

```env
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secret_key
PORT=port_number
```


4. **Initialize Prisma and migrate DB**

```bash
npx prisma migrate dev 
npx prisma generate
```
5. **Run Backend:**

```bash
npm start
```

---


## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

> Make sure to update tests and documentation where needed.

---

## 📄 License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/)

---

## 🔗 Author

**Krishna Bahadur Gurung**  
🌐 [GitHub @KrishnaGrg1](https://github.com/KrishnaGrg1)

---
