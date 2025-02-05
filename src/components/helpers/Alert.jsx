import Swal from "sweetalert2";

export const successAlert = (text) => {
    return Swal.fire({
        title: "Good job!",
        text: text,
        icon: "success"
    });
}

export const errorAlert = (text) => {
    return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: text,
        footer: '<a href="#">Why do I have this issue?</a>'
    });
}