export default function Footer() {
    return (
        <footer className="w-full border-t py-8 mt-auto">
            <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-4 md:flex-row">
                <p className="text-small text-text-muted">
                    © {new Date().getFullYear()} thisisyello. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
