import { unified } from "unified";
import remarkParse from "remark-parse";
import type { Root } from "mdast";

interface QuizQuestion {
    question: string;
    options: string[];
    answer: string | null;
    explanation: string | null;
}

function getText(node: any): string {
    if (!node) return "";
    if (node.type === "text") return node.value;
    if (node.type === "inlineCode" || node.type === "code") return node.value;
    if (node.children) {
        return node.children
            .map((child: any) => getText(child))
            .join(" ")
            .replace(/\s+/g, " ");
    }
    return "";
}

function getFieldValue(text: string, label: string): string | null {
    const match = text.match(
        new RegExp(`(?:^|\\s)${label}\\s*:\\s*(.+?)(?=\\s+(?:answer|correct answer|explanation)\\s*:|$)`, "i"),
    );
    if (!match || !match[1]) return null;
    return match[1].trim();
}

function finalizeQuestion(q: QuizQuestion, index: number): void {
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
        (opt) => opt.toLowerCase() === q.answer!.trim().toLowerCase(),
    );

    if (!match) {
        throw new Error(
            `Question ${index + 1}: answer must match one of the options`,
        );
    }

    q.answer = match;
}

export function parseQuiz(markdown: string): QuizQuestion[] {
    const tree = unified().use(remarkParse).parse(markdown) as Root;

    const questions: QuizQuestion[] = [];
    let currentQuestion: QuizQuestion | null = null;

    for (const node of tree.children) {
        if (!node) continue;

        if (node.type === "thematicBreak") continue;

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
                getText(item).trim(),
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
