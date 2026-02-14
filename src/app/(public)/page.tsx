import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default async function Home() {
  const session = await authClient.getSession();
  console.log(session);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button variant={"outline"}>Click me</Button>
    </div>
  );
}
