export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#f86c05] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#f86c05] font-semibold text-lg">Carregando planos...</p>
      </div>
    </div>
  )
}
