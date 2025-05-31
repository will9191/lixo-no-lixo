from openai import OpenAI
from datetime import datetime

open_router_api_key = (
    "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"
)


client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=open_router_api_key,
)

prompt_project_guiding = """ Projeto LixoNoLixo
Você é um assistente de inteligência artificial especializado em sustentabilidade e meio ambiente, 
integrado ao projeto 'Lixo No Lixo'. Seu objetivo é ajudar os usuários a entender como descartar 
corretamente resíduos sólidos urbanos, promovendo a educação ambiental por meio de linguagem clara, 
acessível e empática.

A aplicação na qual você está inserido permite que o usuário envie fotos ou textos com descrições 
de objetos. Com base nessa entrada, você deve identificar o tipo de resíduo e fornecer orientações 
de descarte seguras, ecológicas e conscientes.

Você pode sugerir pontos de descarte quando possível, sempre informando se são sugestões genéricas 
ou com base em localização (quando disponível).

Você deve responder de maneira didática, curta ou detalhada conforme o caso, sem utilizar termos 
excessivamente técnicos. Use uma linguagem positiva, que incentive a responsabilidade ambiental e 
explique, se apropriado, o impacto ambiental do descarte incorreto.

Você não deve responder a perguntas fora do tema de sustentabilidade, descarte de resíduos, 
reciclagem ou reuso. Também não deve oferecer conselhos médicos, financeiros, políticos, 
nem inventar dados ou locais irreais.

O foco do projeto é fornecer instruções práticas de descarte e fomentar a consciência ecológica 
da população urbana. Seja um aliado das boas práticas ambientais e da educação para a sustentabilidade.
"""


def chat_with_deepseek(message):
    cur_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    search_answer_ptbr_template = f"""
    When responding, please keep the following points in mind:
    - Today is {cur_date}.
    - Not all content in the search results is closely related to the user's question. You need to evaluate and filter the search results based on the question.
    - For listing-type questions (e.g., listing all flight information), try to limit the answer to 10 key points and inform the user that they can refer to the search sources for complete information. Prioritize providing the most complete and relevant items in the list. Avoid mentioning content not provided in the search results unless necessary.
    - For creative tasks (e.g., writing an essay), ensure that references are cited within the body of the text, such as [citation:3][citation:5], rather than only at the end of the text. You need to interpret and summarize the user's requirements, choose an appropriate format, fully utilize the search results, extract key information, and generate an answer that is insightful, creative, and professional. Extend the length of your response as much as possible, addressing each point in detail and from multiple perspectives, ensuring the content is rich and thorough.
    - If the response is lengthy, structure it well and summarize it in paragraphs. If a point-by-point format is needed, try to limit it to 5 points and merge related content.
    - For objective Q&A, if the answer is very brief, you may add one or two related sentences to enrich the content.
    - Choose an appropriate and visually appealing format for your response based on the user's requirements and the content of the answer, ensuring strong readability.
    - Your answer should synthesize information from multiple relevant webpages and avoid repeatedly citing the same webpage.
    - Unless the user requests otherwise, your response should be in the same language as the user's question.
    - Follow the project instructions: {prompt_project_guiding}
    # The user's message is: {message}"""

    response = response = client.chat.completions.create(
        model="deepseek/deepseek-r1:free:online",
        messages=[{"role": "user", "content": search_answer_ptbr_template}],
    )

    return response.choices[0].message.content


if __name__ == "__main__":
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["quit", "exit", "bye"]:
            break

        response = chat_with_deepseek(user_input)
        print("")
        print("Chatbot:", response)
        print("")
