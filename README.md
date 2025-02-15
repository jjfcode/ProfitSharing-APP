# ProfitSharing-APP

A professional Progressive Web App (PWA) designed to simplify profit sharing calculations among multiple companies. This tool helps production companies, event organizers, and business partners calculate and distribute profits while accounting for individual costs and expenses.

## Live Demo

Try the application here: [Profit Sharing Calculator](https://jjfcode.github.io/ProfitSharing-APP/)

## How to Use

1. Enter Show Details:
   - Input the show name
   - Enter the total amount
   - Specify number of companies (2-10)
   - Click "Add Companies"

2. For Each Company:
   - Enter company name
   - Add costs (if any):
     * Company name for cost
     * Cost description
     * Amount
   - Or click "No Cost" if company has no costs
   - Use "+ Add Cost" for multiple costs

3. Choose Distribution Method:
   - Equal Share: Splits remaining profit equally
   - Percentage Based: Distribute by specified percentages

4. View and Export Results:
   - Review the calculation breakdown
   - See individual company shares
   - Export results to PDF
   - Save detailed reports

#### Frontend
- **index.html**: Main application interface
- **css/styles.css**: Custom styling and layout
- **js/script.js**: Core application functionality
- **js/saveResults.js**: PDF export functionality

#### Backend (Optional - Contact Form)
- **js/contact.js**: Contact form handling
- **server/server.js**: Express server setup
- **.env**: Environment configuration
- **package.json**: Project dependencies

#### Configuration
- **.gitignore**:
  ```
  node_modules/
  .env
  ```

- **.env**:
  ```
  EMAIL_USER=your-gmail@gmail.com
  EMAIL_PASS=your-gmail-app-password
  PORT=3000
  ```

## Features

### Core Functionality
- ✨ Equal share & percentage-based distribution
- 📊 Support for 2-10 companies
- 💰 Detailed cost management
- 📱 PWA capabilities with offline support
- 🌙 Dark mode support
- 📄 PDF export functionality

### PWA Features
- 📱 Installable on any device
- 🔄 Works offline
- ⚡ Fast loading times
- 📲 App-like experience
- 🔒 Secure HTTPS delivery

## Quick Start

1. Visit [Profit Sharing Calculator](https://jjfcode.github.io/ProfitSharing-APP/)
2. Click "Install" when prompted (or use Add to Home Screen)
3. Start calculating profit shares!

## Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
```bash
# Clone repository
git clone https://github.com/yourusername/ProfitSharing-APP.git

# Navigate to project
cd ProfitSharing-APP

# Install dependencies
npm install
```

### 1. Initialize Project
```bash
# Create package.json
npm init -y
```

### 2. Install Dependencies
```bash
# Install required packages
npm install express cors nodemailer dotenv

# Install development dependencies
npm install nodemon --save-dev
```

### 3. Configure package.json
Replace or update your package.json with:
```json
{
  "name": "profitsharing-app",
  "version": "1.0.0",
  "description": "",
  "main": "server/server.js",
  "scripts": {
    "start": "node server/server.js",
    "dev": "nodemon server/server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "nodemailer": "^6.9.7"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
}
```

### 4. Start the Server
```bash
# Development mode (with auto-reload)
npm run dev

# OR Production mode
npm start
```

### Important Notes:
- Run `npm install` after cloning the repository
- Make sure Node.js is installed on your system
- The server must be running for the contact form to work
- Contact form functionality is optional
- Frontend features work without server setup

## GitHub Repository

You can find the source code and contribute to the project on GitHub: [ProfitSharing-APP](https://github.com/yourusername/ProfitSharing-APP)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Questions

If you have any questions, feel free to open an issue on the GitHub repository or contact the author directly.

## Author

John Ferlito  
Email: [jjfcode@gmail.com](mailto:jjfcode@gmail.com)
