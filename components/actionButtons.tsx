// components/ActionButtons.tsx
const ActionButtons = () => (
    <div className="flex gap-2">
        <a
            target="_blank"
            className="inline-flex h-7 md:h-8 items-center rounded-lg bg-foreground px-2.5 md:px-4 text-[10px] md:text-xs font-medium text-background transition-all duration-200 hover:bg-foreground/90 hover:-translate-y-0.5 gap-1 md:gap-1.5 whitespace-nowrap"
            href="/Lua_Resume_v2.pdf"

        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M12 2v6h6" />
    </svg>
            <span className="text-left">Resume</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
            </svg>
        </a>
        <a
            className="inline-flex h-7 md:h-8 items-center rounded-lg border border-border bg-background px-2.5 md:px-4 text-[10px] md:text-xs font-medium transition-all duration-200 hover:bg-muted hover:-translate-y-0.5 gap-1 md:gap-1.5 whitespace-nowrap"
            href="mailto:marklua599@gmail.com"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <span className="text-left">Send Email</span>
        </a>
    </div>
);

export default ActionButtons;
