export function authorization() {
    return !localStorage.getItem("token");
}