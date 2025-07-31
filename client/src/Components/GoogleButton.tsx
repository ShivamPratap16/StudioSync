const GoogleButton = () => {
  const handleGoogleLogin = () => {
    // TODO: Trigger Google OAuth flow
    console.log("Google login...");
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full border flex items-center justify-center gap-3 py-2 rounded-xl hover:bg-gray-100 transition"
    >
      <img src="/google.svg" alt="Google" className="h-5 w-5" />
      <span className="text-sm text-gray-700">Continue with Google</span>
    </button>
  );
};

export default GoogleButton;
