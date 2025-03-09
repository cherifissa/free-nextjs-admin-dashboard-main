"use client"; // Assurez-vous que ce composant est exécuté côté client
import React from "react";
import { useRouter } from "next/navigation"; // Importez useRouter pour la redirection

export default function SidebarWidget() {
  const router = useRouter(); // Initialisez useRouter

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    // Supprimez le token et les données de l'utilisateur du localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirigez l'utilisateur vers la page de connexion
    router.push("/signin");
  };

  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]`}
    >
      {/* Bouton de déconnexion */}
      <button
        onClick={handleLogout} // Appel de la fonction handleLogout au clic
        className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-red-500 text-theme-sm hover:bg-red-600 w-full"
      >
        Se déconnecter
      </button>
    </div>
  );
}