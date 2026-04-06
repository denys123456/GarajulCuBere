import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { getSession } from "@/lib/auth";

export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/account");
  }

  return (
    <div className="section-shell py-10 pb-24 lg:py-16">
      <AuthForm mode="login" />
    </div>
  );
}
