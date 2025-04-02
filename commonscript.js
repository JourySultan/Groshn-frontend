document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data;
        });
});

document.addEventListener("DOMContentLoaded", function () {
    // تفعيل زر تسجيل الخروج
    const logoutButton = document.querySelector("aside ul li:last-child");
    logoutButton.addEventListener("click", function () {
        // مسح التوكن من localStorage
        localStorage.removeItem("token");
        // إعادة توجيه المستخدم إلى الصفحة الرئيسية
        window.location.href = "index.html";
    });
});