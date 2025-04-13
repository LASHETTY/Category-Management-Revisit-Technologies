
# Category Management

A full-stack e-commerce platform with Category Management Dashboard functionality. This admin panel allows users to sign up, log in, and manage product categories effectively.

## Features

- **Authentication**
  - Secure user signup and login system
  - JWT-based authentication
  - Session persistence

- **Dashboard**
  - Clean, responsive UI inspired by modern admin panels
  - Overview of all product categories
  - Card-based category visualization

- **Category Management**
  - View all categories in a responsive grid layout
  - Add new categories with name, item count, and image
  - Edit existing categories
  - Delete categories with confirmation dialog
  - Image upload and management

## Tech Stack

- **Frontend**
  - React.js with functional components and hooks
  - TypeScript for type safety
  - Tailwind CSS for responsive styling
  - Shadcn UI components

- **State Management**
  - React Context API
  - Tanstack React Query for data fetching

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```sh
   git clone <https://github.com/LASHETTY/Category-Management-Revisit-Technologies.git>
   cd category-management
   ```

2. Install dependencies
   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
src/
├── components/      # React components
│   ├── ui/          # UI components from Shadcn
│   ├── categories/  # Category management components
│   └── dashboard/   # Dashboard layout components
├── contexts/        # React context providers
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and helpers
└── pages/           # Page components
```

## Screenshots

*Include screenshots of your application here*

## Deployment

This application can be deployed on platforms like:
- Vercel
- Netlify
- Render

## Future Enhancements

- Product management functionality
- User role management
- Advanced analytics dashboard
- Order processing system

## License

MIT
