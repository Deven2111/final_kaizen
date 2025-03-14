import { google } from 'googleapis';
import { createReadStream } from 'fs';

export async function getGoogleDriveAuth(){
  const credentials = {
    "type": "service_account",
    "project_id": "geometric-team-450013-c0",
    "private_key_id": "9bbed3d871f0f3c3129519e674f0d692e5644005",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDt1uD4WY9QcBeJ\nG65M+tiFanOwKPuIOWdonGe9Vs4VtMjlKHxtsm2gRkyIsnsHRXh5nvmCtw7A5TNh\njJXtXZOc5ZfWVU9SqqlwM4OXgHDZXbuBpGoXeC1LAdLURY5EHhSz2P7cTItMKe1M\nfodIaDhm9s5d9PLRpo5TKkdG86K/k7bn19ccAsY70n/mAIevycuBTOrPmfrdqxKd\nVbzfK1tkCEPT/bUaUYYrCbUcZzx7b5SXkjej4rOkAc6nzpTbFSBeVwroic/d0f5s\nIu6jJyg71SDD1N0VdKZgoNuAz6A/IGGvpPjqT2ikPlr+RPmv/FGbSmmF13BKhRWG\n5vZC/1y5AgMBAAECggEAGLr7qIczejM1l0mcDaAVrIW9oscYJHmHkZ6VwN/KTQJ/\n0ygrDAL+GCjHI32fgkmMdeT8X8WmEJOkjJOgMU7GHw3WhHBZb6iUNrj8iV/PHCL9\ncMUGTQtvdjmp0O2sldOk5nB9S63f3BsN9CLB8Vr45mfqXGWwa/FMIkSmpa+GsDG5\n/mAzkS+2rMghNoHk5CwHQwSnBP0h/TGlLjjP0dN5ZocaOUM0xjHd8m/CY1tuLzlc\n+9yYpnO/3bG5j2ZfUfq6fLSbj0M3LcaYlICR58S/AmsPTs2cJZtScokZjtsyjyTn\n5KB788Vt2j4ZdZQYXenPkVYSvuEECcIBkn53pKDkqwKBgQD/O7B1Cpvo4NtkbxGZ\nm04vHRTdSAKB0enA4oEsesn2Vtr1cBO2BeamWWZMYOaFr8biVoE9tw9I2a9S6x+X\n/X7u7Ox+Y9F11IO57uQ2Zb/s6UbVWeBgR2UOVRiT78sVAT6nSJqH5jY2PM2/hd6/\nVQst2zV8PX0ZaThaW7Fyiu40awKBgQDujc+qmF6Mfh3R+n0f7cq6uZyjD0JPM+2P\nHoO36Ekn0ThSmlUZMUhJ4La00eZGVUPSO+XZVX2719fHtiZBKvkIdcBqwCjUUS4F\nj5c/60HmBUJdABgtkW3UHrVgCwG/lBSXpt8kgFY4QhAD3LhGtuYwiU3ICWsduv+h\nn41qggtcawKBgF1vxJGUaK9AYhDKeG77ZAvrYZAApKpR5nkucouOCBGeiln/xbeF\nQYL0h3a+oqWeS/jgIkAtm/LXfk+ks9Q4gReGtK0wbaXtPqv6wKEJbtGUNNI2LOYS\nPPSaQn0l8/qkkgM7mRbXOFFywP+0Sm9Q+t62uUXaXMnIs1Cg8L02Dy4xAoGBAOdM\nqOYIBuTCA7fs4BVtQvv5rF6OFQUmnFgAhkZy+zuYKLwu2AQtPKIlOAHq4xOe6LuX\nSC2KLvdLOPVzL3RQblY9levrlasHa1AJAeX//U1CHC6AQPEt6QebHtGY2oEe2ziP\nnByQMwkpRM353NLz1A2Lk9c5CpsxDVtwkHWM0ecxAoGAZJa4YnE/1khEuYQ0WDgh\n9y0n4IWTov1x6DgC6Yu5F+S7+h2Ws7xVrfFyLsAKGAik1zQ97jAgZluS4sPRg887\nitLbdIgQSfi8wpVLEA5EEUysGoCKCcSVv6rKfgDzKF4CjUnll5aAWeyPYjizgd4T\nQmkGHc7kAWLtiPVorJlGGnI=\n-----END PRIVATE KEY-----\n",
    "client_email": "deven-822@geometric-team-450013-c0.iam.gserviceaccount.com",
    "client_id": "103788831109989132583",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/deven-822%40geometric-team-450013-c0.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  return credentials;
}

export const auth = new google.auth.GoogleAuth({
  credentials: await getGoogleDriveAuth(), // Ensure this is resolved before passing
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

// export const auth = new google.auth.GoogleAuth({
//   keyFile: './credentials.json', // Replace with the actual path to your service account key file
//   scopes: ['https://www.googleapis.com/auth/drive.file'],
// });


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
