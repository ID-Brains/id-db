---
title: "The Definitive NLP Encyclopedia: From Linguistics to LLMs"
date: "2026-04-17"
type: "reference"
description: "An exhaustive 800+ line technical guide covering the evolution, mathematics, and architectures of Natural Language Processing."
subject: "nlp"
level: 2
term: 2
prof: "TBD"
contributor: "Youssefelaskandrany"
tags: ["NLP", "Deep-Learning", "Transformers", "LLMs", "Mathematics", "Optimization", "AI-Systems"]
language: "en"
---

# Natural Language Processing — The Complete Notes

#NLP #Linguistics #Machine-Learning #Deep-Learning #Word2vec #Neural-Networks

## LECTURE 1
### High-Level Overview

This lecture aims to provide a comprehensive introduction to the field of Natural Language Processing. It reviews the evolution of communication methods with machines, starting from complex programming languages in the 1950s and 1960s, moving through text-based interfaces in the 1980s, to today's intelligent voice assistants. It also aims to detail the core components of this field such as Natural Language Understanding (NLU) and Natural Language Generation (NLG), discuss modern applications based on Big Data, and categorize these applications into Supervised and Unsupervised.

---

### Section 1: Introduction to Natural Language Processing

This section begins by defining NLP as a subfield of Artificial Intelligence (AI) dedicated to creating computers that use natural language as input and/or output.

The processing passes through two main stages:

1.  **Natural Language Understanding (NLU):** The stage where language is received and converted into a form that the computer understands.
2.  **Natural Language Generation (NLG):** The stage where the computer produces language to respond to the user.

The field of NLP lies at the intersection of several major scientific fields: Machine Learning (ML), Deep Learning (DL), Linguistics, and Artificial Intelligence (AI).

#### Glossary & Notations (Section 1)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Natural Language Processing (NLP) | A field in AI devoted to creating computers that use natural language as input/output. |
| Artificial Intelligence (AI) | The broader field of creating intelligent machines. |
| Natural Language Understanding (NLU) | The process of the computer understanding input language. |
| Natural Language Generation (NLG) | The process of the computer generating output language. |
| Machine Learning (ML) | A subset of AI intersecting with NLP. |
| Deep Learning (DL) | A subset of ML intersecting with NLP. |
| Linguistics | The scientific study of language, forming a core part of NLP. |

---

### Section 2: Components of NLP & Linguistic Knowledge

NLP is divided into two main components that require different levels of linguistic analysis:

#### 1. Natural Language Understanding (NLU)

It performs a mapping of given natural language inputs and converts them into a useful representation. It requires different levels of analysis, including:

- Morphological analysis.
- Syntactic analysis.
- Semantic analysis.
- Discourse analysis.

#### 2. Natural Language Generation (NLG)

It specializes in producing natural language outputs based on an internal representation. It requires different levels of synthesis, including:

- Deep planning (deciding what to say).
- Syntactic generation.

> **⚠️ Important Note:** It is important to know that NL Understanding is much harder than NL Generation, but both are still considered difficult and complex.

Levels of Linguistic Knowledge range from shallower to deeper levels, starting from speech and text and progressing as follows:

- Phonetics
- Orthography
- Phonology
- Morphology
- Lexemes
- Syntax
- Semantics
- Pragmatics
- Discourse

#### Glossary & Notations (Section 2)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Morphological analysis | Analyzing the structure of words and their parts. |
| Syntactic analysis | Analyzing the grammatical structure of sentences. |
| Semantic analysis | Extracting the literal meaning from texts. |
| Discourse analysis | Analyzing text structure beyond a single sentence. |
| Deep planning | The process in NLG of deciding what to say. |
| Syntactic generation | The process in NLG of forming grammatically correct sentences. |
| Phonetics / Phonology | Levels of linguistic knowledge related to speech sounds. |
| Orthography | The spelling system of a language. |
| Lexemes | Basic lexical units of a language. |
| Pragmatics | Understanding meaning in context. |

---

### Section 3: Why NLP? The Turing Test and ELIZA

#### Why do we need NLP?

- To interact with computing devices using human (natural) languages.
- To build intelligent robots.
- To enable voice-controlled operation.
- For rapid access to large amounts of information and knowledge stored in human language form.

#### The Turing Test

In 1950, scientist Alan Turing proposed a test known as the **Turing Test** to measure machine intelligence. In this test, a human judge engages in a natural language conversation with two parties: one human and one machine. If the judge cannot reliably distinguish which is the machine and which is the human, the machine is said to have passed the test.

#### ELIZA (1966)

One of the early conversational programs was **ELIZA**, designed by Joseph Weizenbaum in 1966. This program simulated a psychotherapist. It had **no real understanding**; it relied on simple **pattern-matching** on user inputs and transforming them into **canned responses**.

> **💡 ELIZA Example:**  
> If the user said "I am unhappy," the program would reply: "How do you feel about being unhappy?"

#### Python Code — Simulating ELIZA Pattern Matching

```python
import re

def simple_eliza(user_input):
    # Pattern matching based on slide examples
    # (my ?x depresses me) -> (why does your ?x depress you)
    match = re.search(r"my (.*) depresses me", user_input, re.IGNORECASE)
    if match:
        return f"why does your {match.group(1)} depress you"
    # (I could ?x) -> (you could ?x)
    match = re.search(r"I could (.*)", user_input, re.IGNORECASE)
    if match:
        return f"you could {match.group(1)}"
    return "tell me more"

# Example Usage:
print(simple_eliza("I could learn to get along with my mother"))
# Output: you could learn to get along with my mother
```

#### Glossary & Notations (Section 3)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Turing Test | A test of a machine's capability to perform human-like conversation (Alan Turing, 1950). |
| Conversational Programs | Software programs designed to simulate human conversation. |
| ELIZA | An early conversational program (1966) that acted as a psychotherapist. |
| Pattern-matching | A computational process used by ELIZA to map user input to predefined responses without real understanding. |
| Canned responses | Pre-recorded or predictable responses used by early NLP systems. |

