import { editReview } from "@/redux/slices/reviewsSlice";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const EditReview = ({
  dispatch,
  uid,
  item_id,
  review,
  edit = false,
  onClose,
}) => {
  const [showInput, setShowInput] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = ({ reviewContent }) => {
    dispatch(editReview({ uid, content: reviewContent, item_id }));
    onClose?.();
  };

  return (
    <div className="p-4 text-center">
      {!edit && (
        <h2 className="text-red-400 font-main">You already added a review</h2>
      )}

      <p className="text-poppins text-xl">Your review : &quot;{review.content}&quot;</p>

      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Write review"
          {...register("reviewContent")}
          className={`${
            showInput ? "block" : "hidden"
          } p-2 bg-gray-50 border border-gray-300 text-gray-700 text-md font-poppins`}
        />

        <div className="text-center">
          {showInput && (
            <button
              className="focus:outline-none bg-primary text-white px-4 py-2 rounded"
              type="submit"
            >
              Submit
            </button>
          )}
        </div>
      </form>

      <div className="flex justify-between">
        {!showInput && (
          <button
            className="focus:outline-none bg-primary text-white px-4 py-2 rounded"
            onClick={() => setShowInput(true)}
            type="button"
          >
            Edit
          </button>
        )}

        <button
          className="focus:outline-none bg-black text-white px-4 py-2 rounded"
          onClick={() => onClose?.()}
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditReview;