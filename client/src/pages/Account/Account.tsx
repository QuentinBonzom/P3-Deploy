import { LoginForm } from "@/components/Connexion/loginForm";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  // BreadcrumbItem,
  // BreadcrumbLink,
  // BreadcrumbList,
  BreadcrumbPage,
  // BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";

function Account() {
  const { isConnected, handleDisconnect } = useUser();

  return (
    <>
      {isConnected ? (
        <section>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="bg-primary flex h-16 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
                <Breadcrumb>
                  {/* <BreadcrumbList> */}
                  {/* <BreadcrumbItem className="hidden md:block "></BreadcrumbItem> */}
                  {/* <BreadcrumbSeparator className="hidden md:block " /> */}
                  {/* <BreadcrumbItem> */}
                  <BreadcrumbPage>
                    dynamique une fois que les composant seont fini
                  </BreadcrumbPage>
                  {/* </BreadcrumbItem> */}
                  {/* </BreadcrumbList> */}
                </Breadcrumb>
              </header>
              <main className=" bg-primary flex flex-1 flex-col gap-4 p-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <article
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={index}
                    className="text-white bg-black h-15 w-full rounded-lg"
                  />
                ))}
              </main>
            </SidebarInset>
          </SidebarProvider>

          <button
            onClick={() => handleDisconnect()}
            className="p-2 rounded-xl bg-primary"
            type="button"
          >
            Se déconnecter
          </button>
        </section>
      ) : (
        <LoginForm />
      )}
    </>
  );
}

export default Account;
