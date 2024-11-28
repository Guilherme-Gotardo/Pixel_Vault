function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var login = document.getElementById("areaLogin");

    if (email != null && nome != null) {
        
        login.innerHTML = '<a class="nav-link"  href="./user.html"> Área usuário </a>'

    } else {

        login.innerHTML = '<a class="nav-link"  href="./login.html"> Login </a>'

    }
}
