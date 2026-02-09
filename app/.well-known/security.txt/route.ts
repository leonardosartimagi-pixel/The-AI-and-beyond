import { NextResponse } from 'next/server';

export function GET() {
  const body = `Contact: mailto:privacy@theaiandbeyond.it
Expires: 2027-02-09T00:00:00.000Z
Preferred-Languages: it, en
Canonical: https://theaiandbeyond.it/.well-known/security.txt
`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
