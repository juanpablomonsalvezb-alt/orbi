import 'server-only'
import { Contexto } from '@/types/database'
import { buildSystemPrompt, TipoAgente, EstiloComunicacion } from './prompts'
import { retrieveKnowledge, getKBOverview } from './knowledge-base'
import { buildMemoryContext } from './memory'
import { buildTaskContext } from './task-context'

/**
 * Enhanced prompt builder with RAG. Server-only (uses fs for knowledge base).
 * Retrieves relevant knowledge base sections based on the user's message
 * and injects them into the system prompt for deeper, more specific responses.
 */
export async function buildSystemPromptWithRAG(
  nombreEmpresa: string,
  contexto: Contexto[],
  tipoAgente: TipoAgente,
  userMessage: string,
  conversationHistory: string = '',
  estilo: EstiloComunicacion = 'directo',
  empresaId?: string
): Promise<string> {
  let prompt = buildSystemPrompt(nombreEmpresa, contexto, tipoAgente, userMessage, conversationHistory, estilo)

  // Inject memory context BEFORE knowledge base sections
  if (empresaId) {
    try {
      const memoryContext = await buildMemoryContext(empresaId)
      if (memoryContext) {
        prompt += '\n' + memoryContext
        prompt += '\n\nUsa tu MEMORIA DEL NEGOCIO para dar respuestas contextualizadas. Si recuerdas un dato relevante, menciónalo proactivamente.'
      }

      const taskContext = await buildTaskContext(empresaId)
      if (taskContext) {
        prompt += '\n' + taskContext
      }
    } catch (err) {
      console.error('Error loading memory/task context:', err)
    }
  }

  try {
    const overview = getKBOverview(tipoAgente)
    if (overview) {
      prompt += overview
    }

    const knowledge = retrieveKnowledge(tipoAgente, userMessage, conversationHistory)
    if (knowledge) {
      prompt += knowledge
      prompt += '\n\nIMPORTANTE: Usa el conocimiento especializado de arriba para dar respuestas PROFUNDAS y ESPECÍFICAS con ejemplos, benchmarks, templates y tácticas concretas. No des respuestas genéricas cuando tienes esta información disponible.'
    }
  } catch (err) {
    console.error('Error loading knowledge base:', err)
  }

  return prompt
}
