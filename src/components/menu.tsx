import { Link, useRouterState } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  CalendarFold,
  ChartNoAxesCombined,
  House,
  type LucideIcon,
  Settings,
} from 'lucide-react'
import { FieldGroup, FieldSeparator } from '@/components/ui/field'
import { cn } from '@/lib/utils'

interface NavItem {
  to: string
  icon: LucideIcon
  label: string
}

const navItems: NavItem[] = [
  { to: '/home', icon: House, label: 'Início' },
  { to: '/calendar', icon: CalendarFold, label: 'Calendário' },
  { to: '/stats', icon: ChartNoAxesCombined, label: 'Estatísticas' },
  { to: '/settings', icon: Settings, label: 'Configurações' },
]

export function Menu() {
  const router = useRouterState()
  const currentPath = router.location.pathname

  return (
    <div className="mt-auto flex flex-col items-center justify-center gap-4 pt-4 pb-safe">
      <FieldGroup className="w-95">
        <FieldSeparator />
      </FieldGroup>
      <nav
        className="flex flex-row gap-15 backdrop-blur-sm px-4 py-2"
        aria-label="Navegação principal"
      >
        {navItems.map((item) => {
          const isActive = currentPath.startsWith(item.to)
          const Icon = item.icon

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'relative flex flex-col items-center gap-1.5 transition-colors duration-200',
                'hover:scale-110 active:scale-95',
                isActive ? 'text-teal-400' : 'text-stone-500',
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                size={24}
                strokeWidth={isActive ? 2.5 : 2}
                className={cn('transition-all', isActive && 'drop-shadow-sm')}
              />

              <div className="h-1 w-1">
                {isActive && (
                  <motion.div
                    layoutId="active-dot-indicator"
                    className="h-full w-full rounded-full bg-teal-400"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </div>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
