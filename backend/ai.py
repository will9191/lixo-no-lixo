from constants import AI_MODEL, PROJECT_INSTRUCTIONS
import os
from groq import Groq
from groq.types.chat import (
    ChatCompletionUserMessageParam,
    ChatCompletionContentPartTextParam,
    ChatCompletionContentPartImageParam,
)
from datetime import datetime

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)


def chat_with_ai(message, image):
    cur_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    AI_PROMPT_TEMPLATE = f"""
    When responding, please keep the following points in mind:
    - Today is {cur_date}.
    - Not all content in the search results is closely related to the user's question. You need to evaluate and filter the search results based on the question.
    - For listing-type questions (e.g., listing all flight information), try to limit the answer to 10 key points and inform the user that they can refer to the search sources for complete information. Prioritize providing the most complete and relevant items in the list. Avoid mentioning content not provided in the search results unless necessary.
    - Always break lines when listing things or providing multiple points, and use a clear and readable format. 
    - For creative tasks (e.g., writing an essay), ensure that references are cited within the body of the text, such as [citation:3][citation:5], rather than only at the end of the text. You need to interpret and summarize the user's requirements, choose an appropriate format, fully utilize the search results, extract key information, and generate an answer that is insightful, creative, and professional. Extend the length of your response as much as possible, addressing each point in detail and from multiple perspectives, ensuring the content is rich and thorough.
    - If the response is lengthy, structure it well and summarize it in paragraphs. If a point-by-point format is needed, try to limit it to 5 points and merge related content.
    - For objective Q&A, if the answer is very brief, you may add one or two related sentences to enrich the content.
    - Choose an appropriate and visually appealing format for your response based on the user's requirements and the content of the answer, ensuring strong readability.
    - Your answer should synthesize information from multiple relevant webpages and avoid repeatedly citing the same webpage.
    - Unless the user requests otherwise, your response should be in the same language as the user's question.
    - If an image is provided, analyze the image and incorporate relevant information into your response as well as correlating with the user's message.
    - Follow the project instructions: {PROJECT_INSTRUCTIONS}
    # The user's new message is: {message}"""

    messages = [
        ChatCompletionUserMessageParam(
            role="user",
            content=(
                [
                    ChatCompletionContentPartTextParam(
                        type="text", text=AI_PROMPT_TEMPLATE
                    ),
                    ChatCompletionContentPartImageParam(
                        type="image_url", image_url={"url": image}
                    ),
                ]
                if image
                else [
                    ChatCompletionContentPartTextParam(
                        type="text", text=AI_PROMPT_TEMPLATE
                    )
                ]
            ),
        )
    ]
    response = client.chat.completions.create(model=AI_MODEL, messages=messages)

    return response.choices[0].message.content
