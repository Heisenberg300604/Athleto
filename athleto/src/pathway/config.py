import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

# Supabase Configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# OpenAI/Gemini Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Pathway API Configuration
PATHWAY_PORT = 8080  # Change if needed
