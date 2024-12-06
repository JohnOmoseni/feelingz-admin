import Button from "@/components/reuseables/CustomButton";
import { subCategoryColumn } from "@/components/table/columns/categoryColumn";
import { subCategoryData } from "@/components/table/columns/tableData";
import { DataTable } from "@/components/table/DataTable";

function CategoryDetails({
  // @ts-ignore
  data,
  setOpenModal,
}: {
  data: any;
  setOpenModal: React.Dispatch<React.SetStateAction<false | "add" | "edit" | "view_subcategory">>;
}) {
  const tableData = subCategoryData;
  return (
    <div className="">
      <DataTable
        columns={subCategoryColumn}
        tableData={tableData || []}
        headerRowStyles="!bg-background-100"
        hidePageCountDropdown={true}
        cellStyles="first:border-1"
      />

      <Button
        title="Add New SubCategory"
        className="mt-5 !w-max mx-auto"
        onClick={() => setOpenModal("edit")}
      />
    </div>
  );
}

export default CategoryDetails;
