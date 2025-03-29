import type { PageLoad } from "./$types";
import { tempQuestions } from "$lib/data/tempQuestions";

export const load: PageLoad = async ({ params }) => {
  const category = params.category as keyof typeof tempQuestions;
  const questions = tempQuestions[category] || [];

  return {
    category,
    questions,
  };
};

// export const load: PageLoad = async ({ params }) => {
//     const category = params.category;
//     const res = await fetch(`https://your-api.com/quiz/${category}`);
//     const questions = await res.json();
  
//     return {
//       category,
//       questions,
//     };
//   };
  