interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white border border-humo/50 rounded-[12px] px-6 py-5 ${className}`}>
      {children}
    </div>
  )
}
