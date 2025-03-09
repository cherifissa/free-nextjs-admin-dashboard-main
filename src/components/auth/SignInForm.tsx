"use client";
import React, { useState } from "react";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import axios from "axios"; // Importez axios pour les requêtes HTTP
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState(""); // État pour l'email
  const [password, setPassword] = useState(""); // État pour le mot de passe
  const [error, setError] = useState(""); // État pour gérer les erreurs
  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Vérifiez que les champs ne sont pas vides
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      // Envoyer les données à l'API
      const response = await axios.post(
        "/api/auth/signin",
        {
          email,
          password,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.data.role !== "owner") {
        setError("Vous n'êtes pas autorisé à accéder à cette page.");
        return;
      }
      // Si la connexion réussit
      console.log("Connexion réussie:", response.data);
      setError(""); // Réinitialiser l'erreur

      // Rediriger l'utilisateur ou stocker le token d'authentification
      // Par exemple, stocker le token dans le localStorage
      localStorage.setItem("token", response.data.AccessToken);
      // save user data in local storage
      localStorage.setItem("user", JSON.stringify(response.data));

      // Rediriger vers une autre page
      router.push("/");

    } catch (err) {
      // Gérer les erreurs
      console.error("Erreur lors de la connexion:", err);
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Se connecter
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Entrez votre email et votre mot de passe pour vous connecter !
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Champ Email */}
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    placeholder="votremail@gmail.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Champ Mot de passe */}
                <div>
                  <Label>
                    Mot de passe <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Entrez votre mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>

                {/* Case à cocher et lien mot de passe oublié */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Garder ma session active
                    </span>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                {/* Affichage des erreurs */}
                {error && (
                  <div className="text-sm text-red-500">
                    {error}
                  </div>
                )}

                {/* Bouton de soumission */}
                <div>
                  <Button  className="w-full" size="sm">
                    Se connecter
                  </Button>
                </div>
              </div>
            </form>

            {/* Lien vers la page d'inscription */}
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Tu n&apos;as pas de compte ? {""}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}