import React from "react";

const UserInstructions = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Get Started</h1>
      <p>To use this app, you need to create accounts on Imgflip and ImgBB and obtain your credentials.</p>

      <h2>1. Getting Imgflip Credentials</h2>
      <ol>
        <li>Go to <a href="https://imgflip.com/" target="_blank" rel="noopener noreferrer">Imgflip</a>.</li>
        <li>Sign up for a new account.</li>
        <li>Log in to your account.</li>
        <li>Use your <strong>username</strong> and <strong>password</strong> in the app.</li>
      </ol>

      <h2>2. Getting ImgBB API Key</h2>
      <ol>
        <li>Go to <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer">ImgBB</a>.</li>
        <li>Sign up for a new account.</li>
        <li>Log in to your account.</li>
        <li>Go to the <strong>API</strong> section and copy your API key.</li>
        <li>Paste your <strong>API key</strong> in the app.</li>
      </ol>

      <h2>Need Help?</h2>
      <p>If you have any issues, feel free to contact support.</p>
    </div>
  );
};

export default UserInstructions;