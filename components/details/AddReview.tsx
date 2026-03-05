import { generateId, serverTimestamp } from "@/lib/utils";
import { addReview } from "@/redux/slices/reviewsSlice";
import { useForm } from "react-hook-form";
type DialogLike = {
  close: (result?: any) => void;
};

type AddReviewProps = {
  dispatch: any;
  auth: any;
  itemId: any;
  dialog?: DialogLike; // ✅ opcional para que no moleste el IDE
};



const AddReview = ({ dispatch, auth, itemId, dialog }: AddReviewProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ review: string }>();

  const onSubmit = ({ review }) => {
    const id = generateId();

    const user_review = {
      content: review,
      user_id: auth.id,
      item_id: itemId,
      createdAt: serverTimestamp(),
      user_name: auth.user_name,
      id,
    };

    dispatch(addReview({ uid: auth.id, review: user_review, item_id: itemId }));

    // ✅ cierra el modal
    if (dialog?.close) dialog.close(true);
  };

  return (
    <div className="p-4">
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("review", {
            required: { value: true, message: "this field is required" },
            maxLength: { value: 130, message: "Your review can't be more then 130 characters" },
            minLength: { value: 5, message: "Your review can't be less than 5 characters" },
          })}
          className="p-2 bg-gray-50 border border-t-0 border-r-0 border-l-0 text-gray-700 text-md font-poppins"
        />
        <span className="text-red-300 text-sm font-main">
        
        </span>
        <button className="bg-primary text-white px-4 py-2 self-center rounded" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;