---

### Section 4: Modern NLP & Text Analytics

In the era of Big Data, there are three main trends in Modern NLP:

1.  Availability of massive amounts of information in machine-readable form (web pages, newspapers, medical reviews, etc.).
2.  Conversational agents have become an important form of human-computer communication.
3.  Many human-to-human interactions now occur via computers through social media.

#### Prominent NLP Application Areas:

- **Text analytics/mining:** Extracting information from unstructured data, including sentiment analysis and topic identification.
- **Digital Humanities:** New methods for conducting academic research involving collaborative and computational research.
- **Conversational agents:** Such as intelligent assistants (Siri, Cortana, Amazon Alexa, Google Assistant) and chatbots.
- **Machine translation:** Automatic translation between languages.

#### Text Analytics Details

In text analytics, we perform data-mining from blogs, forums, and reviews. This typically involves extracting limited types of semantic and pragmatic information, such as:

- **Entity mentions:** Extracting person names, places, dates, and monetary amounts.
- **Concept identification.**
- **Sentiment:** Determining customer feeling (e.g., negative comments like "Terrible customer service" or positive comments like "Really great transaction").

#### Question Answering

Unlike traditional information retrieval that provides documents to users, question-answering systems provide a direct answer to information needs posed as questions. A famous example is the **IBM Watson** system that competed on the game show *Jeopardy!*.

#### Glossary & Notations (Section 4)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Big Data | Enormous amounts of available information in machine-readable form. |
| Text analytics/mining | Analyzing unstructured text data to extract insights. |
| Sentiment analysis | Determining the emotional tone or polarity behind a series of words. |
| Conversational agents | AI systems like Siri and Alexa designed to converse with humans. |
| Entity mentions | Identifying specific items like names, places, dates within text. |
| Question answering | Providing direct answers to questions rather than returning documents. |
| Machine Translation (MT) | Automatic translation of texts between languages. |

---

### Section 5: NLP Applications Categorization

NLP applications are categorized from a Machine Learning perspective into two main types:

#### 1. Supervised Applications

Here, we train a model on pre-labeled data to solve problems such as:

- Spam Detection.
- Sentiment Analysis.
- Intent Classification.
- Multi-Label, Multi-Class Text Classification.

Predictive models can be enhanced by combining textual data with traditional variables, for example:

- Churning propensity models using Twitter messages and emails.
- Hospital admission prediction models using medical notes.
- Insurance fraud modeling using adjuster notes.
- Stylometry or forensic applications to identify the author of a given writing sample.

#### 2. Unsupervised Applications

These models deal with unlabeled texts to extract hidden patterns, such as:

- Topic Modeling.
- Keyword Extraction.
- Trend/Outlier detection (e.g., analyzing trends for the term "text mining" using Google Trends).
- Text clustering: grouping documents (Document 1, Document 2, ...) into clusters (Cluster 1, Cluster 2, ...) based on their similarity.

For example, comments can be grouped into clusters like Cluster 1 (associated with "doctor, staff, friendly") or Cluster 2 (associated with "treatment, results, time").

#### Python Code — Text Categorization (Supervised)

```python
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

# Documents (X) and their Categories (y)
documents = [
    "Terrible customer service.",   # Document 1 -> Negative
    "Great price, fast shipping.",   # Document 2 -> Positive
    "Horrible return/exchange policy."  # Document 3 -> Negative
]
categories = ["Negative", "Positive", "Negative"]

# 1. Transform text to feature vectors
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(documents)

# 2. Train a Supervised Classifier
classifier = MultinomialNB()
classifier.fit(X, categories)

# 3. Predict new document
new_doc = vectorizer.transform(["The shipping was really great"])
prediction = classifier.predict(new_doc)
print(f"Prediction for new document: {prediction[0]}")
# Output: Positive
```

#### Glossary & Notations (Section 5)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Supervised | ML approach using labeled data (e.g., classification tasks). |
| Unsupervised | ML approach using unlabeled data (e.g., clustering tasks). |
| Spam Detection | Identifying unsolicited or unwanted emails/messages. |
| Intent Classification | Determining the underlying goal or intention of a text. |
| Topic Modeling | Unsupervised method to discover abstract topics within texts. |
| Keyword Extraction | Automatically identifying the most relevant words in a text. |
| Trend/Outlier detection | Identifying anomalous patterns or rising topics over time. |
| Text clustering | Grouping documents together based on their inherent similarity without predefined categories. |

---

## LECTURE 2
### Sentiment Analysis & NLP Pipelines

This lecture focuses on dividing Natural Language Processing applications into two main categories: Supervised and Unsupervised. It then delves into one of the most famous applications, Sentiment Analysis. Next, it explains the fundamental tasks (Pipelines) that must be performed on any raw text to make it understandable to a machine, such as Tokenization, POS tagging, and Parsing. Finally, the lecture reviews the challenges that make the field of NLP difficult and complex.

---

### Section 1: NLP Applications & Text Mining

NLP applications are divided into two main types based on machine learning methods:

#### 1. Supervised Applications

In this type, we use pre-labeled data to train models. Examples include:

- **Spam Detection**
- **Sentiment Analysis**
- **Intent Classification**
- **Multi-Label, Multi-Class Text Classification**

Predictive modeling can be significantly improved by integrating textual data with traditional variables. Examples include:

- Churning propensity models using customer service notes, emails, and Twitter.
- Hospital admission prediction models integrating medical records.
- Insurance fraud modeling using adjuster notes.
- Stylometry or forensic applications to identify the author of a specific text.

#### 2. Unsupervised Applications

Here we deal with unlabeled data, allowing the algorithm to discover patterns. These include:

- **Topic Modeling**
- **Keyword Extraction**
- **Trend/Outlier detection** (e.g., analyzing search trends for "text mining" using Google Trends across different years).
- **Text clustering:** Grouping similar texts into clusters. For example, grouping patient reviews into Cluster 1 (containing words like "doctor, friendly") and Cluster 2 (containing words like "treatment, time").

