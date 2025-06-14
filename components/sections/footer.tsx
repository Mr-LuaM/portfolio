export default function Footer() {
  return (
    <footer className="w-full">
      <div className="max-w-4xl mx-auto px-4 py-4 border-t border-border ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Left Side - Copyright */}
        <p className="text-sm   whitespace-nowrap">© 2025 Mark Lua. All rights reserved.</p>

        {/* Right Side - Tech Info */}
        <div className="space-y-1 text-right">
          <p className="text-sm  ">
            Coded from scratch using <span className="font-semibold">Next.js</span>,{" "}
            <span className="font-semibold">Supabase</span>, <span className="font-semibold">AWS S3</span>, and{" "}
            <span className="font-semibold">Tailwind CSS</span>.
          </p>
          <p className="text-sm text-foreground/50">
            Designed with inspiration from <span className="font-semibold">Bryl Lim</span>.
          </p>
        </div>
      </div>
      </div>
    </footer>
  )
}
