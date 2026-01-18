import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}

export default function Login() {
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "286066802564-crbgpaq6ocb0na8cdiia01bnds2agsm1.apps.googleusercontent.com",
      callback: (response: any) => {
        localStorage.setItem("token", response.credential);
        window.location.href = "/dashboard";
      },
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "outline", size: "large" }
    );
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 border rounded w-80 text-center">
        <h1 className="text-xl mb-4">Login to ReachInbox</h1>
        <div id="google-btn"></div>
      </div>
    </div>
  );
}