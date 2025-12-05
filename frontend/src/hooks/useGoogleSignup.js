// useGoogleSignup.js
import { useEffect } from "react";

export function useGoogleSignup(onSignupSuccess, role = "student") {
  // Load Google SDK once
  useEffect(() => {
    const id = "google-sdk";
    if (!document.getElementById(id)) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.id = id;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.__googleSdkReady = true;
        window.dispatchEvent(new Event("google-sdk-loaded"));
        console.log("[GSI] SDK loaded");
      };
      document.body.appendChild(script);
    } else if (window.google) {
      // If already present and loaded, mark ready
      window.__googleSdkReady = true;
      console.log("[GSI] SDK already present");
    }
  }, []);

  // Function to trigger Google Signup
  const signupWithGoogle = () => {
    console.log("[GSI] Click -> signupWithGoogle");
    if (!window.google) {
      console.warn("[GSI] window.google not ready yet");
      alert("Google is loading. Try again in a second.");
      return;
    }

    // Initialize Google Auth
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.error("[GSI] Missing VITE_GOOGLE_CLIENT_ID env var");
      alert("Google Client ID missing. Set VITE_GOOGLE_CLIENT_ID in your .env");
      return;
    }
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (resp) => {
        const id_token = resp.credential;

        try {
          const backend = import.meta.env.VITE_API_URL;
          console.log("[GSI] Received credential, posting to backend", backend);

          const request = await fetch(`${backend}/api/auth/google`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_token, role }),
          });

          const data = await request.json();

          if (!request.ok) throw new Error(data.message);

          // Return data to signup page
          onSignupSuccess && onSignupSuccess(data);

        } catch (err) {
          console.error("Google Signup Error:", err);
          alert("Signup failed: " + err.message);
        }
      },
      itp_support: true,
      use_fedcm_for_prompt: true,
    });

    // Open Google account chooser / One Tap immediately in the same click stack
    window.google.accounts.id.prompt((notification) => {
      const notShown = notification.isNotDisplayed();
      const skipped = notification.isSkippedMoment();
      console.log("[GSI] prompt notification", { notShown, skipped, notification });
      if (notShown || skipped) {
        console.warn("[GSI] Prompt not shown/skipped; retrying once");
        setTimeout(() => window.google.accounts.id.prompt(), 0);
      }
    });
  };

  return { signupWithGoogle };
}
