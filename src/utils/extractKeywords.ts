const STOP_WORDS = new Set([
  "a",
  "al",
  "ante",
  "bajo",
  "con",
  "contra",
  "de",
  "del",
  "desde",
  "durante",
  "e",
  "el",
  "ella",
  "ellas",
  "ellos",
  "en",
  "entre",
  "es",
  "esa",
  "ese",
  "eso",
  "esta",
  "este",
  "esto",
  "estos",
  "estas",
  "hacia",
  "hasta",
  "la",
  "las",
  "le",
  "les",
  "lo",
  "los",
  "me",
  "mi",
  "más",
  "no",
  "nos",
  "o",
  "para",
  "pero",
  "por",
  "que",
  "se",
  "sin",
  "sobre",
  "su",
  "sus",
  "también",
  "te",
  "tu",
  "tus",
  "un",
  "una",
  "uno",
  "unos",
  "unas",
  "y",
  "ya",
  "yo",
  "está",
  "están",
  "fue",
  "han",
  "hay",
  "he",
  "les",
  "nos",
  "ser",
  "son",
  "como",
  "muy",
  "si",
  "bien",
  "así",
  "era",
  "ni",
  "tiene",
  "esto",
]);

export default function extractKeywords(text: string) {
  if (!text || text.trim().toLowerCase() === "no especificado") return [];

  return text
    .toLowerCase()
    .normalize("NFD") // descompone tildes
    .replace(/[\u0300-\u036f]/g, "") // elimina diacríticos
    .replace(/[^a-z0-9\s-]/g, " ") // elimina puntuación
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(
      (word) =>
        word.length > 1 && // descarta palabras muy cortas
        !STOP_WORDS.has(word) && // descarta stop words
        !/^\d+$/.test(word), // descarta números puros
    );
}