#### Glossary & Notations (Section 1)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Supervised | Machine learning task that uses labeled data to train models. |
| Unsupervised | Machine learning task that finds hidden patterns in unlabeled data. |
| Spam Detection | Identifying and filtering out unsolicited messages. |
| Intent Classification | Determining the purpose or goal behind a user's text. |
| Churning propensity models | Predictive models that estimate the likelihood of a customer leaving a service. |
| Stylometry | The statistical analysis of variations in literary style, often to identify authorship. |
| Text clustering | Grouping similar documents or texts together without predefined categories. |

---

### Section 2: Sentiment Analysis & Predictive Models

**Sentiment Analysis** is a field that deals with classifying opinions expressed in textual documents. Sentiments can be positive or negative. Machine learning algorithms are used to evaluate a sequence of words to determine the nature of this sentiment.

#### How do we apply it?

- **Supervised Learning:** We can use humans to label the sentiment in data and then treat it as a text classification problem. An example is a dataset on data.world containing over 8,000 tweets labeled as: positive, negative, neutral, or unknown.
- **Unsupervised Learning:** We can also process the same problem without pre-existing labels.

When building predictive models, the process involves running algorithms on the dataset, training the model, and using multiple models to find the best fit based on understanding the business data. The category of predictive models includes predictive models, descriptive models, and decision models.

#### Glossary & Notations (Section 2)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Sentiment Analysis | Categorization of opinions expressed in textual documents into positive, negative, etc. |
| Text classification problem | The computational task of assigning a predefined category to a text document. |
| Training the model | The process of feeding data into a machine learning algorithm to help it learn patterns. |
| Descriptive models | Models that quantify relationships in data in a way that is often used to classify customers into groups. |

---

### Section 3: Fundamental NLP Tasks & Tokenization

To build any NLP application, the text must undergo several structural analyses:

1.  **Word tokenization:** Splitting text into words.
2.  **Sentence boundary detection:** Identifying sentence boundaries.
3.  **Part-of-speech (POS) tagging:** Determining the word type (noun, verb, adjective, etc.).
4.  **Named Entity (NE) recognition:** Recognizing named entities (person names, places, organizations).
5.  **Parsing:** Determining the syntactic structure of the sentence.
6.  **Semantic analysis:** Inferring the meaning of the sentence.

#### Deep Dive into Tokenization

Tokenization is the process of splitting a sentence, paragraph, or entire document into smaller units called **tokens**. These tokens can be words, numbers, or punctuation marks, and are created by identifying word boundaries.

#### Code Examples for Tokenization

**1. Using Python's basic `split()` function:**
When using `text.split()` without special handling, the text is split based on whitespace. When using `text.split('.')`, the text is split based on periods (to divide it into rudimentary sentences).

**2. Using NLTK for advanced tokenization:**

```python
# To split text into words more accurately (considering punctuation as separate tokens)
from nltk.tokenize import word_tokenize
tokens = word_tokenize(text)

# To split text into structurally correct sentences
from nltk.tokenize import sent_tokenize
sentences = sent_tokenize(text)
```

#### Glossary & Notations (Section 3)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Word tokenization | Splitting text into individual words or terms. |
| Tokens | The smaller units created by tokenization (words, numbers, punctuation). |
| Sentence boundary detection | Identifying where one sentence ends and another begins. |
| NLTK | Natural Language Toolkit, a popular Python library for NLP. |

---

### Section 4: POS Tagging, NER, and Parsing

Here we begin to assign structure and properties to the tokens we extracted.

#### 1. Part-Of-Speech (POS) Tagging

This is the process of assigning a lexical class marker to each word in a sentence.
Example: The sentence "the lead paint is unsafe" becomes:
`the/Det lead/N paint/N is/V unsafe/Adj`
(where Det=determiner, N=noun, V=verb, Adj=adjective)

#### 2. Named Entity Recognition (NER)

A technique that automatically identifies named entities and classifies them into predefined categories (e.g., persons, organizations, locations, monetary values, etc.).
Example: In the sentence "U.N. official Ekeus heads for Baghdad," the following are extracted:
- `[ORG U.N.]` as an organization.
- `[PER Ekeus]` as a person.
- `[LOC Baghdad]` as a location.

#### 3. Parsing

Parsing is the process of determining the syntactic structure of a text by analyzing its constituent words based on the underlying grammar of the language. A sentence is structurally divided into a Noun Phrase and a Verb Phrase. The classic example is the parse tree for the sentence "Tom ate an apple."

**Importance of Parsing:**
- Reporting any syntax errors.
- Recovering from common errors to continue processing.
- Creating a parse tree.
- Creating a symbol table.
- Producing intermediate representations (IR).

Parsing methods are divided into **Deep** vs. **Shallow** parsing, and types of parsers include:
- Recursive descent parser
- Shift-reduce parser
- Chart parser
- Regexp parser
- Dependency parsing

#### Glossary & Notations (Section 4)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Part-of-speech (POS) tagging | Assigning a lexical class marker (noun, verb, etc.) to words. |
| Named Entity Recognition (NER) | Identifying named entities and classifying them into categories (ORG, PER, LOC). |
| Parsing | Determining the syntactic structure of a text. |
| Lexical analyzer | A component that groups characters into logical chunks (tokens). |
| Symbol Table | A data structure used to store information about the program/text entities. |
| Intermediate representations (IR) | A data structure used internally to represent the source code/text. |
| Parse tree | A tree representing the syntactic structure of a string according to grammar. |

---

### Section 5: Why NLP is Hard?

Why is natural language processing considered one of the hardest problems in computer science? The lecture concludes with seven main reasons:

