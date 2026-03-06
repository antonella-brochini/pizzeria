import { useMemo, useState } from "react";
import { deleteReview } from "@/redux/slices/reviewsSlice";
import Link from "next/link";

import AddReview from "./AddReview";
import EditReview from "./EditReview";

const Reviews = ({ dispatch, auth, reviews = [], itemId }) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add"); // "add" | "edit"

  const alreadyReviewed = useMemo(
    () => reviews?.find((review) => review.user_id === auth?.id),
    [reviews, auth?.id]
  );

  const openAddOrEdit = () => {
    if (!alreadyReviewed) {
      setMode("add");
    } else {
      setMode("edit");
    }
    setOpen(true);
  };

  const openEdit = () => {
    setMode("edit");
    setOpen(true);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md py-6 px-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-main text-md font-bold capitalize mb-2">
          Customer reviews
        </h3>

        {!!auth?.id ? (
          <button
            onClick={openAddOrEdit}
            className="self-center bg-secondary text-black rounded py-1 px-4 text-md font-main"
            type="button"
          >
            add review
          </button>
        ) : (
          <button
            className="focus:outline-none bg-secondary text-black px-4 rounded py-1 text-md font-main"
            type="button"
          >
            <Link href="/register">login to review</Link>
          </button>
        )}
      </div>

      <div>
        {reviews?.length > 0 ? (
          reviews.map(({ id, user_name, content, user_id, item_id }) => (
            <div className="flex justify-between space-x-6 mb-2" key={id}>
              <div className="overflow-hidden">
                <h4 className="font-main font-bold text-lg mb-1">{user_name}</h4>
                <span className="font-poppins text-md">{content}</span>
              </div>

              {auth?.id === user_id && (
                <div className="flex flex-col justify-between">
                  <button
                    onClick={() => dispatch(deleteReview({ uid: auth?.id, item_id }))}
                    className="focus:outline-none mb-2"
                    type="button"
                  >
                    <img className="w-6 h-4" src="/images/icons/trash.svg" alt="delete" />
                  </button>

                  <button className="focus:outline-none" onClick={openEdit} type="button">
                    <img className="w-6 h-4" src="/images/icons/pen.svg" alt="edit" />
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <h3 className="text-center font-poppins text-xl">
            There are no reviews for this food
          </h3>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            type="button"
            aria-label="Close modal"
          />
          <div className="relative z-10 w-full max-w-md bg-white border border-gray-200 rounded p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-main font-bold">
                {mode === "add" ? "Add Review" : "Edit Review"}
              </h3>
              <button onClick={() => setOpen(false)} type="button">
                ✕
              </button>
            </div>

            {mode === "add" ? (
              <AddReview
                dispatch={dispatch}
                auth={auth}
                itemId={itemId}
           
              />
            ) : (
              <EditReview
                review={alreadyReviewed}
                dispatch={dispatch}
                uid={auth?.id}
                item_id={itemId}
                edit={true}
                onClose={() => setOpen(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;