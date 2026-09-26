import { redirect } from "next/navigation";

// Middleware handles locale detection and redirects for most clients.
// This is a fallback for cases where middleware doesn't fire (e.g. static export).
export default function RootPage() {
  redirect("/en");
}
