
from deepface import DeepFace
import tempfile
import os
import cv2
from flask_login import  UserMixin, LoginManager

class User(UserMixin):
    def __init__(self, user_id):
        self.id = user_id
        self.gender = None
        self.age = None
        self.race = None
    def userClassification(self,image):
        # Save the frame as an image file in a temporary directory
        temp_dir = tempfile.mkdtemp()
        temp_image_path = os.path.join(temp_dir, 'temp_image.jpg')
        image.save(temp_image_path)
        try:
            # Analyze the saved image using DeepFace
            demography = DeepFace.analyze(temp_image_path, ['age', 'gender', 'race', 'emotion'],enforce_detection=False)
            
            self.age = demography[0]['age']
            self.gender = demography[0]['dominant_gender']
            self.race = demography[0]['dominant_race']

            # Return True if analysis is completed successfully
            return True
        except Exception as e:
            # Handle exceptions (e.g., if DeepFace analysis fails)
            print(f"Error during analysis: {str(e)}")
            return False


    @staticmethod
    def get(user_id):
        return User(user_id)




