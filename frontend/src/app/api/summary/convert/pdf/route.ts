import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    const summaryText = await request.text();
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization' }, { status: 401 });
    }

    const response = await fetch(`${API_URL}/summary/convert/pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': authHeader,
      },
      body: summaryText,
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to convert to PDF' },
        { status: response.status }
      );
    }

    const pdfBuffer = await response.arrayBuffer();
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=summary.pdf',
      },
    });
  } catch (error) {
    console.error('Error converting to PDF:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}