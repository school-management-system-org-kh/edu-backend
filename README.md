# stem-montor-admin

stem-mentor/
│
├── public/                  # Static files
│   ├── index.html
│   ├── favicon.ico
│   └── assets/              # Images, icons, etc.
│
├── src/
│   ├── api/                  # API service calls
│   │   ├── authAPI.js
│   │   ├── tutorAPI.js
│   │   ├── exerciseAPI.js
│   │   └── problemAPI.js
│   │
│   ├── assets/               # Local images, videos, icons
│   │   └── logo.svg
│   │
│   ├── components/           # Reusable UI components
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── TutorCard/
│   │   ├── ExerciseCard/
│   │   └── ProblemStep/
│   │
│   ├── features/             # Feature-based folders
│   │   ├── auth/              # Login, Register
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── authSlice.js
│   │   │
│   │   ├── tutors/            # Virtual STEM tutors
│   │   │   ├── TutorsList.jsx
│   │   │   ├── TutorDetails.jsx
│   │   │   └── tutorSlice.js
│   │   │
│   │   ├── problems/          # Step-by-step problem-solving guides
│   │   │   ├── ProblemList.jsx
│   │   │   ├── ProblemDetails.jsx
│   │   │   └── problemSlice.js
│   │   │
│   │   ├── exercises/         # Interactive STEM exercises
│   │   │   ├── ExerciseList.jsx
│   │   │   ├── ExercisePlay.jsx
│   │   │   └── exerciseSlice.js
│   │
│   ├── hooks/                 # Custom hooks
│   │   ├── useAuth.js
│   │   └── useFetch.js
│   │
│   ├── layouts/               # Page layouts
│   │   ├── MainLayout.jsx
│   │   └── AuthLayout.jsx
│   │
│   ├── pages/                 # Page-level components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Dashboard.jsx
│   │   └── NotFound.jsx
│   │
│   ├── store/                 # Redux store setup
│   │   └── store.js
│   │
│   ├── styles/                # Global and modular CSS
│   │   ├── variables.css
│   │   └── global.css
│   │
│   ├── utils/                  # Helper functions
│   │   ├── formatDate.js
│   │   └── validators.js
│   │
│   ├── App.jsx
│   ├── index.js
│   └── routes.js              # Route definitions
│
├── .env                       # Environment variables
├── package.json
└── README.md
