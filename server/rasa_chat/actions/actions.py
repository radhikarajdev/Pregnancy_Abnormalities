# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

# from typing import Any, Text, Dict, List
#
# from rasa_sdk import Action, Tracker
# from rasa_sdk.executor import CollectingDispatcher
#
#
# class ActionHelloWorld(Action):
#
#     def name(self) -> Text:
#         return "action_hello_world"
#
#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#
#         dispatcher.utter_message(text="Hello World!")
#
#         return []

from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
class ActionReferToProfessional(Action):
 def name(self) -> Text:
    return "action_refer_to_professional"
 def run(self, dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

    # Example: Retrieve user's location from slot (if available)
    user_location = tracker.get_slot("user_location")

    # Static list of professionals or support groups
    counselors = {
        "Mumbai": "Dr. Sonal Kumta, Fortis Hospital - Phone: +91 22 2565 6565",
"Chennai": "Dr. Firuza Parikh, Apollo Hospital - Phone: +91 44 2829 9999",
"New Delhi": "Dr. Anjila Aneja, Max Super Specialty Hospital - Phone: +91 11 2651 5050",
"Bangalore": "Dr. Renu Raina Sehgal, Manipal Hospital - Phone: +91 80 2222 2222",
"Mumbai": "Dr. Veena Bhat, Lilavati Hospital - Phone: +91 22 2640 6666",
"New Delhi": "Dr. Gayatri Deshpande, Fortis La Femme - Phone: +91 11 4172 9999",
"Bangalore": "Dr. Sabhyata Gupta, Narayana Health - Phone: +91 80 7122 2222",
"Mumbai": "Dr. Aviva Pinto Rodrigues, Jaslok Hospital - Phone: +91 22 6657 9999",
"Gurgaon": "Dr. Rama Joshi, Artemis Hospital - Phone: +91 124 451 1111",
"Mumbai": "Dr. R. Charumathi, Kokilaben Dhirubhai Ambani Hospital - Phone: +91 22 4269 6969",
"default": "Please contact your nearest healthcare provider or search online for professionals in your area."
    }

    # Fetch the appropriate contact based on location
    contact_info = counselors.get(user_location, counselors["default"])

    # Respond with the professional's contact details
    dispatcher.utter_message(
        text=f"Here is a professional contact you can reach out to: {contact_info}"
    )
    return []


from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from transformers import pipeline
class ActionAnswerGeneralQuestion(Action):
 def name(self) -> Text:
    return "action_answer_general_question"
 def __init__(self):
    # Load the Q&A model
    self.qa_pipeline = pipeline("question-answering", model="deepset/roberta-base-squad2")

 def run(self, dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

    # Get the user's query
    user_query = tracker.latest_message.get('text')

    # Context (you can enhance this with a dynamic dataset or a larger context)
    context = """
    Pregnancy is a natural process where a woman carries a fetus in her womb. Healthy living,
    balanced diet, and regular checkups are essential. For specific concerns, always consult a doctor.
    """

    # Perform Q&A using the model
    result = self.qa_pipeline(question=user_query, context=context)
    answer = result.get("answer", "I'm sorry, I couldn't find an answer to your question.")

    # Respond to the user
    dispatcher.utter_message(text=answer)
    return []

