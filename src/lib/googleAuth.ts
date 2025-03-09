import fs from "fs";

export function setupGoogleCredentials() {
  const credentialsBase64 = process.env.GOOGLE_CREDENTIALS;
  if (!credentialsBase64) {
    throw new Error("GOOGLE_CREDENTIALS environment variable is missing");
  }

  const credentialsJSON = Buffer.from(credentialsBase64, "base64").toString("utf-8");

  // Ensure the temp directory exists
  const tempPath = "/tmp/credentials.json";
  fs.writeFileSync(tempPath, credentialsJSON);

  console.log("✅ Google Credentials Loaded!");
  return tempPath; // Return the file path to use in other parts of your app
}
