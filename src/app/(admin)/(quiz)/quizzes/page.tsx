import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import QuizzTable from "@/components/tables/QuizzTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Basic Table | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function QuizzesTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Quizz" />
      <div className="space-y-6">
        <ComponentCard title="Liste de quizzes">
          <QuizzTable/>
        </ComponentCard>
      </div>
    </div>
  );
}
