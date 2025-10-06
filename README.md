# 🧩 Kube Credential – Microservice Credential Issuance and Verification System

**Author:** Carolene Prem Leela
**Email:** [carolenepremleela@gmail.com](mailto:carolenepremleela@gmail.com)
**Role Applied:** Senior Full Stack Engineer
**Date:** October 2025

---

## 📘 Overview

**Kube Credential** is a microservice-based system designed to issue and verify credentials securely.
It demonstrates scalable, containerized deployment using **Docker**, **TypeScript**, **MySQL**, and **Kubernetes (AWS EKS)**.

The system includes:

* **Issuance Service** – Handles creation of credentials.
* **Verification Service** – Verifies previously issued credentials.
* **React Frontend** – Simple UI to issue and verify credentials.

---

## 🏗️ Architecture

### Components

| Component        | Technology                     | Description                                     |
| ---------------- | ------------------------------ | ----------------------------------------------- |
| Issuance API     | Node.js + TypeScript + Express | Issues new credentials and stores in MySQL      |
| Verification API | Node.js + TypeScript + Express | Validates credentials against MySQL records     |
| Database         | MySQL                          | Stores credential data, timestamps, worker info |
| Frontend         | React + TypeScript             | UI to issue and verify credentials              |
| Containerization | Docker                         | Each service containerized                      |
| Orchestration    | Kubernetes (AWS EKS)           | Manages scaling and deployment                  |
| Hosting          | AWS EKS + S3 (Frontend)        | Backend in EKS, Frontend on S3/CloudFront       |

---

## ⚙️ System Requirements

### Backend

* Node.js v18+
* TypeScript
* MySQL 8.x
* Docker
* Kubernetes CLI (`kubectl`)
* AWS CLI configured with IAM access

### Frontend

* React (TypeScript)
* Axios for API communication
* TailwindCSS for styling

---

## 🧱 Project Structure

```
kube-credential/
│
├── backend/
│   ├── issuance/
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── routes/
│   │   │   ├── controllers/
│   │   │   └── db.ts
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── verification/
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── routes/
│   │   │   ├── controllers/
│   │   │   └── db.ts
│   │   ├── Dockerfile
│   │   └── package.json
│   └── docker-compose.yml
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── IssuePage.tsx
│   │   │   └── VerifyPage.tsx
│   │   ├── components/
│   │   └── App.tsx
│   ├── Dockerfile
│   └── package.json
│
└── k8s/
    ├── issuance-deployment.yaml
    ├── verification-deployment.yaml
    ├── issuance-service.yaml
    ├── verification-service.yaml
    └── ingress.yaml
```

---

## 🗃️ Database Schema (MySQL)

**Database:** `kube_credential`
**Table:** `credentials`

```sql
CREATE TABLE credentials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  credential_id VARCHAR(100) UNIQUE,
  data JSON,
  worker_id VARCHAR(50),
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Backend Setup

### 1. Environment Variables

Create `.env` inside both `issuance/` and `verification/`:

```
PORT=8080
DB_HOST=mysql
DB_USER=root
DB_PASS=rootpassword
DB_NAME=kube_credential
WORKER_ID=worker-1
```

### 2. Local Run (Docker Compose)

```bash
cd backend
docker-compose up --build
```

This spins up:

* MySQL container
* Issuance API (port 8081)
* Verification API (port 8082)

---

## 🧩 API Endpoints

### Issuance Service

**POST** `/issue`
**Body:**

```json
{
  "credential_id": "123",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "message": "credential issued by worker-1",
  "timestamp": "2025-10-06T14:55:00Z"
}
```

### Verification Service

**POST** `/verify`
**Body:**

```json
{ "credential_id": "123" }
```

**Response:**

```json
{
  "valid": true,
  "worker_id": "worker-1",
  "issued_at": "2025-10-06T14:55:00Z"
}
```

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Pages

* `/issue` → Form to issue credentials
* `/verify` → Form to verify credentials

### Connect API URLs

In `frontend/src/config.ts`:

```ts
export const API_BASE_ISSUANCE = "https://api.kube.example.com/issue";
export const API_BASE_VERIFICATION = "https://api.kube.example.com/verify";
```

---

## 🐳 Dockerization

### Example Dockerfile (for backend)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]
```

### Build & Push

```bash
docker build -t carolenepremleela/issuance:latest .
docker push carolenepremleela/issuance:latest
```

---

## ☸️ Kubernetes Deployment (AWS EKS)

### Deploy Backend

```bash
kubectl apply -f k8s/issuance-deployment.yaml
kubectl apply -f k8s/verification-deployment.yaml
kubectl apply -f k8s/issuance-service.yaml
kubectl apply -f k8s/verification-service.yaml
```

### Optional Ingress

```bash
kubectl apply -f k8s/ingress.yaml
```

**Validate:**

```bash
kubectl get pods
kubectl get svc
```

---

## 🧪 Testing

**Backend:**

```bash
npm run test
```

**Frontend:**

```bash
npm run test
```

---

## 📸 Deliverables

Include in your final submission:

* Source code (zipped)
* Screenshots or screen recording of:

  * Issuance flow
  * Verification flow
  * Deployed pods on AWS EKS
* Public frontend URL (e.g., from AWS S3 or CloudFront)
* README.md file (this one)

---

## 📊 Assumptions

* Each microservice connects to its own MySQL schema for isolation.
* AWS RDS free-tier MySQL used for persistence.
* EKS cluster created using `eksctl`.
* LoadBalancer service exposes public endpoints for frontend consumption.

---

## 🧠 Key Design Decisions

| Aspect        | Decision          | Reason                                         |
| ------------- | ----------------- | ---------------------------------------------- |
| Language      | TypeScript        | Type safety for both frontend and backend      |
| DB            | MySQL             | Reliable relational DB with JSON field support |
| Architecture  | Two microservices | Independent scalability and resilience         |
| Hosting       | AWS EKS           | Enterprise-grade, production-like environment  |
| Communication | REST (JSON)       | Simplicity and standardization                 |
| Deployment    | Docker + K8s      | Reproducibility and scalability                |

---

## ✅ Evaluation Highlights

* Modular, type-safe Node.js + TypeScript backend
* React UI with clear feedback
* Proper Dockerized deployments
* K8s manifests for EKS scalability
* MySQL persistence with JSON flexibility
* Clean architecture and clear documentation

---

**Good luck and happy building!**
*Developed by Carolene Prem Leela*
