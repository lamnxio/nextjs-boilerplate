import { LanguageToggle } from "@/components/language-toggle"
import { ModeToggle } from "@/components/mode-toggle"
import { Link } from "@/lib/next-intl"
import { Dog, Github, Home } from "lucide-react"
import { Button } from "../ui/button"

const navigationItems = [
  {
    href: "/",
    icon: Home,
    label: "Home",
  },
  {
    href: "/pets",
    icon: Dog,
    label: "Pets",
  },
  {
    href: "https://github.com/spring8904/nextjs-boilerplate",
    icon: Github,
    label: "GitHub",
    external: true,
  },
]

export function AppHeader() {
  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center gap-2">
        {navigationItems.map((item) => (
          <Button key={item.href} size="icon" variant="outline" asChild>
            <Link href={item.href} {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}>
              <item.icon />
              <span className="sr-only">{item.label}</span>
            </Link>
          </Button>
        ))}
        <LanguageToggle />
        <ModeToggle />
      </div>
    </div>
  )
}
