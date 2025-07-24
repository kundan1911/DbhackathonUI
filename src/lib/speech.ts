const languageVoiceMap: { [key: string]: string } = {
  en: 'en-US',
  es: 'es-ES',
  hi: 'hi-IN'
};

export function speak(text: string, language: string = 'en') {
  if (!window.speechSynthesis) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = languageVoiceMap[language] || 'en-US';

  // Get available voices and try to find a matching one
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang.startsWith(languageVoiceMap[language]));
  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
