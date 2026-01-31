# 🍽️ ChefSphere

ChefSphere is a cloud-ready, full-stack recipe management and discovery platform designed with clean architecture, scalability, and security in mind.  
It enables users to discover, create, and manage recipes through a secure and responsive web experience.

---

## 🚀 Live Application

🔗 **Frontend:** https://chefsphere-webapp.netlify.app/
The backend is hosted on an on-demand service and may take up to **4 minutes** to wake up after inactivity. 

---

## 🛠️ Tech Stack

### Backend
![Java](https://img.shields.io/badge/Java-21+-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.9.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring%20Security-JWT-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens)
![Hibernate](https://img.shields.io/badge/JPA%20%2F%20Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white)
![Apache Tomcat](https://img.shields.io/badge/Apache%20Tomcat-10.x-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=black)
![Maven](https://img.shields.io/badge/Maven-Build-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Postman](https://img.shields.io/badge/Postman-API%20Testing-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

---

### Frontend
![React](https://img.shields.io/badge/React-SPA-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React%20Router-Client%20Routing-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML-5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-UI%20Components-000000?style=for-the-badge)

---

### Database
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![TiDB](https://img.shields.io/badge/TiDB-Cloud-FF6A00?style=for-the-badge&logo=tidb&logoColor=white)

---

### DevOps & Deployment
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Render](https://img.shields.io/badge/Render-Backend-000000?style=for-the-badge&logo=render&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-Frontend-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-Version%20Control-181717?style=for-the-badge&logo=github&logoColor=white)

---

## 🔐 Security & Authentication

- JWT-based authentication using Spring Security  
- Stateless session management for scalability  
- Role-based access control (RBAC)  
- Secure token exchange between frontend and backend  

---

## 📑 API Documentation & Testing

- Swagger / OpenAPI for auto-generated API documentation  
- Interactive Swagger UI for endpoint exploration  
- Postman collections used for API testing and validation  

---

## 🌐 Client-Side Routing

- React Router for client-side navigation  
- Protected routes for authenticated users  
- SPA behavior with clean URLs and no full page reloads  

---

## 🖥️ Application Server

- Apache Tomcat 10 (embedded with Spring Boot)  
- Jakarta EE compatible (Spring Boot 3.x)  
- Packaged as a standalone executable JAR  
- Optimized for RESTful API workloads  

---

## 🏗️ Architecture Overview

- **Backend:** Spring Boot REST APIs handling authentication, authorization, and business logic  
- **Frontend:** React Single Page Application consuming REST endpoints  
- **Database:** Cloud-hosted TiDB (MySQL compatible)  
- **Deployment:** Decoupled services enabling independent scaling and maintenance  

---

## ☁️ Deployment Flow

| Component | Platform |
|---------|----------|
| Backend | Render |
| Database | TiDB Cloud |
| Frontend | Netlify |

---

## 🐳 Docker

The backend is fully containerized to ensure consistent runtime behavior across development and production environments.

**Docker Image**
```bash
docker pull abhishekrajvir66/chefsphere-deployment:latest
