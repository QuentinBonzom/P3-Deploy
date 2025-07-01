import MemberManage from "@/components/Admin/Member.tsx";
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
import { useUser } from "@/context/UserContext.tsx";
import EditMemberForm from "@/pages/Account/EditMemberForm.tsx";
import FavoriteMemberList from "@/pages/Account/FavoriteMemberList";
import { ChevronRight } from "lucide-react";
import { type ComponentType, useState } from "react";
import CreateRecipe from "./Admin/Add_Recipe.tsx";

//Import des section (components)

interface SectionType {
  title: string;
  isAdmin: boolean;
  items: {
    title: string;
    Component: ComponentType;
    isActive: boolean;
  }[];
}

// This is sample data.
const Data: SectionType[] = [
  {
    title: "Membre",
    isAdmin: false,
    items: [
      { title: "Favoris", Component: FavoriteMemberList, isActive: false },

      // { title: "Noté",
      //   Component: RatedList,
      //   isActive: false },

      {
        title: "Modifier mon compte",
        Component: EditMemberForm,
        isActive: false,
      },
    ],
  },
  {
    title: "Admin",
    isAdmin: true,
    items: [
      { title: "Gestion Recettes", Component: CreateRecipe, isActive: false },

      { title: "Gestion Comptes", Component: MemberManage, isActive: false },

      // { title: "Gestion des Commentaires",
      //   Component: RatedList,
      //    isActive: false },
    ],
  },
];

export interface AppSidebarProps {
  onSelect: (title: string, Component: ComponentType) => void;
}

export function AppSidebar({ onSelect, ...props }: AppSidebarProps) {
  const { isAdmin, isConnected } = useUser();
  // apparition du composant actif dans le sidebar
  const [activeItem, setActiveItem] = useState("");

  const sections = Data.filter(
    (section) =>
      isConnected &&
      (section.title === "Membre" || (section.title === "Admin" && isAdmin)),
  );

  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-primary">Gestion</SidebarHeader>
      <SidebarContent className="bg-primary text-white gap-0">
        {sections.map((section) => (
          <Collapsible
            key={section.title}
            // title={section.title}
            defaultOpen
            className="group/collapsible "
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="bg-secondary group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  {section.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={activeItem === item.title}
                          onClick={() => {
                            setActiveItem(item.title);
                            onSelect(item.title, item.Component);
                          }}
                        >
                          <p className="cursor-pointer">{item.title}</p>
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
