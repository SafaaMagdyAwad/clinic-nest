
# Clinic Booking System - NestJS Backend

This is the **backend API** for a **Clinic Booking System** built with **NestJS** and **TypeScript**.  
The system allows **patients to register, view doctors, book appointments**, and **doctors to manage their availability and appointments**.  
It also includes **admin features** for managing doctors, appointments, and statistics.

---

## 🏗️ Tech Stack

- **Backend Framework:** [NestJS](https://nestjs.com/)  
- **Database:** MongoDB (Mongoose)   
- **Authentication:** JWT (JSON Web Token)  
- **Validation:** class-validator, class-transformer  
- **File Uploads:** Multer (for doctor profile pictures)  
- **Environment Variables:** `.env` file for secrets, database, and server configs

---

## 📁 Project Structure

```

src/
├── auth/                  # Authentication module (login, register, JWT)
├── doctors/               # Doctor module (profile, availability)
├── patients/              # Patient module (profile, appointments)
├── appointments/          # Appointment module (CRUD + status)
├── medical-records/       # Patient medical records module
├── admin/                 # Admin module (manage doctors, appointments)
├── common/                # DTOs, Guards, Interfaces, Pipes
├── main.ts                # Entry point
└── app.module.ts          # Root module

````

---

## 🔐 Authentication Flow

- **Patient  Registration**: `/auth/register`
- **Login**: `/auth/login`
- JWT token returned on successful login
- Protected routes require `Authorization: Bearer <token>`

**Roles Supported:**
- `USER`
- `DOCTOR`
- `ADMIN`

---

## 🩺 Features

### Patient
- Register, Login
- View and edit profile
- Browse doctors and filter by specialty, rating, city
- Book, cancel, reschedule appointments
- View appointment history

### Doctor
- Login
- Manage profile (bio, specialization, price, photo)
- Manage availability (weekly schedule, time slots)
- Approve/Reject appointments
- Complete or cancel appointments
- View dashboard stats (today's appointments, weekly summary)

### Admin
- Manage doctors (add/edit/delete)
- Manage appointments (view, filter, status updates)
- Dashboard analytics

---

## ⚡ Endpoints (Summary)

**Auth:**
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`

**Patient:**
- `GET /patients/me`
- `PATCH /patients/me`
- `DELETE /patients/me`
- `GET /patients/me/appointments`
- `POST /appointments`
- `PATCH /appointments/:id/cancel`

**Doctor:**
- `GET /doctors/me`
- `PATCH /doctors/me`
- `GET /doctors/me/availability`
- `POST /doctors/me/availability`
- `PATCH /appointments/:id/approve`
- `PATCH /appointments/:id/reject`
- `PATCH /appointments/:id/complete`

**Admin:**
- `GET /admin/doctors`
- `POST /admin/doctors`
- `PATCH /admin/doctors/:id`
- `DELETE /admin/doctors/:id`
- `GET /admin/appointments`
- `PATCH /admin/appointments/:id`

---

## ⚙️ Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/SafaaMagdyAwad/clinic-nest.git
cd clinic-nest
````

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file based on `.env.example`:

```env
PORT=5000
JWT_SECRET=your_jwt_secret
DB_URI=mongodb://localhost:27017/clinic
```

4. Run the project in development:

```bash
npm run start
```

5. API will run at: `http://localhost:5000`
6. swagger run at: `http://localhost:5000/api`
---

## 🧪 Testing

* Unit and e2e tests with Jest

```bash
npm run test
npm run test:e2e
```

---

## 🌐 Postman / API Docs

* API documentation available via Swagger 

```ts
// main.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Clinic Booking API')
  .setDescription('API documentation for Clinic Booking System')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```

Visit: `http://localhost:3000/api`

---

## 👨‍💻 Contributions

* Fork the repository
* Create a new branch
* Make your changes
* Submit a Pull Request

---

## 📄 License

This project is licensed under the MIT License.