1.  **Ambiguity:** A single word or sentence may carry more than one meaning.
2.  **Scale:** The enormous size and variety of linguistic data.
3.  **Sparsity:** Some words or structures appear very rarely in texts.
4.  **Variation:** Languages constantly change and have different dialects and styles.
5.  **Expressivity:** The ability to express the same idea in countless ways.
6.  **Unmodeled Variables:** External context and general world knowledge that are not captured in the model.
7.  **Unknown Representations:** The lack of a single, fixed, ideal mathematical way to represent all meanings of language.

#### Glossary & Notations (Section 5)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Ambiguity | The quality of being open to more than one interpretation. |
| Sparsity | The phenomenon where many possible word combinations rarely or never occur. |
| Expressivity | The degree to which a language can represent ideas dynamically. |

---

## LECTURE 3
### Ambiguity — The Challenge of Natural Language

This lecture focuses on discovering the real challenges that make understanding human language complex for computers. It begins with a comprehensive definition of the field of Natural Language Processing and its components, then moves to explain the fundamental reason for the difficulty of this field: **Ambiguity**. The lecture reviews the levels of linguistic knowledge (such as Morphology, Syntax, and Semantics) as tools to resolve this ambiguity, and concludes with a deep analysis of a single simple sentence to show how interpretations can multiply astonishingly based on structural and lexical rules.

---

### Section 1: Introduction to NLP & Its Forms

This section begins by defining Natural Language Processing (NLP) as the process of computer analysis of input provided in a human (natural) language and converting this input into a useful form of representation.

- **Primary concern:** Making computers perform useful and interesting tasks using human languages.
- **Secondary concern:** Helping humans gain a better understanding of human language itself.

**Forms of Natural Language:** The inputs/outputs of an NLP system can be either written text or speech. Our focus will be primarily on written text.

To process written text, we need lexical, syntactic, and semantic knowledge, as well as discourse information and real-world knowledge.

To process spoken language, we need all of the above plus the challenges of speech recognition and speech synthesis.

The primary goal of systems is **deep understanding of broad language**, not just string processing or keyword matching. The ultimate systems we aim to build range from ambitious systems (like machine translation and question answering) to modest systems (like spell checking and text classification).

#### Glossary & Notations (Section 1)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Natural Language Processing (NLP) | The process of computer analysis of human language and its conversion into a useful representation. |
| Written text | Text-based input/output for NLP systems. |
| Speech | Audio-based input/output for NLP systems. |
| Lexical, syntactic, semantic knowledge | The types of linguistic knowledge required to process written text. |
| Discourse information | Information relating to text structures larger than a single sentence. |
| Real world knowledge | General knowledge about how the world works, necessary for understanding text. |

---

### Section 2: Components of NLP & Why It Is Hard

The field of NLP is divided into two main components:

#### 1. Natural Language Understanding (NLU)
Maps input to a useful representation. Requires different levels of analysis such as morphological, syntactic, semantic, and discourse.

#### 2. Natural Language Generation (NLG)
Produces output from an internal representation. Requires levels of synthesis such as deep planning (what to say) and syntactic generation.

> **Note:** Understanding language (NLU) is much harder than generating it (NLG).

#### Why is NLP considered difficult?

- Human language is **ambiguous**. For example, in pronoun resolution, the sentence "Jack saw Sam yesterday. He..." — the "He" could refer to Jack or Sam depending on later context.
- It requires reasoning beyond what is explicitly stated, and some of this reasoning requires **world knowledge**. Example: "I couldn't submit my homework because my horse ate it."
- Language is difficult even for humans themselves.

#### Why is Language Ambiguous?

Assigning a unique linguistic expression to every concept would make language complex and overly long. Allowing resolvable ambiguity permits shorter linguistic expressions — a form of **data compression**. This relies on humans' ability to use their knowledge to infer and resolve this ambiguity.

Natural languages differ from **computer languages**. Formal programming languages are designed to be unambiguous, can be defined with grammars that produce a unique parse for each sentence, and are designed for efficient (deterministic) parsing.

#### Glossary & Notations (Section 2)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Natural Language Understanding (NLU) | Mapping input in natural language into a useful representation. |
| Natural Language Generation (NLG) | Producing output in natural language from an internal representation. |
| Pronoun Resolution | The task of determining which entity a pronoun refers to. |
| Data compression | The concept that ambiguity allows for shorter linguistic expressions. |
| Deterministic parsing | Efficient parsing used in formal programming languages, yielding a unique structure. |

---

### Section 3: Levels of Ambiguity & NLP Tasks

Ambiguity exists everywhere and at multiple levels:

- **Word senses:** Does the word "bank" mean a financial institution or a river bank?
- **Part of speech:** Is the word "chair" a noun (seat) or a verb (to preside)?
- **Syntactic structure:** "I can see a man with a telescope" — does the man have the telescope, or am I seeing him through the telescope?
- **Multiple levels:** "I made her duck" (combines all of the above).

One reason natural language understanding is difficult is that a single input can mean many different things, influenced by contextual information.

#### Challenges in dealing with "words":
- Segmenting text into words.
- Morphological variation.
- Words with multiple meanings.
- Domain-specific meanings (e.g., the word "latex").
- Multiword expressions (e.g., "make up").

#### Building Data Structures for Texts

We use tools like Part of Speech Tagging to convert raw text into a list of structured tuples. For example, informal text like "ikr smh he asked fir yo last name" is converted into precise grammatical classifications: "he" as a pronoun, "asked" as a verb, "name" as a noun.

In data structures, syntax is represented using **trees**. The parse tree (NP - Noun Phrase) for the same phrase can differ based on interpretation.

#### Python Code — Parse Tree Structures

```python
# In Data Structures, a Parse Tree can be represented using linked nodes or nested lists.
# Here is a representation of two different NP structures for "natural language processing"

# Structure 1: (natural (language processing))
tree1 = {"NP": [
    {"Adj": "natural"},
    {"NP": [
        {"Noun": "language"},
        {"Noun": "processing"}
    ]}
]}

# Structure 2: ((natural language) processing)
tree2 = {"NP": [
    {"NP": [
        {"Adj": "natural"},
        {"Noun": "language"}
    ]},
    {"Noun": "processing"}
]}
```

