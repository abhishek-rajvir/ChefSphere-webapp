import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="abc@123"
        className="pr-16"
        required
        onChange={e => setShowPassword(e.target.value)}
      />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-2 top-1/2 -translate-y-1/2"
      >
        {showPassword ? "hide" : "show"}
      </Button>
    </div>
  )
}
