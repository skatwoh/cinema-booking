import sys
from playwright.sync_api import sync_playwright

def verify_redesign():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Correct method is new_context()
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        try:
            print("Navigating to frontend...")
            page.goto("http://localhost:5175", wait_until="networkidle")

            # 1. Check for Nocturne Branding
            print("Checking for branding...")
            page.wait_for_selector("text=NOCTURNE", timeout=5000)
            page.wait_for_selector("text=CINEMAS", timeout=5000)

            # 2. Check for Movie Data (Integration)
            print("Checking for movie grid...")
            page.wait_for_selector("text=Avatar: The Way of Water", timeout=5000)

            # 3. Check for Hero Section
            print("Checking for hero section...")
            page.wait_for_selector("text=NEON", timeout=5000)
            page.wait_for_selector("text=ECLIPSE", timeout=5000)

            # Take a screenshot
            print("Capturing final screenshot...")
            page.screenshot(path="verification/screenshots/final_verification.png", full_page=True)

            print("Verification successful!")

        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/screenshots/failure_state.png")
            sys.exit(1)
        finally:
            browser.close()

if __name__ == "__main__":
    verify_redesign()
