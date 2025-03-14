import { google } from 'googleapis';
import { createReadStream } from 'fs';

export async function getGoogleDriveAuth(){
  const credentials = {
    "type": "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.GOOGLE_CLIENT_X509_CERT_URL,
    "universe_domain": "googleapis.com"
  }
  return credentials;
}

export const auth = new google.auth.GoogleAuth({
  credentials: await getGoogleDriveAuth(), // Ensure this is resolved before passing
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});



const drive = google.drive({ version: 'v3', auth });

export async function uploadToDrive(filePath: string, fileName: string): Promise<string> {
  try {
    const fileStream = createReadStream(filePath); // Use a stream for the file

    const response = await drive.files.create({
      requestBody: {
        name: fileName, // File name in Google Drive
        parents: ['1jcPktG1XHurZPLzBuXdM2_oKXSvYuaXJ'], // Replace with your Drive folder ID
      },
      media: {
        mimeType: 'application/octet-stream',
        body: fileStream, // Pass the file stream here
      },
      fields: 'id',
    });

    if (!response.data.id) {
      throw new Error('Failed to retrieve file ID after upload.');
    }

    console.log(`File uploaded successfully: ${response.data.id}`);
    return response.data.id;
  } catch (error) {
    console.error('Google Drive upload failed:', error); // Log the actual error details
    throw new Error('Google Drive upload failed');
  }
}
