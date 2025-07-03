import { type RefObject, useEffect } from "react";
// type pour les evenements Mouse | touch natif TypeScript
type EventType = MouseEvent | TouchEvent;
// Hook pour détecter les clics en dehors d'un élément
export function useClickOutside<Type extends HTMLElement>(
  ref: RefObject<Type | null>,
  handler: (event: EventType) => void,
) {
  useEffect(() => {
    // Vérifie si la référence est définie et si le gestionnaire est une fonction
    const listener = (event: EventType) => {
      // Ignore les événements si le composant est désactivé
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      // Appelle l'event de clics en dehors
      handler(event);
    };

    // Ajoute les Listener d'événements pour les clics de souris et touches
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      // Remove les écouteurs d'événements pour éviter le debordement de memoire du Navigateur
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
