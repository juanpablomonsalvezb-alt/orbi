interface LoadingProps {
  texto?: string
}

export default function Loading({ texto }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-6 w-6 border-b border-obsidian" />
      {texto && <p className="text-caption mt-3">{texto}</p>}
    </div>
  )
}
