// Core components
export { AICore } from './AICore';
export { AICoreNucleus } from './AICoreNucleus';
export { AICoreOrbits } from './AICoreOrbits';
export { AICoreParticles } from './AICoreParticles';
export { GlitchText } from './GlitchText';

// State hook
export { useAICoreState } from './useAICoreState';
export type { SectionType, IntensityConfig, AICoreState } from './useAICoreState';

// Chat components
export { AIChatInterface } from './AIChatInterface';
export { AIChatMessage } from './AIChatMessage';
export { AIChatQuickReplies } from './AIChatQuickReplies';
export { AIChatInput } from './AIChatInput';
export { AIChatTyping } from './AIChatTyping';

// Chat hook
export { useAIChat } from './useAIChat';

// Chat types
export type {
  ChatMessage,
  ChatState,
  ChatFlow,
  QuickReply,
  QualifyData,
} from './chat-types';
