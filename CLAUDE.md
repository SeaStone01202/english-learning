@AGENTS.md
You are a senior frontend engineer.

Build a simple English learning app UI using Next.js (App Router) and React.

Requirements:

1. Tech:

- Next.js (App Router)
- TypeScript
- Functional components
- No external UI libraries (use basic HTML + minimal CSS)

2. Folder structure (IMPORTANT):
   Organize code clearly with:

/app
/practice
/history
/settings

/components
/questions
FillBlank.tsx
MultipleChoice.tsx
Writing.tsx
Listening.tsx
QuestionRenderer.tsx
ExerciseForm.tsx
ResultView.tsx
HistoryList.tsx

3. Features:

### Practice Page:

- Dropdowns:
  - Skill (grammar, vocab, speaking, listening)
  - Topic (text input is fine)
- Button: "Generate Exercise"

- After clicking:
  - Render a list of questions from mock JSON
  - Each question rendered by type:
    - fill_blank → input
    - multiple_choice → radio buttons
    - writing → textarea

- Store answers in state

- Button: "Submit"
- After submit:
  - Show result view:
    - correct / incorrect
    - explanation (mock data)

---

### History Page:

- Show list of past attempts (mock data)
- Each item:
  - topic
  - score
  - date

---

### Settings Page:

- Input for API key
- Save to localStorage

---

4. Data:
   Use mock data (no API call yet)

Example:

const questions = [
{
id: 1,
type: "fill_blank",
question: "She \_**\_ (go) to school."
},
{
id: 2,
type: "multiple_choice",
question: "He \_\_** football.",
options: ["play", "plays"]
}
];

---

5. Architecture rules:

- Use a QuestionRenderer component to switch by type
- Each question type is a separate component
- Keep logic simple and readable
- No over-engineering
- No Redux, no complex state management

---

6. Output:

- Show full folder structure
- Show all component code
- Keep code clean and beginner-friendly
