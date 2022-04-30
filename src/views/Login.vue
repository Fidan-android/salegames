<template>
  <div class="wrapper" style="height: 80vh;">
        <div class="form__wrapper">
            <h1>Вход в аккаунт</h1>
            <br>
            <form class="form" @submit="onLogin">
                <span class="caption">Логин</span>
                <input type="text" name="login" placeholder="E-mail" class="field" maxlength="50" required>

                <span class="caption">Пароль</span>
                <input type="password" name="password" placeholder="Password" class="field" maxlength="16" required>

                <input type="submit" class="btn_blue" value="Войти">
                <router-link to="/registration" class="btn_grey">Регистрация</router-link>
            </form>
            <div id="message"></div>
        </div>
    </div>
</template>


<script>
import { login } from "@/helpers/axios.js";
export default {
    name: 'Login',
    methods: {
        onLogin(e) {
            e.preventDefault();
            login(e.target)
                .then(res => res.data)
                .then(data => {
                    var message = document.getElementById("message");
                    if (data['code'] == 401) {
                        message.style.color = "red";
                        message.style.display = "block";
                        message.innerHTML = "Вы ввели неверный логин или пароль";
                        setTimeout(() => {
                            message.style.display = "none";
                        }, 3000);
                        return;
                    }
                    
                    localStorage.setItem("access_token", data['token']);
                    // this.$router.push("/").catch(() => {});
                    this.$router.go("/");
                });
        }
    }
}
</script>