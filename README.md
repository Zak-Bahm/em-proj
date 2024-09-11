# Task Prioritization App

This project aims to deliver a user-friendly application designed to help users manage and prioritize their tasks effectively, utilitizing the [Eisenhower method](https://asana.com/resources/eisenhower-matrix).

#### Contents

1. [Core Features](#core-features)
2. [Tools and Technology](#tools-and-technology)
3. [Setting Up](#setting-up)

## Core Features

Below are team-identified core features, expressed as a preliminary list of API endpoints and associated frontend views.

> NOTE: Specifics are subject to change as the project develops

**Backend**

- [User Account Management](#user-account-management)
- [Task Management](#task-management)
- [Task Categorization](#task-categorization)
- [Custom Categories and Labels](#custom-categories--labels-post-mvp)

**Frontend**

- [Login Page](#login-page)
- [Home Page](#home-page)
- [Uncategorized Task List](#uncategorized-task-list)
- [Categorized Task List](#categorized-task-list)

---

### User Account Management

| endpoint      | type | effect                                                 |
| ------------- | ---- | ------------------------------------------------------ |
| /api/register | POST | Registers a new user in the system                     |
| /api/login    | POST | Authenticates a user and generates a session token     |
| /api/logout   | POST | Logs out the user, invalidating the session token      |
| /api/user     | GET  | Retrieves the authenticated user's profile information |
| /api/user     | PUT  | Updates the user's profile                             |

---

### Task Management

| endpoint        | type   | effect                                          |
| --------------- | ------ | ----------------------------------------------- |
| /api/tasks      | POST   | Creates a new task for the authenticated user   |
| /api/tasks      | GET    | Fetches all tasks for the authenticated user    |
| /api/tasks/{id} | GET    | Retrieves details of a specific task by task ID |
| /api/tasks/{id} | PUT    | Updates the task details by task ID             |
| /api/tasks/{id} | DELETE | Delets a task by task ID                        |

---

### Task Categorization

| endpoint                 | type | effect                                                |
| ------------------------ | ---- | ----------------------------------------------------- |
| /api/tasks/categorized   | GET  | Fetches tasks categorized using the Eisenhower matrix |
| /api/tasks/{id}/complete | PUT  | Marks a task as complete                              |

---

### Login Page

**Purpose**: Prompts authentication for logged off users

**Function**: Allows users to "log in" by entering their name

**Components**:

- Title
- Description
- Login form

---

### Home Page

![image](https://github.com/user-attachments/assets/5f3f6275-22d9-4558-832d-001d9c82a05e)


**Purpose**: Main dashboard where users can view tasks and access other parts of the app.

**Function**: Users can add new tasks. Clicking an existing task opens a modal to allow task edits.

**Components**:

- Task form
- Task lists
- Navbar

---

### Uncategorized Task List

![image](https://github.com/user-attachments/assets/35e9f067-1ac7-48db-9414-c56e0a467a8e)


**Purpose**: Allows users to view and categorize all tasks

**Function**: Clicking the task creation button opens the Task Form. Clicking on an existing task opens a modal to allow task edits.

**Components**:

- Full list of uncategorized tasks
- Task creation button
- Navbar

---

### Categorized Task List

![image](https://github.com/user-attachments/assets/76282d2e-e8c7-45f3-901a-6488a3e81d02)


**Purpose**: Allows users to view all categorized tasks and mark them complete.

**Function**: Clicking on a task expands it to show the title, desciprtion, and a "complete" button.

**Components**:

- Lists for the following categories:
  - Important + Urgent
  - Important + Not Urgent
  - Not Important + Urgent
  - Not Important + Not Urgent
- Navbar

## Tools and Technology

### Organization

- [**GitHub**](https://github.com) for version control, task management, and collaboration
- [**Discord**](https://discord.com) for communication between team members

### Documentation

- [**Sphinx**](https://www.sphinx-doc.org/en/master/) for technical documentation

### Frontend

- [**Bootstrap**](https://getbootstrap.com/docs/5.3/getting-started/introduction/) for frontend design
- [**Vue.js**](https://vuejs.org/guide/introduction.html) for components and navigation

### Backend

- [**MongoDB**](https://www.mongodb.com) for data
- [**Node.js**](https://nodejs.org/docs/latest/api/) for the API

### Testing and Deployment

- [**Vitest**](https://vitest.dev/guide/) for unit testing
- [**Nightwatch**](https://nightwatchjs.org/guide/overview/what-is-nightwatch.html) for end-to-end testing
- [**AWS**](https://aws.amazon.com) for deployment

## Setting up

1. Clone the repo

   ```
   git clone https://github.com/Zak-Bahm/em-proj.git
   ```

2. Install dependencies

   ```
   cd em-proj      # cd into project dir
   npm ci          # run a clean install (when not adding individual dependencies)

   python -m venv .venv            # create docs env
   source .venv/bin/activate       # activate docs env
   pip install -r requirements.txt # install docs requirements
   ```
3. Start the back-end api server
   ```
   npm run backend    # start the mongodb server
   ```

4. Start the front-end dev server
    ```
    npm run dev       # start the local dev server at http://localhost:5173/
    ```

5. Build/view the technical docs

   ```
   cd docs             # cd into docs dir
   make html           # make the html files from source

   # open docs/build/html/index.html using live server to view
   ```
