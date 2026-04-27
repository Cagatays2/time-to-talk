import { people } from "./phrases";

const questionStarters = [
  "can ",
  "when ",
  "where ",
  "why ",
  "what ",
  "how ",
  "could ",
  "would ",
  "should ",
  "may ",
  "do ",
  "does ",
  "did ",
  "have ",
  "has ",
  "had ",
  "is ",
  "are ",
  "was ",
  "were ",
  "will ",
];

export const normalizeWhitespace = (value: string) => value.replace(/\s+/g, " ").trim();

const knownTerms = new Map<string, string>([
  ["ipad", "iPad"],
  ["iphone", "iPhone"],
  ["tv", "TV"],
  ["youtube", "YouTube"],
  ["roblox", "Roblox"],
  ["cagatay", "Cagatay"],
  ["mom", "Mom"],
  ["dad", "Dad"],
  ["brother", "Brother"],
  ["sister", "Sister"],
]);

const contractionFixes: Array<[RegExp, string]> = [
  [/\bdont\b/giu, "don't"],
  [/\bdoesnt\b/giu, "doesn't"],
  [/\bdidnt\b/giu, "didn't"],
  [/\bcant\b/giu, "can't"],
  [/\bwont\b/giu, "won't"],
  [/\bim\b/giu, "I'm"],
  [/\bive\b/giu, "I've"],
  [/\byoure\b/giu, "you're"],
  [/\bthats\b/giu, "that's"],
  [/\bits\b/giu, "it's"],
  [/\blets\b/giu, "let's"],
  [/\bwanna\b/giu, "want to"],
  [/\bgonna\b/giu, "going to"],
];

const lowerFirstWord = (value: string) => {
  if (value === "I" || value.startsWith("I ")) {
    return value;
  }

  return value.charAt(0).toLocaleLowerCase("en-US") + value.slice(1);
};

const stripTerminalPunctuation = (value: string) => value.replace(/[.?!]+$/u, "");

const normalizeWordCase = (word: string) => {
  if (word === "I") {
    return word;
  }

  return knownTerms.get(word.toLocaleLowerCase("en-US")) ?? word;
};

const cleanWord = (word: string) =>
  normalizeWordCase(word.replace(/^[,;:]+/u, "").replace(/[,;:.?!]+$/u, ""));

const removeDuplicateTrailingPlease = (words: string[]) => {
  const lastWord = words[words.length - 1]?.toLocaleLowerCase("en-US");

  if (lastWord !== "please") {
    return words;
  }

  const earlierPlease = words.slice(0, -1).some((word) => word.toLocaleLowerCase("en-US") === "please");

  return earlierPlease ? words.slice(0, -1) : words;
};

const removeConsecutiveDuplicates = (words: string[]) =>
  words.filter((word, index) => index === 0 || word.toLocaleLowerCase("en-US") !== words[index - 1].toLocaleLowerCase("en-US"));

const normalizeWords = (words: string[]) =>
  removeDuplicateTrailingPlease(removeConsecutiveDuplicates(words.map(cleanWord).filter(Boolean)));

const choosePunctuation = (value: string) => {
  const lower = value.toLocaleLowerCase("en-US");
  const withoutAddress = lower.includes(", ") ? lower.split(", ").slice(1).join(", ") : lower;

  if (questionStarters.some((starter) => withoutAddress.startsWith(starter))) {
    return "?";
  }

  return ".";
};

const capitalizeSentence = (value: string) => {
  if (value.startsWith("iPad") || value.startsWith("iPhone")) {
    return value;
  }

  return value.charAt(0).toLocaleUpperCase("en-US") + value.slice(1);
};

export const phraseToWords = (value: string) =>
  normalizeWhitespace(value.replace(/[“”]/gu, '"').replace(/[’]/gu, "'"))
    .replace(/[.?!]+$/u, "")
    .split(" ")
    .map(cleanWord)
    .filter(Boolean);

export const composeSentence = (tokens: string[]) => {
  const cleanTokens = normalizeWords(tokens.map((token) => normalizeWhitespace(token)).filter(Boolean));

  if (cleanTokens.length === 0) {
    return "";
  }

  const [first, second, ...rest] = cleanTokens;
  const hasAddress = people.has(first) && cleanTokens.length > 1;
  const hasButAddress = first.toLocaleLowerCase("en-US") === "but" && second && people.has(second) && rest.length > 0;

  let sentenceBase = cleanTokens.join(" ");

  if (hasButAddress) {
    sentenceBase = `But ${second}, ${rest.map((token, index) => (index === 0 ? lowerFirstWord(token) : token)).join(" ")}`;
  } else if (hasAddress) {
    sentenceBase = `${first}, ${[second, ...rest].map((token, index) => (index === 0 ? lowerFirstWord(token) : token)).join(" ")}`;
  }

  const cleaned = stripTerminalPunctuation(normalizeWhitespace(sentenceBase));
  const capitalized = capitalizeSentence(cleaned);

  return `${capitalized}${choosePunctuation(capitalized)}`;
};

const addArticleForDevice = (words: string[]) => {
  const needsArticle = new Set(["iPad", "iPhone", "TV", "charger"]);

  return words.reduce<string[]>((result, word, index) => {
    const previous = words[index - 1]?.toLocaleLowerCase("en-US");
    const alreadyHasArticle = previous === "the";
    const afterObjectVerb = ["have", "unlock", "find", "use"].includes(previous ?? "");

    if (needsArticle.has(word) && afterObjectVerb && !alreadyHasArticle) {
      return [...result, "the", word];
    }

    return [...result, word];
  }, []);
};

const movePleaseIntoPoliteQuestion = (words: string[]) => {
  const lower = words.map((word) => word.toLocaleLowerCase("en-US"));
  const lastIsPlease = lower[lower.length - 1] === "please";

  if (!lastIsPlease) {
    return words;
  }

  if (lower[0] === "can" && lower[1] === "i" && lower[2] === "have") {
    return ["Can", "I", "please", "have", ...words.slice(3, -1)];
  }

  if (lower[0] === "can" && lower[1] === "you" && lower[2] === "give") {
    return ["Can", "you", "please", "give", ...words.slice(3, -1)];
  }

  if (lower[0] === "can" && lower[1] === "you" && lower[2] === "help") {
    return ["Can", "you", "please", "help", ...words.slice(3, -1)];
  }

  return words;
};

export const correctCustomSentence = (value: string) => {
  let corrected = normalizeWhitespace(value.replace(/[“”]/gu, '"').replace(/[’]/gu, "'"));

  if (!corrected) {
    return "";
  }

  contractionFixes.forEach(([pattern, replacement]) => {
    corrected = corrected.replace(pattern, replacement);
  });

  corrected = corrected
    .replace(/\bdon't want wait\b/giu, "don't want to wait")
    .replace(/\bwant eat\b/giu, "want to eat")
    .replace(/\bwant drink\b/giu, "want to drink")
    .replace(/\bwant play\b/giu, "want to play")
    .replace(/\bwant watch\b/giu, "want to watch")
    .replace(/\bcan you give me\b/giu, "can you please give me")
    .replace(/\bcan you help me\b/giu, "can you please help me");

  const words = addArticleForDevice(movePleaseIntoPoliteQuestion(phraseToWords(corrected))).map((word, index) => {
    if (word.toLocaleLowerCase("en-US") === "i") {
      return "I";
    }

    if (index === 0) {
      return normalizeWordCase(word);
    }

    return normalizeWordCase(word);
  });

  return composeSentence(words);
};
