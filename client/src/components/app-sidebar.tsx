import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Membre",
      url: "#",
      items: [
        {
          title: "Favoris",
          url: "#",
          isActive: false,
        },
        {
          title: "noté",
          url: "#",
          isActive: false,
        },
        {
          title: "Modification du compte",
          url: "#",
          isActive: false,
        },
      ],
    },
    {
      title: "Admin",
      url: "#",
      items: [
        {
          title: "Gestion Recettes",
          url: "#",
          isActive: false,
        },
        {
          title: "Gestion des Comptes",
          url: "#",
          isActive: false,
        },
        {
          title: "Modification du compte",
          url: "#",
          isActive: false,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = useState("");

  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-primary">Gestion</SidebarHeader>
      <SidebarContent className="bg-primary text-white gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible "
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="bg-secondary group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={activeItem === item.title}
                          onClick={() => setActiveItem(item.title)}
                        >
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
