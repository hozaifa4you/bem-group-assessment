<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Todo Reminder</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #f0f0f0;
        }

        .logo {
            max-width: 150px;
            height: auto;
        }

        .content {
            padding: 20px 0;
        }

        .todo-list {
            margin-top: 20px;
            display: grid;
            gap: 15px;
        }

        .task-card {
            background-color: #f8f9fa;
            border-left: 4px solid #4f46e5;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }

        .task-title {
            margin: 0;
            color: #1a202c;
            font-size: 18px;
            font-weight: 600;
        }

        .task-description {
            margin: 10px 0;
            color: #4a5568;
        }

        .task-date {
            display: inline-block;
            font-size: 14px;
            color: #718096;
            margin-top: 10px;
        }

        .task-status {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
            margin-left: 10px;
        }

        .status-pending {
            background-color: #ebf4ff;
            color: #4299e1;
        }

        .status-due-soon {
            background-color: #feebcb;
            color: #dd6b20;
        }

        .status-overdue {
            background-color: #fed7d7;
            color: #e53e3e;
        }

        .btn {
            display: inline-block;
            background-color: #4f46e5;
            color: #fff !important;
            text-decoration: none;
            padding: 10px 16px;
            border-radius: 4px;
            font-weight: 500;
            margin-top: 15px;
        }

        .btn:hover {
            background-color: #4338ca;
        }

        .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 12px;
            color: #a0aec0;
            border-top: 1px solid #f0f0f0;
        }

        .social-links {
            margin: 15px 0;
        }

        .social-links a {
            display: inline-block;
            margin: 0 5px;
            color: #718096;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="https://example.com/logo.png" alt="Logo" class="logo">
            <h1>Task Reminder</h1>
        </div>

        <div class="content">
            <p>Hello {{ $user['name'] }},</p>
            <p>This is a friendly reminder about your upcoming todo(s):</p>

            <div class="todo-list">
                @foreach ($todos as $todo)
                    <div class="task-card">
                        <h2 class="task-title">{{ $todo['title'] ?? 'Complete Project Presentation' }}</h2>
                        <p class="task-description">
                            {{ $todo['description'] ?? 'Finalize the slides for the quarterly business review and share with the team for feedback before the meeting.' }}
                        </p>
                        <span class="task-date">
                            <strong>Due:</strong>
                            {{ $todo['complete_at'] ? date('F j, Y, g:i a', strtotime($todo['complete_at'])) : 'July 10, 2025, 2:00 pm' }}
                        </span>

                        @if (isset($todo['complete_at']))
                            @php
                                $now = new DateTime();
                                $completeAt = new DateTime($todo['complete_at']);
                                $diff = $now->diff($completeAt);
                                $hoursRemaining = $diff->h + $diff->days * 24;
                            @endphp

                            @if ($hoursRemaining < 6)
                                <span class="task-status status-overdue">Urgent</span>
                            @elseif($hoursRemaining < 24)
                                <span class="task-status status-due-soon">Due Soon</span>
                            @else
                                <span class="task-status status-pending">Pending</span>
                            @endif
                        @else
                            <span class="task-status status-due-soon">Due Soon</span>
                        @endif
                    </div>
                @endforeach
            </div>

            <p>Don't forget to complete this todo on time. You can view and manage your todos by clicking the button
                below:</p>

            <div style="text-align: center;">
                <a href="{{ route('todos') }}" class="btn">View My Todos</a>
            </div>
        </div>

        <div class="footer">
            <p>This is an automated reminder from your todo management system.</p>
            <p>If you've already completed this todo, you can ignore this email.</p>
            <div class="social-links">
                <a href="#">Twitter</a> •
                <a href="#">Facebook</a> •
                <a href="#">LinkedIn</a> •
                <a href="#">Instagram</a>
            </div>
            <p>&copy; {{ date('Y') }} Your Company Name. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
