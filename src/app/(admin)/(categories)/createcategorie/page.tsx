"use client";
import React, { useEffect, useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";

export default function CreateCategory() {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Valider les données
    if (!categoryData.name || !categoryData.description) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Envoyer les données à l'API
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error("Échec de la création de la catégorie.");
      }

      const data = await response.json();
      alert("Catégorie créée avec succès !");
      console.log("Catégorie créée :", data);

      // Réinitialiser le formulaire
      setCategoryData({
        name: "",
        description: "",
      });
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie :", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

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

  return (
    <div>
      <PageBreadcrumb pageTitle="Créer une Catégorie" />
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom de la catégorie */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nom de la catégorie
          </label>
          <Input
            type="text"
            name="name"
            value={categoryData.name}
            onChange={(e) =>
              setCategoryData((prevData) => ({ ...prevData, name: e.target.value }))
            }
            placeholder="Entrez le nom de la catégorie"
          />
        </div>

        {/* Description de la catégorie */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <Input
            type="text"
            name="description"
            value={categoryData.description}
            onChange={(e) =>
              setCategoryData((prevData) => ({ ...prevData, description: e.target.value }))
            }
            placeholder="Entrez la description de la catégorie"
          />
        </div>

        {/* Bouton de soumission */}
        <div>
          <Button className="w-full">
            Créer la catégorie
          </Button>
        </div>
      </form>
    </div>
  );
}