import subprocess
import pyttsx3
import speech_recognition as sr

# speech_recognition

r = sr.Recognizer()
with sr.Microphone() as source:
    print("Fale algo:")
    audio = r.listen(source)

texto = r.recognize_google(audio, language="pt-BR")
print("Você disse:", texto)


engine = pyttsx3.init()

# Pede input do usuário
pergunta = texto

# Roda o modelo localmente via terminal (exemplo com Ollama)
processo = subprocess.Popen(
    ['ollama', 'run', 'tinyllama'],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True
)
resposta, _ = processo.communicate(input=pergunta)

# Fala a resposta
print("IA:", resposta)
engine.say(resposta)
engine.runAndWait()
