import requests
from config import SUPABASE_URL, SUPABASE_KEY

def fetch_athlete_data():
    """Fetch athlete data from Supabase."""
    headers = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    response = requests.get(f"{SUPABASE_URL}/rest/v1/athletes", headers=headers)
    return response.json() if response.status_code == 200 else []

def fetch_sponsorships():
    """Fetch sponsorship listings from Supabase."""
    headers = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
    response = requests.get(f"{SUPABASE_URL}/rest/v1/sponsorships", headers=headers)
    return response.json() if response.status_code == 200 else []

if __name__ == "__main__":
    print(fetch_athlete_data())
    print(fetch_sponsorships())
