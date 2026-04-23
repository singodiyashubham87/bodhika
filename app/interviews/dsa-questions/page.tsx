
import dsaData from '../../../public/450DSA.json';


interface Question {
  "Topic:": string;
  "Problem: ": string;
  Done: string;
  URL: string;
}

export default function DsaQuestionsPage() {
  const questions: Question[] = dsaData.Sheet1;

  return (
    <main className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg mt-10">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
        DSA Questions
      </h1>
      <ul className="space-y-5">
        {questions.map((q, idx) => (
          <li
            key={idx}
            className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-300 shadow-sm"
          >
            <a
              href={q.URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-semibold text-lg hover:underline"
            >
              {q["Problem: "]}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}