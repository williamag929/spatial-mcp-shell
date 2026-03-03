import { useState, useCallback } from 'react';

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';
const OLLAMA_MODEL = 'llama3';

const NORMALIZATION_PROMPT = `You are a data normalization assistant for a spatial computing system.
Parse the user's input and return ONLY a valid JSON object with no extra text or markdown.
The JSON must have these fields:
- "type": one of "Contact", "Task", "Event", "Note", or "Reminder"
- "content": an object with the relevant structured fields for that type
- "connections": an array of node IDs (strings) that this node relates to from the provided existing nodes

Existing nodes (JSON array): {EXISTING_NODES}

User input: "{INPUT}"

Respond with only the JSON object.`;

function buildPrompt(input, existingNodes) {
  const nodesSummary = existingNodes.map((n) => ({
    id: n.id,
    type: n.type,
    content: n.content,
  }));
  return NORMALIZATION_PROMPT
    .replace('{EXISTING_NODES}', JSON.stringify(nodesSummary))
    .replace('{INPUT}', input);
}

function generateId() {
  return `node-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function parseOllamaResponse(raw) {
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');
    return JSON.parse(jsonMatch[0]);
  } catch {
    return {
      type: 'Note',
      content: { text: raw },
      connections: [],
    };
  }
}

export function useNoForms() {
  const [nodes, setNodes] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const normalizeText = useCallback(async (rawText) => {
    if (!rawText.trim()) return;
    setIsProcessing(true);
    setError(null);

    try {
      const prompt = buildPrompt(rawText, nodes);
      const response = await fetch(OLLAMA_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          prompt,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const parsed = parseOllamaResponse(data.response ?? '');

      const newNode = {
        id: generateId(),
        type: parsed.type ?? 'Note',
        content: parsed.content ?? { text: rawText },
        connections: Array.isArray(parsed.connections) ? parsed.connections : [],
        z_layer: 1,
        createdAt: new Date().toISOString(),
        rawInput: rawText,
      };

      setNodes((prev) => [...prev, newNode]);
      return newNode;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [nodes]);

  return { nodes, normalizeText, isProcessing, error };
}
