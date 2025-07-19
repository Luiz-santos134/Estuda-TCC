import customtkinter as ctk
import speech_recognition as sr
import pyttsx3
import threading
from datetime import date

# Obter a data atual
data_atual = date.today()

# Inicializa o sistema de voz
engine = pyttsx3.init()
engine.setProperty('rate', 180)
lock = threading.Lock()  # Impede conflitos ao falar

# Função para falar
def falar(texto):
    def falar_thread():
        with lock:  # Garante que só uma thread fale por vez
            engine.say(texto)
            engine.runAndWait()
    threading.Thread(target=falar_thread).start()

# Função que escuta a fala do usuário
def escutar():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        texto_label.configure(text="🎤 Ouvindo...")
        try:
            audio = r.listen(source, timeout=5, phrase_time_limit=7)
            texto = r.recognize_google(audio, language="pt-BR")
            texto_label.configure(text=f"👂 Você disse: {texto}")
            responder(texto)
        except sr.WaitTimeoutError:
            texto_label.configure(text="⌛ Tempo esgotado. Tente novamente.")
            falar("Você demorou muito. Fale novamente.")
        except sr.UnknownValueError:
            texto_label.configure(text="❌ Não entendi. Fale de novo.")
            falar("Não entendi. Fale novamente.")
        except sr.RequestError:
            texto_label.configure(text="❌ Erro ao conectar com o serviço.")
            falar("Houve um erro ao conectar com o serviço de voz.")

# Resposta da IA
def responder(texto_usuario):
    texto_usuario = texto_usuario.lower()
    if "oi" in texto_usuario or "olá" in texto_usuario:
        resposta = "Olá! Tudo bem?"

    elif "tchau" in texto_usuario:
        resposta = "Até logo! Tenha um bom dia."

    elif "que dia é hoje" in texto_usuario:
        data_formatada = data_atual.strftime("%d/%m/%Y")
        resposta = f"Hoje é {data_formatada}."

    else:
        resposta = "Desculpe, ainda estou aprendendo."

    texto_label.configure(text=f"🤖 IA: {resposta}")
    falar(resposta)

# Inicia escuta em nova thread
def iniciar_escuta():
    thread = threading.Thread(target=escutar)
    thread.start()

# Interface gráfica
ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("blue")

app = ctk.CTk()
app.geometry("400x300")
app.title("Zeus - Assistente")

titulo = ctk.CTkLabel(app, text="Zeus - Assistente de Voz", font=("Arial", 20))
titulo.pack(pady=20)

botao_falar = ctk.CTkButton(app, text="Fale algo", command=iniciar_escuta)
botao_falar.pack(pady=10)

texto_label = ctk.CTkLabel(app, text="Clique no botão e fale!", font=("Arial", 14))
texto_label.pack(pady=10)

app.mainloop()