#### 🔍 Additional Examples of Syntactic Ambiguity

- "Get the cat with the gloves." (Is the cat wearing the gloves, or should I use the gloves to catch it?)
- "Call me a taxi, please." — "You want me to get you a taxi or tell you you're a taxi?"

#### Glossary & Notations (Section 3)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Word senses | The different meanings a single word can have (e.g., bank). |
| Syntactic structure | How words are arranged and relate to each other in a sentence. |
| Contextual information | Surrounding text or situation that affects the meaning of a sentence. |
| Segmenting text | The task of dividing written text into meaningful units, like words. |
| Multiword expressions | Phrases that act as a single unit of meaning (e.g., "make a decision"). |
| Part of speech (POS) tagging | Assigning grammatical categories (noun, verb, etc.) to words. |
| NP (Noun Phrase) | A syntactic structure acting as a noun in a sentence. |

---

### Section 4: Knowledge of Language & Morphology

To process language computationally, we model different levels of linguistic knowledge:

- **Phonology:** Concerns how words relate to perceived sounds. (Example: words that sound the same but are spelled differently, like Red/Read and ate/eight).
- **Morphology:** Concerns how words are constructed from basic units called **morphemes**. A morpheme is the primitive unit of meaning in language.
- **Syntax:** Concerns how words are put together to form correct sentences and determines the structural role each word plays.
- **Semantics:** The study of context-independent meaning.
- **Pragmatics:** Concerns how sentences are used in different situations and how usage affects interpretation.
- **Discourse:** How preceding sentences affect the interpretation of the next sentence (e.g., pronoun resolution).
- **World Knowledge:** Includes general knowledge about the world, beliefs, and user goals.

#### Word Structure (Morphology in Data Structures)

In morphology, a word is a structural tree consisting of a root and affixes. Morphemes are the smallest units that carry meaning. They are divided into **Stems** (the base) and **Affixes**. Affixes are further divided into **Prefixes** (e.g., "post-" in "postpone") and **Suffixes** (e.g., "-ed" in "tossed").

**Complete example:** The word "reconsideration" consists of the prefix "re-", then the stem "consider", and the suffix "-ation".

These structural concepts are used in applications like **Machine Translation** to transfer morphological features (e.g., Noun, Direct Case, Plural) from one language to another, and in **Information Retrieval** to link words like "goose" and "geese" to the same root.

#### Glossary & Notations (Section 4)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Phonology | Concerns how words are related to their realized sounds. |
| Morphology | Concerns how words are constructed from morphemes. |
| Morpheme | The primitive unit of meaning in a language. |
| Syntax | Concerns sentence formation and the structural role of words. |
| Semantics | The study of context-independent meaning. |
| Pragmatics | Concerns how context and situation affect sentence interpretation. |
| Discourse | Concerns how preceding sentences affect the interpretation of the next. |
| Stem | The base or root of a word before affixes are added. |
| Affixes (Prefix / Suffix) | Morphemes attached to a stem to modify its meaning or form. |

---

### Section 5: Deep Analysis of an Ambiguous Sentence

The lecture takes a seemingly very simple sentence — **"I made her duck"** — to show how grammatical rules resolve ambiguity. This sentence has **five different interpretations** based on structural analysis:

1.  I cooked duck for her.
2.  I cooked duck belonging to her.
3.  I created a toy duck which she owns.
4.  I caused her to quickly lower her head or body (to avoid something).
5.  I used magic and turned her into a duck.

#### What are the reasons for this ambiguity?

- The word **duck** is morphologically and syntactically ambiguous; it can be a noun (the bird) or a verb (to lower the head).
- The word **her** is syntactically ambiguous; it can be dative (indicating "for her") or possessive (indicating "belonging to her").
- The word **make** is semantically ambiguous; it can mean "to cook," "to create," or "to cause."
- The verb **make** is syntactically ambiguous; it can be transitive (takes one direct object), ditransitive (takes two objects), or take a direct object plus a verb.

#### 🎯 Lecture Summary

This example definitively demonstrates why designing flexible data structures capable of accommodating multiple probabilities (Trees/Graphs) is essential and central to building powerful natural language processing engines.

#### Glossary & Notations (Section 5)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Dative | A grammatical case indicating the recipient of an action (e.g., "for her"). |
| Possessive | A grammatical case indicating ownership (e.g., "belonging to her"). |
| Transitive | A verb syntax that takes one direct object. |
| Ditransitive | A verb syntax that takes two objects. |

---

## LECTURE 4
### Text Representation — BoW & Word2vec & Confusion Matrix

This lecture begins with a quick review of basic NLP concepts related to ambiguity and levels of linguistic analysis (such as Morphology and Syntax). However, the real development in this lecture (which is very important for computer science) is the transition to how to represent text programmatically and mathematically using models like **Bag-of-Words** and **Word2vec (CBOW & Skip-Gram)**. Finally, the lecture concludes with how to evaluate these models using the **Confusion Matrix**.

---

### Sections 1 & 2: Review — NLP & Linguistic Knowledge

The lecture begins by defining Natural Language Processing (NLP) as the process of computer analysis of input provided in natural language and converting it into a useful form of representation. This field is primarily concerned with making computers perform useful tasks using human languages, and secondarily with helping us better understand human language.

The processing structure is divided into two main components:

- **Natural Language Understanding (NLU):** Mapping input to a useful representation. Requires levels of analysis such as morphological analysis, syntactic analysis, semantic analysis, and discourse analysis.
- **Natural Language Generation (NLG):** Producing output from an internal representation. Requires deep planning and syntactic generation.

Human language is **ambiguous**. Ambiguity allows for linguistic **data compression** to make expressions shorter. This contrasts completely with formal programming languages, which are designed to be unambiguous and produce a unique parse tree to facilitate efficient deterministic parsing.

