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
export default {
    name: 'Login',
    methods: {
        onLogin(e) {
            e.preventDefault();
            // login(e.target).then(data => {
            //     console.log(data);
            //     switch(data['code']) {
            //         case "200": {
            //             localStorage.setItem("token", data['token']);
            //             this.$router.push("/").catch(() => {}); 
            //             break;
            //         }
            //         case "67": {
            //             var message = document.getElementById("message");
            //             message.style.color = "red";
            //             message.style.display = "block";
            //             message.innerHTML = data['message'];
            //             setTimeout(() => {
            //                 message.style.display = "none";
            //             }, 3000);
            //             break;
            //         }
            //         case "401": {
            //             var message = document.getElementById("message");
            //             message.style.color = "red";
            //             message.style.display = "block";
            //             message.innerHTML = data['message'];
            //             setTimeout(() => {
            //                 message.style.display = "none";
            //             }, 3000);
            //             break;
            //         }
            //         case "89": {
            //             var message = document.getElementById("message");
            //             message.style.color = "red";
            //             message.style.display = "block";
            //             message.innerHTML = data['message'];
            //             setTimeout(() => {
            //                 message.style.display = "none";
            //             }, 3000);
            //             break;
            //         }
            //         default: {
            //             console.log(data['message']);
            //             break;
            //         }
            //     }
            // });
        }
    }
}
</script>