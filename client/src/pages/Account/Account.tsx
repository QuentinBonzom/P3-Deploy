import { LoginForm } from "@/components/Connexion/loginForm";
import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbPage } from "@/components/ui/breadcrumb";
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
              <header className="bg-primary flex h-16 items-center gap-2 border-b px-4 justify-between">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="ml-1" />
                  <Breadcrumb>
                    <BreadcrumbPage>
                      dynamique une fois que les composant seont fini
                    </BreadcrumbPage>
                  </Breadcrumb>
                </div>
                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="p-2 rounded-xl bg-primary hidden md:flex"
                >
                  Se déconnecter
                </button>
              </header>
            </SidebarInset>
          </SidebarProvider>
        </section>
      ) : (
        <LoginForm />
      )}
    </>
  );
}

export default Account;
