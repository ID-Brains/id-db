import { unified } from "unified";
import remarkParse from "remark-parse";

function getText(node) {
  if (!node) return "";
  if (node.type === "text") return node.value;
  if (node.type === "inlineCode" || node.type === "code") return node.value;
  if (node.children) {
    return node.children
      .map(getText)
      .join(" ")
      .replace(/\s+/g, " ");
  }
  return "";
}

function getFieldValue(text, label) {
  const match = text.match(
    new RegExp(`(?:^|\\s)${label}\\s*:\\s*(.+?)(?=\\s+(?:answer|correct answer|explanation)\\s*:|$)`, "i")
  );

  return match ? match[1].trim() : null;
}

export function parseQuiz(markdown) {
  const tree = unified().use(remarkParse).parse(markdown);

  const questions = [];
  let currentQuestion = null;

  for (let i = 0; i < tree.children.length; i++) {
    const node = tree.children[i];

    if (node.type === "thematicBreak") continue;        //Ignorre the thematic break (---)

    if (node.type === "heading" && node.depth >= 2) {
      if (currentQuestion) {
        finalizeQuestion(currentQuestion, questions.length);
        questions.push(currentQuestion);
      }

      currentQuestion = {
        question: "",
        options: [],
        answer: null,
        explanation: null,
      };

      continue;
    }

    if (!currentQuestion) continue;

    if (node.type === "paragraph" && !currentQuestion.question) {
      const text = getText(node);

      if (/^(answer|correct answer|explanation)\s*:/i.test(text)) continue;

      currentQuestion.question = text.trim();
      continue;
    }

    if (node.type === "list" && currentQuestion.options.length === 0) {
      currentQuestion.options = node.children.map((item) =>
        getText(item).trim()
      );
      continue;
    }

    if (node.type === "paragraph") {
      const text = getText(node);

      const answer =
        getFieldValue(text, "answer") ?? getFieldValue(text, "correct answer");

      if (answer) {
        currentQuestion.answer = answer;
      }

      const explanation = getFieldValue(text, "explanation");

      if (explanation) {
        currentQuestion.explanation = explanation;
      }
    }
  }

  if (currentQuestion) {
    finalizeQuestion(currentQuestion, questions.length);
    questions.push(currentQuestion);
  }

  return questions;
}

function finalizeQuestion(q, index) {
  if (!q.question) {
    throw new Error(`Question ${index + 1} is missing question text`);
  }

  if (!q.options || q.options.length === 0) {
    throw new Error(`Question ${index + 1} is missing options`);
  }

  if (!q.answer) {
    throw new Error(`Question ${index + 1} is missing answer`);
  }

  const match = q.options.find(
    (opt) => opt.toLowerCase() === q.answer.trim().toLowerCase()
  );

  if (!match) {
    throw new Error(
      `Question ${index + 1}: answer must match one of the options`
    );
  }

  q.answer = match;
}