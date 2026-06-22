/**
 * Translate a Firebase error into a plain-English message.
 *
 * Why: the default "Something went wrong" hides the actual problem.
 * This surfaces a readable message for known errors, and the raw message
 * for unknown ones so we can diagnose together.
 *
 * Note for the founder: if you see a raw technical message here, copy it
 * and paste it in chat. That tells us exactly what is wrong.
 */
export function authErrorToMessage(err: unknown): string {
  const message = err instanceof Error ? err.message : String(err);
  const code = (err as { code?: string })?.code || "";
  const both = `${message} ${code}`.toLowerCase();

  if (both.includes("configuration-not-found") || both.includes("api-key-not-valid") || both.includes("api key not valid")) {
    return "Firebase is not set up yet. Check your API keys in the Firebase console and your env vars. See MANUAL_TASKS.md MT-001.";
  }
  if (both.includes("operation-not-allowed") || both.includes("operation_not_allowed")) {
    return "This sign-in method is not enabled in Firebase. Go to Firebase Console, then Authentication, then Sign-in method, and enable Email/Password or Google. See MANUAL_TASKS.md MT-004.";
  }
  if (both.includes("email-already-in-use")) {
    return "An account with that email already exists. Try signing in instead.";
  }
  if (both.includes("invalid-credential") || both.includes("wrong-password") || both.includes("invalid_credential")) {
    return "That email and password do not match. Try again.";
  }
  if (both.includes("user-not-found")) {
    return "No account found with that email. Would you like to sign up?";
  }
  if (both.includes("weak-password")) {
    return "Password is too weak. Use at least 6 characters.";
  }
  if (both.includes("popup-closed") || both.includes("cancelled")) {
    return "Google sign-in was cancelled. Try again when ready.";
  }
  if (both.includes("popup-blocked") || both.includes("popup_request_blocked")) {
    return "Your browser blocked the Google pop-up. Allow pop-ups for this site and try again.";
  }
  if (both.includes("unauthorized-domain") || both.includes("unauthorized_domain")) {
    return "This domain is not authorized in Firebase. Add it under Firebase Console, then Authentication, then Settings, then Authorized domains. See MANUAL_TASKS.md MT-003.";
  }
  if (both.includes("permission-denied") || both.includes("missing or insufficient") || both.includes("permission_denied")) {
    return "Permission denied by Firestore. Make sure the security rules are published. See MANUAL_TASKS.md MT-002.";
  }
  if (both.includes("network") || both.includes("timeout") || both.includes("fetch")) {
    return "Could not reach the server. Check your internet connection and try again.";
  }

  // For anything else, show the actual error so we can diagnose it.
  // This is intentional: if something unexpected happens, the founder can
  // paste the message in chat and we fix it immediately.
  console.error("[Auth] Unhandled error:", err);
  return `Something went wrong. (${code || message})`;
}
