import { ThemeProvider } from "@/components/theme-provider";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <RegisterForm/>
            </ThemeProvider>
    </div>
  )
}