To resolve this ambiguity, we build engineered data structures that reflect levels of linguistic knowledge: Phonology, Morphology, Syntax, Semantics, Pragmatics, Discourse, and World Knowledge.

#### Deep Dive into Morphology

Morphemes are divided into two main types:

- **Inflectional morphemes:** Create new forms of the same word by adding grammatical properties (e.g., plural "-s", past tense "-ed") without changing the word's core category.
- **Derivational morphemes:** Create new words with different meanings that may belong to a different grammatical category (e.g., converting the verb "write" to the noun "writer" by adding "-er").

#### Glossary & Notations (Sections 1-2)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Phonology | Concerns how words are related to their realized sounds. |
| Morphology | Concerns how words are constructed from morphemes. |
| Syntax | Concerns sentence formation and the structural role of words. |
| Stem / Affixes | The base of a word / Added parts like prefixes and suffixes. |
| Inflectional morphemes | Create new forms of the same word (e.g., plurals, past tense). |
| Derivational morphemes | Create new words with different meanings or grammatical categories. |
| Transitive / Ditransitive | Verbs taking one direct object vs. two objects. |

---

### Section 3: Text Representation — Bag-of-Words & Word2vec

Now, how do we represent these words as computable data structures?

#### 1. Bag-of-Words Model (BoW)

This is a method for extracting features from text to be used in machine learning algorithms. This model describes the frequency of words within a document. It is called a "bag" because any information about the order or structure of words is discarded.

**Steps to build a BoW matrix:**

- **Step 1: Collect Data:** Gather the data.
- **Step 2: Design the Vocabulary:** Build the vocabulary (in data structures, this is a **Set**) to store unique words.
- **Step 3: Create Document Vectors:** Convert each document into a **vector** of fixed length equal to the vocabulary size, recording the presence or absence of each word (0 or 1).

**Limitation of One-Hot Encoding:** A single word becomes a vector the size of the entire vocabulary, creating very **sparse vectors**.

#### 2. Word2vec Architecture

To solve the problem of sparse vectors, we use architectures based on neural networks. There are two architectures in Word2vec:

- **Continuous Bag-of-Words model (CBOW):** Predicts the middle word based on the surrounding context words.
- **Continuous Skip-Gram model:** Predicts the surrounding words (within a certain range) based on the current word. It can be considered the opposite of the CBOW model. It works by sliding a **window** across the text. For example, if the window size is 2, we take two words before and after the target word to form Skip-gram pairs.

#### Python Code — Implementing Bag-of-Words (BoW)

```python
# From a Data Structure perspective, we use a List to store vectors
# and a Dictionary for Vocabulary.
documents = [
    "it was the worst of times",
    "it was the age of wisdom",
    "it was the age of foolishness"
]

# Step 2: Design Vocabulary (Using a Set for uniqueness, then List for fixed index)
vocab = ["it", "was", "the", "best", "of", "times", "worst", "age", "wisdom", "foolishness"]
# Size = 10

# Step 3: Create Document Vectors
document_vectors = []
for doc in documents:
    doc_words = doc.split()
    # Initialize a fixed-length vector with 0s
    vector = [0] * len(vocab)
    for word in doc_words:
        if word in vocab:
            index = vocab.index(word)
            vector[index] = 1  # Boolean representation
    document_vectors.append(vector)

# Output for the first document: "it was the worst of times"
print(document_vectors[0])
# [1, 1, 1, 0, 1, 1, 1, 0, 0, 0]
```

#### Glossary & Notations (Section 3)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Bag-of-Words Model (BoW) | A model representing text by the occurrence of words, ignoring order. |
| Vocabulary | A collection of known unique words from the dataset. |
| Document Vectors | A fixed-length array representing the presence/score of words in a document. |
| Continuous bag-of-words (CBOW) | A model predicting the middle word from surrounding context words. |
| Continuous skip-gram model | A model predicting context words from a single input word. |
| Window Size | The range of words considered before and after the current word in Skip-gram. |

---

### Section 4: Model Evaluation — Confusion Matrix

After building machine learning models (whether for text classification or other tasks), we need to evaluate their performance. Here we use a 2D array data structure called a **Confusion Matrix**. This matrix compares the predicted class against the true class.

The matrix consists of four elements:

| | Predicted Positive | Predicted Negative |
| :--- | :--- | :--- |
| **Actual Positive** | True Positive (TP) | False Negative (FN) - Type II Error |
| **Actual Negative** | False Positive (FP) - Type I Error | True Negative (TN) |

- **True Positive (TP):** You predicted positive, and it is true.
- **True Negative (TN):** You predicted negative, and it is true.
- **False Positive (FP - Type 1 Error):** You predicted positive, but it is false.
- **False Negative (FN - Type 2 Error):** You predicted negative, but it is false.

#### 😄 Humorous Example from the Lecture

- **FP (Type 1 Error):** A doctor tells a man, "You are pregnant." (A false positive prediction).
- **FN (Type 2 Error):** A doctor tells a woman who is clearly showing signs of pregnancy, "You are not pregnant." (A false negative prediction).

