import api from "../../api";
import Swal from "sweetalert2";

export function useDeleteData(info, dataID) {
  const deleteData = async (info, dataID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#196e3a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const url = `http://127.0.0.1:8000/api/${info}/soft_delete/${dataID}`;
          const formattedUrl = url.endsWith("/") ? url : `${url}/`;

          const res = await api.put(formattedUrl, {
            is_deleted: "True",
          });
          Swal.fire({
            title: "Deleted!",
            text: `${
              info.charAt(0).toUpperCase() + info.slice(1)
            } has been deleted.`,
            icon: "success",
          }).then((result) => {
            window.location.reload();
          });
        } catch (error) {
          console.error(`Error deleting ${info}:`, error);
        }
      }
    });
  };
  return { deleteData };
}
