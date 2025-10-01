export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch(`http://localhost:3000/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  // const r = await http.post(`${ApiUrl}/auth/register`, body);
  return res;
}
