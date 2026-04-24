import { Ollama } from "ollama";

// Create a custom Ollama instance pointing to local server
export const ollamaInstance = new Ollama({
  host: "http://127.0.0.1:11434",
});

// Common Ollama models - can be extended
export const AVAILABLE_MODELS = [
  "gpt-oss:20b",
  "llama3.2",
  "llama3.1",
  "mistral",
  "codellama",
  "phi3",
  "gemma2",
];

export const DEFAULT_MODEL = "gpt-oss:20b";
