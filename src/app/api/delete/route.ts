// src/app/api/delete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { auth } from '@/lib/drive';
import pool from '@/lib/db';

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('fileId');
    const id = searchParams.get('id');

    if (!fileId || !id) {
      return NextResponse.json(
        { success: false, error: 'File ID and record ID are required' },
        { status: 400 }
      );
    }

    // Delete from Google Drive
    const drive = google.drive({ version: 'v3', auth });
    await drive.files.delete({
      fileId: fileId
    });

    // Delete from database
    await pool.execute(
      'DELETE FROM kaizen_reports WHERE id = ?',
      [id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { success: false, error: 'Delete failed' },
      { status: 500 }
    );
  }
}