import os
from dotenv import load_dotenv

load_dotenv()


def get_env(key: str, fallback: str) -> str:
    """get environment variable value from .env

    Args:
        key (str): variable key
        fallback (str): fallback value if none

    Returns:
        str: value of environment variable
    """
    return os.getenv(key, fallback)
