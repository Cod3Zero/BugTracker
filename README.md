# 🐞 Bug Tracker Application

A full-stack bug tracking system built with **Spring Boot** backend and **React** frontend, designed to help development teams efficiently manage and track bugs throughout the software development lifecycle.

## 🚀 Features

### Core Functionality
- **Bug Management**: Create, view, update, and delete bugs
- **Status Tracking**: Track bug status (Open, In Progress, Resolved, Closed)
- **Search & Filter**: Find bugs by title, description, or status
- **Statistics Dashboard**: View bug statistics and trends
- **User Authentication**: Secure login system

### Technical Features
- **RESTful API**: Clean API design with proper HTTP methods
- **Database Integration**: MySQL database with JPA/Hibernate
- **Responsive Design**: Mobile-friendly React interface
- **Real-time Updates**: Dynamic UI updates without page refresh
- **Error Handling**: Comprehensive error handling and validation

## 🛠️ Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **MySQL 8.0**
- **Maven**

### Frontend
- **React 18**
- **JavaScript ES6+**
- **CSS3 with Modern Styling**
- **Axios for API calls**

## 📋 Prerequisites

Before running this application, make sure you have:

- **Java 17** or higher
- **Node.js 16** or higher
- **MySQL 8.0** or higher
- **Maven 3.6** or higher

## 🏗️ Project Structure

```
bug-tracker/
├── backend/
│   ├── src/
│   │   └── main/
│   │       └── java/
│   │           └── com/
│   │               └── bugtracker/
│   │                   ├── BugTrackerApplication.java
│   │                   ├── controller/
│   │                   │   └── BugController.java
│   │                   ├── model/
│   │                   │   └── Bug.java
│   │                   ├── repository/
│   │                   │   └── BugRepository.java
│   │                   └── service/
│   │                       └── BugService.java
│   └── pom.xml
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginPage.js
│   │   │   ├── LandingPage.js
│   │   │   └── BugTracker.js
│   │   ├── services/
│   │   │   └── bugService.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### 1. Database Setup

1. Install and start MySQL server
2. Create a database named `bugtracker`:
   ```sql
   CREATE DATABASE bugtracker;
   CREATE USER 'buguser'@'localhost' IDENTIFIED BY 'bugpass';
   GRANT ALL PRIVILEGES ON bugtracker.* TO 'buguser'@'localhost';
   FLUSH PRIVILEGES;
   ```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Update database configuration in `application.properties` if needed:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/bugtracker
   spring.datasource.username=buguser
   spring.datasource.password=bugpass
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend will start on `http://localhost:3000`

## 📱 Usage

### Default Login Credentials
- **Username**: `admin`
- **Password**: `admin`

### Main Features

1. **Landing Page**: Overview of the bug tracking system
2. **Login**: Secure authentication
3. **Bug Dashboard**: 
   - View all bugs in a table format
   - Add new bugs with title and description
   - Update bug status (Open, In Progress, Resolved, Closed)
   - Delete bugs
   - Search bugs by keywords
4. **Statistics**: View bug counts by status

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bugs` | Get all bugs |
| GET | `/api/bugs/{id}` | Get bug by ID |
| POST | `/api/bugs` | Create new bug |
| PUT | `/api/bugs/{id}` | Update bug |
| DELETE | `/api/bugs/{id}` | Delete bug |
| GET | `/api/bugs/search?query={query}` | Search bugs |
| GET | `/api/bugs/statistics` | Get bug statistics |

## 🎨 Screenshots

### Landing Page
Clean and modern landing page with system overview and login functionality.

### Bug Dashboard
Comprehensive bug management interface with table view, forms, and search functionality.

### Statistics View
Visual representation of bug counts and status distribution.

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Build the JAR file:
   ```bash
   mvn clean package
   ```
2. Run the JAR:
   ```bash
   java -jar target/bug-tracker-backend-0.0.1-SNAPSHOT.jar
   ```

### Frontend Deployment
1. Build for production:
   ```bash
   npm run build
   ```
2. Serve the build folder using a web server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- None currently reported

## 📞 Support

For support, email support@bugtracker.com or create an issue in this repository.

## 🎯 Future Enhancements

- [ ] User roles and permissions
- [ ] Email notifications
- [ ] File attachments for bugs
- [ ] Bug comments and history
- [ ] Integration with development tools
- [ ] Advanced reporting and analytics
- [ ] Mobile app version

---

**Built with ❤️ by the Bug Tracker Team**