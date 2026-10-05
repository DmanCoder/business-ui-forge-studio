import { NextResponse, NextRequest } from 'next/server';

// export default verifyRecaptcha;
export async function POST(req: NextRequest) {
  const secretKey = process.env.RECAPTURE_PRIVATE_API_KEY;

  // Ensure the request method is POST
  if (req.method !== 'POST') {
    return NextResponse.json({ success: false, message: 'Method Not Allowed' }, { status: 405 });
  }

  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ success: false, message: 'Token is missing' }, { status: 400 });
  }

  try {
    // Verify the token with Google's reCAPTCHA API
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ message: 'Operation successful', success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { success: false, message: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
