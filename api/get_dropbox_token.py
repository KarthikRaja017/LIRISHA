"""
One-time script to generate a Dropbox OAuth2 refresh token.
Run this ONCE, paste the token into api/.env, then delete this file.
"""
import dropbox

APP_KEY    = "f6vvzw16m7bo7wc"
APP_SECRET = "i3ywcqrtongudw5"

auth_flow = dropbox.DropboxOAuth2FlowNoRedirect(
    APP_KEY,
    APP_SECRET,
    token_access_type="offline",   # <-- "offline" gives a permanent refresh token
)

authorize_url = auth_flow.start()

print()
print("=" * 60)
print("  STEP 1 — Open this URL in your browser:")
print("=" * 60)
print(authorize_url)
print()
print("  STEP 2 — Click 'Allow' on the Dropbox page")
print()
print("  STEP 3 — Copy the authorization code shown and paste below")
print("=" * 60)
print()

auth_code = input("  Paste authorization code here: ").strip()

try:
    oauth_result = auth_flow.finish(auth_code)
    print()
    print("=" * 60)
    print("  SUCCESS! Add these to api/.env:")
    print("=" * 60)
    print(f"  DROPBOX_APP_KEY={APP_KEY}")
    print(f"  DROPBOX_APP_SECRET={APP_SECRET}")
    print(f"  DROPBOX_REFRESH_TOKEN={oauth_result.refresh_token}")
    print()
    print("  Your account_id:", oauth_result.account_id)
    print("=" * 60)
except Exception as e:
    print(f"\n  ERROR: {e}")
    print("  Make sure you copied the full authorization code correctly.")
