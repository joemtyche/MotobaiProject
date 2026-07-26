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
2. [Python 3.11 or 3.12](https://www.python.org/downloads/) for the backend local environment
3. MySQL-compatible database server and CLI client
4. [VS Code](https://code.visualstudio.com/) or another editor

For Fedora, MariaDB is the simplest MySQL-compatible local option:

```bash
sudo dnf install mariadb-server mariadb
sudo systemctl enable --now mariadb
```

MySQL Workbench is optional. The setup below uses terminal commands instead.

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <this link>
cd MotobaiProject
```

### 2. Set up the database

```bash
sudo mariadb
```

Inside the MariaDB/MySQL prompt:

```sql
CREATE DATABASE IF NOT EXISTS motobai;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
FLUSH PRIVILEGES;
EXIT;
```

Test the login:

```bash
mariadb -u root -p motobai
```

When prompted, enter:

```text
root
```

If changing the root password fails on your machine, create a separate app user instead:

```sql
CREATE DATABASE IF NOT EXISTS motobai;
CREATE USER IF NOT EXISTS 'motobai'@'localhost' IDENTIFIED BY 'motobai';
GRANT ALL PRIVILEGES ON motobai.* TO 'motobai'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Then update `backend/backend/settings.py` to use:

```python
'USER': 'motobai',
'PASSWORD': 'motobai',
```

### 3. Set up the frontend

```bash
cd frontend
npm install
```

Create a file named `.env` inside the `frontend/` folder:

```bash
touch .env
```

Add:

```
VITE_API_URL="http://127.0.0.1:8000"
```

> ⚠️ Use `127.0.0.1` and not `localhost` — the browser treats them as different origins and CORS will block requests if you use `localhost`.

### 4. Set up the backend

```bash
cd ..
cd backend
python -m venv .venv

# Windows PowerShell:
.venv\Scripts\Activate.ps1

# macOS/Linux:
source .venv/bin/activate

python -m pip install --upgrade pip
python -m pip install -r requirements-local.txt
```

`requirements-local.txt` is for the local MySQL/MariaDB setup. Do not use `requirements.txt` for local setup unless you also need the Railway/PostgreSQL production dependencies.

### 5. Confirm PyMySQL config

`backend/backend/__init__.py` should contain:

```python
import pymysql
pymysql.install_as_MySQLdb()
```

### 6. Run Django migrations

```bash
python manage.py migrate
```

Do not run `makemigrations` during normal setup. The repo already includes migrations.

### 7. Load local seed data

From the repository root:

```bash
cd ..
mariadb -u root -p motobai < defaultdata/motobai_seed_local.sql
```

If your CLI command is named `mysql` instead:

```bash
mysql -u root -p motobai < defaultdata/motobai_seed_local.sql
```

Use `defaultdata/motobai_seed_local.sql`, not the raw `motobai_dump2.sql`. The raw dump includes old Django internal table data and can conflict with current migrations.

Verify the seed:

```bash
mariadb -u root -p motobai -e "SELECT COUNT(*) AS products FROM api_product; SELECT username FROM auth_user;"
```

Seed login:

```text
username: 123
password: 123
```

---

## ▶️ Running the App

**Terminal 1 — Backend:**
```bash
cd backend
source .venv/bin/activate
python manage.py runserver
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

Then open your browser and go to: `http://127.0.0.1:5173`

---

## 🔧 Troubleshooting

### `python` command not found
Add Python to your system PATH: https://datatofish.com/add-python-to-windows-path/

### `pip` not working
Reinstall or repair pip: https://pip.pypa.io/en/stable/installation/

### `mysqlclient` fails to install
This is a known Windows build issue. Use PyMySQL instead (already covered in step 4–5 above). Do **not** try to install `mysqlclient` directly on Windows without MySQL C headers.

### `psycopg2-binary` fails with `pg_config executable not found`
Use `backend/requirements-local.txt` for local MySQL setup. `psycopg2-binary` is only needed for the Railway/PostgreSQL production setup and can fail on newer Python versions when pip tries to build it from source.

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
