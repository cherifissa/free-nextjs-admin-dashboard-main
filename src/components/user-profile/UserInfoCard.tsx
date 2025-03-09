"use client";
import React, { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [user, setUser] = useState<User | null>(null);

   // Récupérer les données de l'utilisateur depuis le localStorage
    useEffect(() => {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setUser(user);
        }catch (error) {
          console.error("Erreur lors de la lecture des données de l'utilisateur", error);
        }
      }
    }, []);
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Nom
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.name}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                role
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.role}
              </p>
            </div>

            
          </div>
        </div>
      </div>

      
    </div>
  );
}
