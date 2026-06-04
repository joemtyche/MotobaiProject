# Motobai — Internal Operations App

Motobai is a small, independent business focused on selling motor parts — with a strong emphasis on oils and lubricants that keep engines running at peak performance. Our goal is to provide dependable, accessible automotive supplies for local workshops and internal operations.

This internal-use application is built to support and streamline Motobai's day-to-day workflows. Designed for use by our employees, it offers an efficient and user-friendly interface for managing inventory, tracking orders, and monitoring product data.

---

## 📚 Documentation & Demo

- **Project documentation:** [Motobai Google Docs documentation](https://docs.google.com/document/d/1w_IOIviPqO36PsJ7oSh1fYXXhXqpMLH2piADggkGSXI/edit?usp=sharing)
- **Demo video:** [Motobai demo on YouTube](https://youtu.be/JgODj4c1fUU)

---

## 👨‍💻 Team

| Name | Role |
|------|------|
| Jose Emmanuel Idpan | Backend Developer (Django) |
| Ram Christian Nacar | Frontend Developer (React) |
| Thaddeus Domingo | Quality Assurance & Project Management |

---

## ⚙️ Tech Features

- Built with **React** (frontend) and **Django** (backend)
- RESTful API integration for smooth data flow
- JWT Authentication and user role support
- Real-time inventory management
- Order tracking and status updates
- Modular design for future scalability

---

## 📋 Prerequisites

Install these before proceeding:

1. [Node.js](https://nodejs.org/)
2. [VS Code](https://code.visualstudio.com/)
3. [Python 3.8+](https://www.python.org/downloads/)
4. [MySQL](https://dev.mysql.com/downloads/installer/) — install both **MySQL Server** and **MySQL Workbench**, set the root password to `root`

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <this link>
```

### 2. Set up the frontend

```bash
cd frontend
npm install
```

### 3. Create the frontend `.env` file

Create a file named `.env` inside the `frontend/` folder with the following content:

```
VITE_API_URL="http://127.0.0.1:8000"
```

> ⚠️ Use `127.0.0.1` and not `localhost` — the browser treats them as different origins and CORS will block requests if you use `localhost`.

### 4. Set up the backend

```bash
cd backend
pip install PyMySQL
pip install -r requirements.txt
```

### 5. Configure PyMySQL

Open `backend/backend/__init__.py` (create it if it doesn't exist) and add:

```python
import pymysql
pymysql.install_as_MySQLdb()
```

### 6. Set up the database

Open **MySQL Workbench**, connect to your local server, and create a database named `motobai`:

```sql
CREATE DATABASE motobai;
```

### 7. Run Django migrations

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

### 8. (Optional) Load default data

If a SQL dump file is provided (e.g. `motobai_dump.sql`), import it via MySQL Workbench **after** running migrations in step 7. Migrations must run first to create the tables.

---

## ▶️ Running the App

**Terminal 1 — Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 2 — Backend:**
```bash
cd backend
python manage.py runserver
```

Then open your browser and go to: `http://localhost:5173`

---

## 🔧 Troubleshooting

### `python` command not found
Add Python to your system PATH: https://datatofish.com/add-python-to-windows-path/

### `pip` not working
Reinstall or repair pip: https://pip.pypa.io/en/stable/installation/

### `mysqlclient` fails to install
This is a known Windows build issue. Use PyMySQL instead (already covered in step 4–5 above). Do **not** try to install `mysqlclient` directly on Windows without MySQL C headers.

### Login returns CORS error
Make sure your `.env` uses `http://127.0.0.1:8000` and **not** `http://localhost:8000`. Restart the frontend after changing `.env`.

### Login returns 500 / datetime error
Open `backend/backend/settings.py` and set:
```python
USE_TZ = False
```
Then restart the Django server.

### Wrong database password
Open `backend/backend/settings.py` and update the password to match what you set during MySQL installation:
```python
DATABASES = {
    'default': {
        ...
        'PASSWORD': 'your_password_here',
        ...
    }
}
```

---

*At Motobai, we believe that a well-oiled system is just as important as a well-oiled machine.*