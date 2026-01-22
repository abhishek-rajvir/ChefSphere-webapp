import { ThemeProvider } from "@/components/theme-provider";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <LoginForm/>
            </ThemeProvider>
    </div>
  )
}
