import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Access your account to manage orders and settings",
}

export default function Login() {
  return <LoginTemplate />
}
