import React, { FC, useCallback } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import NcModal from "@/shared/NcModal/NcModal";
import { deleteProduct } from "../data/action";
import { toast } from "react-hot-toast";

export interface ModalDeleteProps {
  show: boolean;
  onCloseModalDelete: () => void;
  productId: string;
}

const ModalDelete: FC<ModalDeleteProps> = ({ show, onCloseModalDelete, productId }) => {
  const handleClickSubmitForm = useCallback(async () => {
    try {
      const result = await deleteProduct(productId);
      if (result.message) {
        toast.success(result.message);
        onCloseModalDelete();
      } else {
        throw new Error("No message returned from server");
      }
    } catch (error) {
      toast.error(
        "Failed to delete product: " +
          (error instanceof Error ? error.message : String(error))
      );
    }
  }, [productId, onCloseModalDelete]);

  const renderContent = () => {
    return (
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Delete Product
        </h3>
        <span className="text-sm">
          Are you sure you want to delete this Product? You cannot undo this action.
        </span>
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={handleClickSubmitForm} type="button">
            Delete
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalDelete}>
            Cancel
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalDelete}
      contentExtraClass="max-w-screen-sm"
      renderContent={renderContent}
      modalTitle=""
    />
  );
};

export default ModalDelete;