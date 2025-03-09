import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UserTable from "@/components/tables/UserTable";
import ComponentCard from "@/components/common/ComponentCard";

export default function UsersPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Utilisateurs" />
      <div>
      <div className="space-y-6">
        <ComponentCard title="Liste des utilisateurs">
          <UserTable/>
        </ComponentCard>
      </div>
    </div>
    </div>
  );
}
