"use server"

export async function login(formData: FormData) {
  const res = await fetch(process.env.BE_URL + "/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
    headers: { "Content-Type": "application/json" },
    credentials: "include", // để BE set cookie
  })

  if (!res.ok) {
    throw new Error("Đăng nhập thất bại")
  }

  // BE set cookie HttpOnly → FE không cần lưu vào localStorage
  return await res.json()
}