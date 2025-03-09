"use client";
import React, { useEffect, useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";

export default function CreateUser() {
  const router = useRouter();
  
    useEffect(() => {
      // Check if the user is authenticated
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
  
      if (!token || !user) {
        // Redirect to sign-in page if not authenticated
        router.push("/signin");
      }
    }, [router]);
    
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "owner", // Par défaut, le rôle est "user"
    password: "admin123",
    isActive: false, // Ajout d'un état pour activer/désactiver l'utilisateur
  });

  // Options pour le rôle
  const roleOptions = [
    { value: "user", label: "Utilisateur" },
    { value: "admin", label: "Administrateur" },
    { value: "moderator", label: "Modérateur" },
  ];

  const handleToggle = (checked: boolean) => {
    setUserData((prevData) => ({
      ...prevData,
      isActive: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Valider les données
    if (!userData.name || !userData.email) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Envoyer les données à l'API
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Échec de la création de l'utilisateur.");
      }

      const data = await response.json();
      alert("Utilisateur créé avec succès !");
      console.log("Utilisateur créé :", data);
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Créer un Utilisateur" />
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          {/* Nom de l'utilisateur */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nom
            </label>
            <Input
              type="text"
              name="name"
              value={userData.name}
              onChange={(e) =>
                setUserData((prevData) => ({ ...prevData, name: e.target.value }))
              }
              placeholder="Entrez le nom de l'utilisateur"
            />
          </div>

          {/* Email de l'utilisateur */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={userData.email}
              onChange={(e) =>
                setUserData((prevData) => ({ ...prevData, email: e.target.value }))
              }
              placeholder="Entrez l'email de l'utilisateur"
            />
          </div>

          {/* Rôle de l'utilisateur */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Rôle
            </label>
            <Select
              options={roleOptions}
              placeholder="Sélectionnez un rôle"
              onChange={(value) =>
                setUserData((prevData) => ({ ...prevData, role: value }))
              }
            />
          </div>  

          {/* Bouton de soumission */}
          <div className="xl:col-span-2">
            <Button className="w-full">
              Créer l'utilisateur
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}