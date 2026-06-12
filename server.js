const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https://*"],
            connectSrc: ["'self'"]
        }
    }
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiter to prevent brute force/spam
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use(globalLimiter);

// Specific rate limit for contact form submissions (5 requests per 15 mins)
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, error: 'Too many contact requests. Please try again after 15 minutes.' }
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// POST endpoint for contact form mail processing
app.post('/api/contact', contactLimiter, async (req, res) => {
    const { name, email, message } = req.body;

    // Server-side validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    try {
        // Build Transporter using SMTP settings
        // If credentials are placeholders, log mock output for testing
        const isPlaceholder = process.env.EMAIL_USER === 'your-email@gmail.com' || !process.env.EMAIL_PASS;
        
        if (isPlaceholder) {
            console.log('\n--- [Mock Mail Server Log] ---');
            console.log(`To: ${process.env.RECEIVER_EMAIL}`);
            console.log(`Subject: New Portfolio Message from ${name}`);
            console.log(`From Details: ${email}`);
            console.log(`Message Body:\n${message}`);
            console.log('------------------------------\n');
            
            return res.status(200).json({ 
                success: true, 
                message: 'Message processed successfully (Mock server log)! Set up your .env SMTP credentials for live routing.' 
            });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Setup mail options
        const mailOptions = {
            from: `"${name}" <${process.env.EMAIL_USER}>`, // Send through host account
            replyTo: email, // Direct reply back to sender
            to: process.env.RECEIVER_EMAIL,
            subject: `Portfolio Contact: Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 8px;">New Portfolio Message</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <br>
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; border-left: 4px solid #9ca3af;">
                        <p style="white-space: pre-wrap; margin: 0;">${message}</p>
                    </div>
                </div>
            `
        };

        // Send Email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });

    } catch (error) {
        console.error('Mail Sending Error:', error);
        res.status(500).json({ success: false, error: 'Failed to send message. Please try again later.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'production'} mode on http://localhost:${PORT}`);
});
