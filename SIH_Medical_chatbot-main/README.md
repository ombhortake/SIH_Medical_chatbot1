# AI Health Assistant

## Project Overview

AI Health Assistant is a comprehensive public health chatbot designed to provide disease awareness, symptom checking, and healthcare facility location services. Built with modern web technologies, this application offers reliable medical information and helps users locate nearby healthcare facilities.

## Features

- **Disease Information Database**: Comprehensive information about common diseases, symptoms, causes, and prevention
- **AI-Powered Symptom Checker**: Interactive symptom analysis with recommendations to consult healthcare professionals
- **Healthcare Facility Locator**: Find nearby hospitals, clinics, and healthcare centers
- **Multi-Language Support**: Accessible in multiple languages for broader reach
- **Voice Input/Output**: Accessibility features for enhanced user experience
- **Health Tips & Prevention**: Educational content for disease prevention and health awareness

## Technology Stack

This project is built with:

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-ui component library
- **Routing**: React Router
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```sh
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── HealthChatbot.tsx    # Main chatbot interface
│   ├── SymptomChecker.tsx   # Symptom checking component
│   ├── DiseaseDatabase.tsx  # Disease information display
│   ├── HealthcareFinder.tsx # Healthcare facility locator
│   └── HealthTips.tsx       # Health tips and prevention
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── assets/              # Static assets
└── main.tsx            # Application entry point
```

## Key Components

- **HealthChatbot**: Interactive chat interface with voice support
- **SymptomChecker**: AI-powered symptom analysis tool
- **DiseaseDatabase**: Searchable database of disease information
- **HealthcareFinder**: Location-based healthcare facility search
- **HealthTips**: Educational health content and prevention tips

## Medical Disclaimer

This AI assistant provides general health information only. Always consult qualified healthcare professionals for medical advice, diagnosis, or treatment. The information provided is not intended to replace professional medical advice.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository or contact the development team.