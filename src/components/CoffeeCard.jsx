import React from "react";
import { AiOutlineEye, AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee, coffees , setCoffees }) => {
  const { _id, name, quantity, supplier, taste, category, details, photo } =
    coffee;
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/coffees/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              const remaining = coffees.filter((cof) => cof._id !== id);
              setCoffees(remaining);
            }
          });
      }
    });
  };
  return (
    <div className="card card-side bg-base-100 shadow-xl p-4">
      <figure className="w-2/5">
        <img className="w-full" src={photo} alt="Movie" />
      </figure>
      <div className="flex justify-between w-full">
        <div>
          <h2 className="card-title">{name}</h2>
          <p>{supplier}</p>
          <p>{details}</p>
        </div>
        <div className=" my-auto">
          <div className="btn-group space-y-2 btn-group-vertical">
            <button className=" border py-1 rounded-lg bg-[#D2B48C]">
              <AiOutlineEye className="text-2xl mx-auto text-white"></AiOutlineEye>
            </button>
            <button className=" border py-1 rounded-lg bg-[#3C393B]">
              <AiOutlineEdit className="text-2xl mx-auto text-white"></AiOutlineEdit>
            </button>
            <button
              onClick={() => handleDelete(_id)}
              className=" border py-1 px-2 rounded-lg bg-[#EA4744]"
            >
              <AiFillDelete className="text-2xl mx-auto text-white"></AiFillDelete>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
