# SwasthhSeva - Healthcare Management System

SwasthhSeva is a comprehensive healthcare management system that connects patients with hospitals, manages bed availability, and stores critical healthcare data on the blockchain for transparency and security.

## Features

### Patient Features
- User authentication and profile management
- Real-time hospital bed availability tracking
- Search and filter hospitals by location and bed availability
- View detailed hospital information including:
  - Total free beds
  - Critical care beds (with/without ventilator)
  - Non-critical beds
  - Contact information
- Blockchain integration for secure data storage
- Verification system for patient accounts

### Hospital Features
- Hospital profile management
- Real-time bed availability updates
- Patient admission tracking
- Blockchain data storage for transparency

## Tech Stack

### Frontend
- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (Animations)
- React Icons
- Ethers.js (Blockchain Integration)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

### Blockchain
- Ethereum Network
- Smart Contracts for data storage
- MetaMask Integration

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- MetaMask Browser Extension
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/SwasthhSeva.git
cd SwasthhSeva
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend/saarthi
npm install

# Install backend dependencies
cd ../../backend
npm install
```

3. Environment Setup:
Create `.env` files in both frontend and backend directories:

Frontend (.env):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_BLOCKCHAIN_CONTRACT_ADDRESS=your_contract_address
```

Backend (.env):
```env
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend/saarthi
npm run dev
```

3. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Blockchain Integration

### Smart Contract Setup
1. Deploy the smart contract to your preferred Ethereum network
2. Update the contract address in the frontend environment variables
3. Ensure MetaMask is installed and connected to the correct network

### Using Blockchain Features
1. Connect your MetaMask wallet
2. Store hospital data on the blockchain
3. View transaction history and stored data

## Project Structure

```
SwasthhSeva/
├── frontend/
│   └── saarthi/
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/
│       │   │   │   ├── context/
│       │   │   │   ├── services/
│       │   │   │   └── utils/
│       │   │   └── ...
│       │   └── ...
│       └── ...
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── ...
    └── ...
```

## Authentication Flow

1. User Registration:
   - Sign up with email and role (patient/hospital)
   - Verify email address
   - Complete profile setup

2. User Login:
   - JWT-based authentication
   - Role-based access control
   - Persistent sessions with localStorage

3. Protected Routes:
   - Patient dashboard
   - Hospital management
   - Profile pages

## API Endpoints

### Authentication
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- GET /api/v1/auth/verify

### Patient
- GET /api/v1/user/profile/:id
- PUT /api/v1/user/profile/:id
- GET /api/v1/user/verification

### Hospital
- GET /api/v1/hospital/profile/:id
- PUT /api/v1/hospital/profile/:id
- GET /api/v1/hospital/beds

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security

- JWT-based authentication
- Password hashing
- Input validation
- CORS protection
- Rate limiting
- Blockchain data encryption

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@swasthhseva.com or create an issue in the repository.

## Acknowledgments

- Delhi Government for hospital data
- MetaMask for blockchain integration
- Next.js team for the amazing framework
- All contributors who have helped shape this project 