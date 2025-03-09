"use client";
import React, { useEffect, useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import TextArea from "@/components/form/input/TextArea";
import { useRouter } from "next/navigation";

export default function CreateQuiz() {
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    difficulty: "easy",
    categoryId: "",
    isPublished: false,
    image: null as File | null,
  });

  // Options pour la difficulté
  const difficultyOptions = [
    { value: "easy", label: "Facile" },
    { value: "medium", label: "Moyen" },
    { value: "hard", label: "Difficile" },
  ];

  // Options pour la catégorie
  const categoryOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];

  const handleFileChange = (file: File) => {
    setQuizData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleToggle = (checked: boolean) => {
    setQuizData((prevData) => ({
      ...prevData,
      isPublished: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Valider les données
    if (!quizData.title || !quizData.description || !quizData.categoryId) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Envoyer les données à l'API
    try {
      const formData = new FormData();
      formData.append("title", quizData.title);
      formData.append("description", quizData.description);
      formData.append("difficulty", quizData.difficulty);
      formData.append("categoryId", quizData.categoryId);
      formData.append("isPublished", quizData.isPublished.toString());
      if (quizData.image) {
        formData.append("image", quizData.image);
      }

      const response = await fetch("/api/quizzes", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Échec de la création du quiz.");
      }

      const data = await response.json();
      alert("Quiz créé avec succès !");
      console.log("Quiz créé :", data);
    } catch (error) {
      console.error("Erreur lors de la création du quiz :", error);
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
      <PageBreadcrumb pageTitle="Créer un Quiz" />
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          {/* Titre du quiz */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Titre du quiz
            </label>
            <Input
              type="text"
              name="title"
              value={quizData.title}
              onChange={(e) =>
                setQuizData((prevData) => ({ ...prevData, title: e.target.value }))
              }
              placeholder="Entrez le titre du quiz"
            />
          </div>

          {/* Description du quiz */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description du quiz
            </label>
            <TextArea
              name="description"
              value={quizData.description}
              onChange={(value) =>
                setQuizData((prevData) => ({ ...prevData, description: value }))
              }
              placeholder="Entrez la description du quiz"
              rows={4}
            />
          </div>

          {/* Catégorie du quiz */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Catégorie
            </label>
            <Select
              options={categoryOptions}
              placeholder="Sélectionnez une catégorie"
              onChange={(value) =>
                setQuizData((prevData) => ({ ...prevData, categoryId: value }))
              }
              value={quizData.categoryId}
            />
          </div>

          {/* Difficulté du quiz */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Difficulté
            </label>
            <Select
              options={difficultyOptions}
              placeholder="Sélectionnez la difficulté"
              onChange={(value) =>
                setQuizData((prevData) => ({ ...prevData, difficulty: value }))
              }
              value={quizData.difficulty}
            />
          </div>
          <div className="xl:col-span-2">
            <Button className="w-full">
              Créer le quiz
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}