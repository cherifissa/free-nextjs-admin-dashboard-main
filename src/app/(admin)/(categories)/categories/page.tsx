"use client";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import CategoriesTable from "@/components/tables/CategoriesTable";

export default function CategoriesPage() {
  return (
    <div>
    <PageBreadcrumb pageTitle="Catégories" />
    <div className="space-y-6">
      <ComponentCard title="Liste de catégories">
        <CategoriesTable/>
      </ComponentCard>
    </div>
  </div>
  );
}
