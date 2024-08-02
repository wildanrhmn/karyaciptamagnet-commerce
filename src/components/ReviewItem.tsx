import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";
import Avatar from "@/shared/Avatar/Avatar";

export interface ReviewItemProps {
  className?: string;
  data?: any;
}

const ReviewItem: FC<ReviewItemProps> = ({
  className = "",
  data,
}) => {
  const image = data.user.image ? JSON.parse(data.user.image) : null;
  return (
    <div
      className={`nc-ReviewItem flex flex-col ${className}`}
      data-nc-id="ReviewItem"
    >
      <div className=" flex space-x-4 ">
        <div className="flex-shrink-0 pt-0.5">
          <Avatar
            sizeClass="h-10 w-10 text-lg"
            radius="rounded-full"
            userName={data.user.name ? data.user.name : data.user.username}
            imgUrl={image ? image.url : null}
          />
        </div>

        <div className="flex-1 flex justify-between">
          <div className="text-sm sm:text-base">
            <span className="block font-semibold">{data.user.name ? data.user.name : data.user.username}</span>
            <span className="block mt-0.5 text-slate-500 dark:text-slate-400 text-sm">
              {data.createdAt.split('T')[0]}
            </span>
          </div>

          <div className="mt-0.5 flex text-yellow-500">
            { Array.from({ length: data.rating }, (_, index) => (
                <StarIcon key={index} className="w-5 h-5" />
            )) }
          </div>
        </div>
      </div>
      <div className="mt-4 prose prose-sm sm:prose dark:prose-invert sm:max-w-2xl">
        <p className="text-slate-600 dark:text-slate-300">{data.review}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
