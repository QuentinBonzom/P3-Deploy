import { useLocation } from "react-router";

const bannerItems: Record<string, string> = {
  "/": "/banner_shopping_list.jpg",
  "/Recettes": "banner_recipe.jpeg",
  "/Courses": "banner_shopping_list.jpg",
  "/Compte": "banner_member.jpg",
  "/Mentions_legales": "banner_legal.jpg",
  "/A_propos": "banner_legal.jpg",
  "/Mixer": "banner_mixer.jpg",
  "/Admin": "banner_admin.jpg",
  "/Contact": "banner_contact.jpg",
};

function Banner() {
  const location = useLocation();
  const bannerImg = bannerItems[location.pathname];
  return (
    <img
      src={bannerImg}
      alt="Banner"
      className="object-cover w-full h-45 md:h-60 object-center"
    />
  );
}

export default Banner;
