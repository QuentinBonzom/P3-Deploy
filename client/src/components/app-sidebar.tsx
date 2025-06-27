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
import EditMemberForm from "@/pages/Account/Edit_Member_Form";
import FavoriteMemberList from "@/pages/Account/FavoriteMemberList";
import { ChevronRight } from "lucide-react";
import { type ComponentType, useState } from "react";

//Import des section (components)

interface SectionType {
  title: string;
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
    items: [
      // { title: "Gestion Recettes",
      //   Component: RecipeAdmin,
      //   isActive: false },
      // { title: "Gestion Comptes",
      //    Component: AccountAdmin,
      //    isActive: false },
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
  // apparition du composant actif dans le sidebar
  const [activeItem, setActiveItem] = useState("");
  // apparition du composant actif du contenu du sidebar
  // const [ActiveComponent ,setActiveComponent]=useState<ComponentType | null>(null)

  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-primary">Gestion</SidebarHeader>
      <SidebarContent className="bg-primary text-white gap-0">
        {/* creation des sections dynamique du sidebar  */}
        {Data.map((section) => (
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
