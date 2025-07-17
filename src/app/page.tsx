import { auth, signOut } from "@/auth";
import { Button } from "@heroui/button";
import { FaRegSmile } from "react-icons/fa";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h1 className="text-3xl">Hello App</h1>
      <h3 className="text-2xl font-semibold">User session data:</h3>
      {session ? (
        <div>
          <pre>
            {JSON.stringify(session, null, 2)}
            <form action={async () => {
              'use server';
              await signOut();
            }}>
                    <Button
                      type="submit"
                      color="primary" 
                      variant="bordered" 
                      startContent={<FaRegSmile size={20} />}
                    >
                      Sign Out
                    </Button>
            </form>
          </pre>
        </div>
      ) : (
        <div>
          Not Signed In
        </div>
      )}
    </div>
  );
}