#### Glossary & Notations (Section 4)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Confusion matrix | A table used to describe the performance of a classification model. |
| True Positive (TP) | Correctly predicted positive class. |
| True Negative (TN) | Correctly predicted negative class. |
| False Positive (FP) / Type 1 Error | Incorrectly predicted positive class (e.g., telling a man he's pregnant). |
| False Negative (FN) / Type 2 Error | Incorrectly predicted negative class (e.g., telling a pregnant woman she isn't). |

---

## LECTURE 5
### WSD & SRL & Neural Networks

This lecture focuses primarily on **resolving ambiguities** to build intelligent systems capable of understanding the true meaning of text. It begins by distinguishing between Ambiguity and Vagueness, then reviews fundamental structural tools like Parts of Speech and Parse Trees. Next, it delves into extracting semantic meaning through **Word Sense Disambiguation (WSD)** using structured dictionaries like **WordNet**, then moves to determining word roles in sentences with **Semantic Role Labeling (SRL)**. Finally, the lecture provides a simplified mathematical introduction to **Neural Networks** (forward and backpropagation), which form the basis of modern models like GPT-3.

---

### Section 1: Vagueness & Resolving Ambiguities

This section begins by defining **Vagueness** as the lack of certainty or distinctness in a sentence.

**Example:** "I want to eat Indian food for lunch." This sentence is vague for a machine because it does not specify: What exactly do I want to eat? And at what exact time?

**Ambiguity,** in contrast, means that a word or sentence has more than one clear interpretation. To resolve this ambiguity, we use models and algorithms at different levels:

- **Part-of-speech (POS) tagging:** To determine whether a word like "duck" is a noun or verb.
- **Word-sense disambiguation (WSD):** To determine the meaning of a word based on context. Does "make" mean "to cook" or "to create"?
- **Lexical disambiguation:** Includes resolving both POS and WSD together.
- **Syntactic ambiguity:** Grammatical ambiguity (e.g., the "her duck" sentence), which can be resolved using **probabilistic parsing**.

#### Glossary & Notations (Section 1)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Vagueness | Lack of certainty or distinctness in a statement. |
| Ambiguity | Having multiple distinct interpretations. |
| Part-of-speech tagging | Deciding the grammatical category of a word (e.g., verb or noun). |
| Word-sense disambiguation | Deciding the correct dictionary meaning of a word based on context. |
| Lexical disambiguation | The resolution of word-level ambiguities (encompasses POS and WSD). |
| Syntactic ambiguity | Ambiguity arising from the grammatical structure of a sentence. |
| Probabilistic parsing | Using probabilities to determine the most likely syntactic structure. |

---

### Section 2: Parts of Speech & Syntactic Parsing Trees

To analyze sentences programmatically, we must classify words into traditional parts of speech, including:

- **Noun (N):** names (boy, cat, truth)
- **Verb (V):** actions or states (become, hit)
- **Pronoun:** (I, you, we)
- **Adverb (Adv):** (sadly, very)
- **Adjective (Adj):** (happy, clever)
- **Conjunction:** (and, but, while)
- **Preposition (Prep):** (to, from, into)
- **Interjection:** (ouch, oh, alas)

#### Structuring Sentences as Trees (Data Structures)

To resolve syntactic ambiguity, we convert a sentence into a **Parse Tree**. The root node is the sentence (S), which branches into child nodes representing phrases:

- **S:** Sentence
- **NP:** Noun Phrase
- **VP:** Verb Phrase
- **Det:** Determiner (article)
- **TV:** Transitive verb (takes a direct object)
- **IV:** Intransitive verb
- **PP:** Prepositional phrase

The lecture shows two different trees for the sentence "I made her duck":

- **Tree 1** interprets "made" as a ditransitive verb and "duck" as a noun, meaning: "I made a duck for her."
- **Tree 2** interprets "made" as a verb followed by a verb phrase and "duck" as a verb, meaning: "I caused her to lower her head."

#### Python Code — Representing a Parse Tree Node

```python
# In Data Structures, a Parse Tree is a generic tree.
class TreeNode:
    def __init__(self, tag, word=None):
        self.tag = tag        # Syntactic tag (e.g., 'S', 'NP', 'VP', 'V', 'N')
        self.word = word      # The actual word if it's a leaf node
        self.children = []    # List of child TreeNodes

    def add_child(self, node):
        self.children.append(node)

# Constructing the tree for: "I made her duck" (Meaning 1: Noun)
root = TreeNode("S")
np1  = TreeNode("NP", "I")
vp   = TreeNode("VP")
v    = TreeNode("V",  "made")
np2  = TreeNode("NP")
det  = TreeNode("DET", "her")
n    = TreeNode("N",   "duck")
np2.add_child(det)
np2.add_child(n)
vp.add_child(v)
vp.add_child(np2)
root.add_child(np1)
root.add_child(vp)
```

#### Glossary & Notations (Section 2)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| S | Sentence |
| NP / VP | Noun Phrase / Verb Phrase |
| Det | Determiner (e.g., "the", "a") |
| TV / IV | Transitive Verb / Intransitive Verb |
| PP | Prepositional Phrase |

---

### Section 3: Word Sense Disambiguation (WSD) & WordNet

Words in natural languages often have multiple meanings (word senses). For example, the word "interest" can mean:

- A feeling of wanting to know about something: "Ellen has a strong interest in computational linguistics."
- Money paid for borrowing: "Ellen pays a large amount of interest on her credit card."

The task of **Word Sense Disambiguation (WSD)** is to determine the correct meaning of an ambiguous word based on context. It is a crucial task for applications like machine translation and question answering.

To solve this problem, we use a large structured dictionary called **WordNet**. WordNet is a freely available lexical database of English. It groups nouns, verbs, and adjectives into sets of cognitive synonyms called **Synsets**, where each set expresses a distinct concept. These Synsets are connected to each other through conceptual-semantic and lexical relations, forming a network (graph) that can be navigated.

#### Applications that depend on WSD:

- **Machine translation:** For example, the word "change" can be translated into French as "changement" (alteration) or "monnaie" (coins/change).
- **Information retrieval:** Searching for the word "depression" (does it mean psychological depression, a weather depression, or an economic recession?).
- **Information extraction:** Analyzing intelligence reports to determine whether the word "drugs" means pharmaceutical medicines or illegal narcotics.

#### Glossary & Notations (Section 3)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Word Sense Disambiguation (WSD) | Determining the proper dictionary meaning of an ambiguous word in a sentence. |
| WordNet | A large, publicly available lexical database of English. |
| Synsets | Sets of cognitive synonyms in WordNet, expressing distinct concepts. |
| Information retrieval | The task of finding relevant documents based on a user's query. |
| Information extraction | Automatically extracting structured information from unstructured text. |

---

### Section 4: Semantic Role Labeling (SRL)

Once we know the meaning of a word, we need to know its role in the event: **"Who did what to whom, where, and when?"** This task is defined as **Semantic Role Labeling (SRL)**, also called case role analysis or shallow semantic parsing. The goal is to determine the **semantic role** that each noun phrase (NP) connected to the verb plays.

Historically, **First-Order Logic (FOL)** was used to represent meaning as follows:
```
∃e, x, y, z Giving(e) ∧ Giver(e, x) ∧ Given(e, y) ∧ Givee(e, z)
```
But this approach was flawed for two reasons: it does not account for multiple word meanings, and it does not capture similarities between different verbs. The solution is to use **Thematic Roles** — semantic generalizations over the specific roles that occur with verbs.

#### Important Thematic Roles (Labels for our Data Structures):

| Role | Meaning | Example |
| :--- | :--- | :--- |
| **Agent** | Intentional doer or causer of the event | *[The pirate] sank the ship* |
| **Patient** | The entity affected or changed by the event | *Sue mowed [the lawn]* |
| **Experiencer** | The one who perceives or experiences the event | *[Pirates] frighten me* |
| **Theme** | The entity that changes location or state | *The author read [a book]* |
| **Location** | Where the event occurs | *The pirate sank the ship [at sea]* |
| **Source** | The entity from which movement originates | *I flew in [from Boston]* |
| **Goal** | The entity to which movement is directed | *I drove [to Portland]* |
| **Force** | Natural force (no intention) | *[The wind] destroyed the house* |
| **Result** | The outcome or product of the event | *She painted [a beautiful picture]* |
| **Content** | What is expressed or communicated | *He said [that he was tired]* |
| **Instrument** | The tool used to perform the action | *He cut the bread [with a knife]* |
| **Beneficiary** | The entity that benefits from the action | *She cooked dinner [for her family]* |

#### Glossary & Notations (Section 4)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Semantic Role Labeling (SRL) | Determining the semantic role played by each noun phrase connected to a verb. |
| FOL (First-Order Logic) | A formal logical system used historically for meaning representation. |
| Thematic roles | Semantic generalizations over the specific roles that occur with verbs. |
| Agent / Patient | The doer of an action / The entity affected by an action. |
| Experiencer | A participant characterized as aware of something. |
| Theme / Location | Entity changing state or position / Where the event occurs. |
| Source / Goal | Origin of motion / Destination of motion. |
| Instrument / Beneficiary | Tool used to perform an action / Entity that benefits from the action. |

---

### Section 5: Neural Networks Foundations

The lecture concludes with a visual and simplified mathematical introduction to the foundations of **Neural Networks**, which solve all the previous problems in modern models like **GPT-3** and **GloVe**. As data structure scientists, we view these models as **directed computational graphs**.

The lecture presents two fundamental processes:

#### 1. Forward Propagation (الانتشار الأمامي)

To calculate outputs and predictions. The equations represented in the diagram are:

```
z = W x + b
```
(where `x` is the input vector, `W` is the weights matrix, and `b` is the bias vector)

```
h = f(z)
```
(where `f` is the activation function, e.g., ReLU, sigmoid, tanh)

```
s = final score or output
```

#### 2. Backpropagation (الانتشار العكسي)

To update weights and enable machine learning by calculating partial derivatives (gradients) using the chain rule:

```
∂s/∂s = 1  (derivative of the score with respect to itself)
∂s/∂h     (derivative of the score with respect to the hidden layer)
∂s/∂z     (derivative of the score with respect to z)
```

These gradients are used to update the weight matrices `W` and bias vectors `b` so that the model can learn to perform NLP tasks accurately.

#### Glossary & Notations (Section 5)

| English Notation / Term | Meaning in this Lecture |
| :--- | :--- |
| Forward Propagation | The process of calculating the output of a neural network. |
| Backpropagation | The process of calculating gradients to update network weights. |
| x / W / b | Input vector / Weights matrix / Bias vector. |
| z / h / f | Linear combination (Wx + b) / Hidden representation / Activation function. |
| s | Final score or output. |
| ∂s/∂z, ∂s/∂h | Partial derivatives used in backpropagation. |
| GPT-3 / GloVe | Advanced NLP models based on neural network architectures. |

---

## Summary & Core Vocabulary

| Term | Definition |
| :--- | :--- |
| **NLP** | AI field for computers using human language |
| **NLU / NLG** | Understanding vs. generating language |
| **Ambiguity** | Multiple distinct interpretations |
| **Vagueness** | Lack of precision, not multiple crisp meanings |
| **Morpheme** | Smallest unit of meaning |
| **Inflectional / Derivational** | Grammatical variants vs. new words |
| **POS tagging** | Assigning grammatical categories |
| **NER** | Extracting named entities (PER, ORG, LOC) |
| **Parse tree** | Tree representation of sentence syntax |
| **BoW** | Order-ignoring text representation |
| **Word2vec (CBOW, Skip-gram)** | Neural embeddings capturing similarity |
| **Confusion matrix** | 2x2 table for classifier evaluation (TP, TN, FP, FN) |
| **WSD** | Choosing correct word sense (WordNet, synsets) |
| **SRL** | Assigning thematic roles (Agent, Patient, etc.) |
| **Thematic roles** | Agent, Patient, Experiencer, Theme, Location, Source, Goal, Instrument, Beneficiary |
| **Forward / Backpropagation** | Neural network computation & learning |
| **GPT-3 / GloVe** | Advanced models built on neural architectures |

---

## Further Notes for Implementation

- **Tokenization** – always consider punctuation and clitics (e.g., `n't` in English).
- **Stemming vs. Lemmatization** – stemmer chops off endings (`running` → `run`); lemmatizer uses vocabulary and morphology (`better` → `good`).
- **Evaluation metrics** – precision, recall, F1-score derived from confusion matrix.
- **Modern word embeddings** – GloVe (global co-occurrence), FastText (subword information), BERT (contextual, transformer-based).

---

