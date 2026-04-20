import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const summaryText = body.summary_text;
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization' }, { status: 401 });
    }

    const response = await fetch(`${API_URL}/summary/convert/word`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({ summary_text: summaryText }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend Word conversion error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to convert to Word', detail: errorText },
        { status: response.status }
      );
    }

    const docBuffer = await response.arrayBuffer();
    return new NextResponse(docBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename=summary.docx',
      },
    });
  } catch (error) {
    console.error('Error converting to Word:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}