import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

const AccountPageLoading = () => {
  return (
    <div className={`nc-AccountPage animate-pulse`}>
      <div className="space-y-10 sm:space-y-12">
        <h2 className="text-2xl sm:text-3xl font-semibold bg-gray-300 h-8 w-48 rounded"></h2>
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 flex items-start">
            <div className="relative rounded-full overflow-hidden flex">
              <div className="w-32 h-32 rounded-full bg-gray-300"></div>
            </div>
          </div>
          <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
            {[...Array(7)].map((_, index) => (
              <div key={index}>
                <div className="h-5 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-10 bg-gray-300 rounded w-full"></div>
              </div>
            ))}
            <div className="pt-2">
              <ButtonPrimary className="opacity-50 cursor-not-allowed">
                Update Akun
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPageLoading;