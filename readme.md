### BEM Group Assessment

This repository is part of the BEM Group Assessment, designed to evaluate your skills in building a full-stack application using Laravel and React. The project includes various features such as user authentication, todo management, and email notifications.

#### Features

- **User Authentication**: Secure login and registration system.
- **Todo Management**: Create, update, delete, and complete todos.
- **Email Notifications**: Automatic email reminders for todos.
- **Logger**: Logs all sent emails for auditing purposes.
- **Deployment**: Deployment on GCP (Google Cloud Platform) VM Instance.

#### Technologies Used

- **Backend**: Laravel
- **Frontend**: React
- **Database**: SQLite
- **Email**: SMTP for sending emails
- **Logging**: Custom email logging system

#### Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/hozaifa4you/bem-group-assessment.git
   ```
2. **Install Dependencies**:
   ```bash
   cd bem-group-assessment
   composer install
   npm install
   ```
3. **Set Up Environment**:

   - Copy `.env.example` to `.env` and configure your database and email settings.

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Update .env**:

   - Set your database connection to SQLite:

   ```env
   DB_CONNECTION=sqlite

   # All the SMTP settings
   MAIL_MAILER=smtp
   MAIL_HOST=your_smtp_host
   MAIL_PORT=your_smtp_port
   MAIL_USERNAME=your_smtp_username
   MAIL_PASSWORD=your_smtp_password
   MAIL_ENCRYPTION=tls
   MAIL_FROM_ADDRESS=your_email@example.com
   MAIL_FROM_NAME="${APP_NAME}"
   ```

5. **Run Migrations**:
   ```bash
   php artisan migrate
   ```
6. **Run the Application**:
   ```bash
   composer run dev
   ```
