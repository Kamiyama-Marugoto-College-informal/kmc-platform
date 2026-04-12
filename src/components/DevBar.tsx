export default function DevBar() {
  if (!import.meta.env.DEV) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-center p-0.5 bg-blue-700 text-white shadow">
      Development
    </div>
  )
}
