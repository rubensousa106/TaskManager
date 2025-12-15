# TaskManager

**TaskManager** is a full-stack task management application built with **React** and **Spring Boot**.  
It allows users to create and manage tasks, while providing an **admin back-office** to edit and control task data.

## Features

- **Task Management**: Create, list, update, and delete tasks
- **Task Details**: View and edit individual tasks
- **Admin Area**: Dedicated admin dashboard with full task editing capabilities
- **Admin Authentication**: Simple admin login (development purpose)
- **REST API**: Backend exposes a RESTful API consumed by the frontend

## Technologies Used

### Frontend
- **React (Vite)**: User interface and routing
- **React Router**: Client-side navigation
- **Tailwind CSS**: Styling
- **lucide-react**: Icons

### Backend
- **Spring Boot**: REST API and application logic
- **Spring Data JPA**: Persistence layer
- **Hibernate**: ORM
- **H2 Database**: File-based database
- **Maven**: Dependency management

## Requirements

- Node.js 18 or later
- Java JDK 17 or later
- Maven

## Installation and Setup

### Clone the Repository

```sh
git clone https://github.com/your-username/taskmanager.git
```
```sh
cd taskmanager
```

### Backend Setup

```sh
cd backend

```sh
mvn spring-boot:run
```

Backend runs at:
http://localhost:8080

### Frontend Setup

```sh
cd frontend
```
```sh
npm install
```

```sh
npm run dev
```

Frontend runs at:
http://localhost:5173

### Admin Login (Development)
- **Username:** admin
- **Password:** admin123
