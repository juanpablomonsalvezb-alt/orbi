import OrbiLogo from '@/components/ui/OrbiLogo'

// Layout para auth — centrado, fondo marfil
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-marfil px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <OrbiLogo size={36} className="text-obsidian" />
        </div>

        {children}

        <p className="text-caption text-center mt-8">
          El agente que orbita tu negocio 24/7
        </p>
      </div>
    </div>
  )
}
