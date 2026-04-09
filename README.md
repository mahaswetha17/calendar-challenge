Interactive Wall Calendar Component

A polished, responsive React/Next.js calendar widget designed for a frontend engineering challenge. This project translates a static physical calendar design into a functional digital experience with state management and data persistence.

🚀 Live Demo[Insert your Vercel Link here: https://calendar-challenge-eight.vercel.app] 

✨ Features
	•	Visual Design: Emulates a physical premium calendar with a high-quality hero image.
	•	Date Selection: Interactive grid for selecting a date range with clear visual feedback.
	•	Note-Taking: Integrated notes section with data persistence using localStorage.

🛠️ Tech Stack
	•	Framework: Next.js 15 (App Router)
	•	Language: TypeScript
	•	Styling: Tailwind CSS
	•	Date Logic: date-fns
	•	Animations: Framer Motion
	•	Icons: Lucide React

📦 Installation & SetupTo run this project locally, follow these steps:
  1. Clone the repository:
    clone [your-repository-link]
    cd calendar-challenge
  2. Install dependencies:Bashnpm install
  3. Run the development server:Bashnpm run dev
  4. View the app:Open http://localhost:3000 in your browser.
     
🧠 Engineering ChoicesComponent Architecture: 
1. Separated logic into CalendarGrid, NotesPanel, and an orchestrator CalendarWidget to maintain clean, modular code.
2. State Management: Used React useState and useEffect to coordinate date selection and local storage syncing without the overhead of a global store.
3. UX Details: Added a "Premium Edition" aesthetic and hover effects to provide a tactile feel similar to physical media.
