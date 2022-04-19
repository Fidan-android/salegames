<template>
    <div class="wrapper">
        <div class="form__wrapper">
            <h1>Создание аккаунта</h1>
            <br>
            <form class="form" @submit="OnRegistration">
                <span class="caption">Фамилия</span>
                <input type="text" name="firstname" class="field" maxlength="50" placeholder="Иванов" required>

                <span class="caption">Имя</span>
                <input type="text" name="name" class="field" maxlength="50" placeholder="Иван" required>

                <span class="caption">Логин</span>
                <input type="text" name="login" class="field" maxlength="50" placeholder="ivanov_ivan" required>

                <span class="caption">Пароль</span>
                <input type="password" name="password" class="field" maxlength="16" placeholder="******" required>

                <span class="caption">Повторите пароль</span>
                <input type="password" name="confirm_password" class="field" maxlength="16" placeholder="******" required>

                <span class="caption">Номер телефона</span>
                <input type="tel" name="phone" class="field" maxlength="16" pattern="[+]{1}[0-9]{11,14}" placeholder="+78002005065" required>

                <input type="submit" class="btn_blue" value="Создать">
                <router-link to="/login" class="btn_grey">Вход в аккаунт</router-link>
            </form>
            <div id="message"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Registration",
    methods: {
        OnRegistration(e) {
            e.preventDefault();
            var route = this.$router;
            if (e.target.password.value === e.target.confirm_password.value) {
                // registration(e.target).then(data => {
                //     console.log(data);
                //     switch(data['code']) {
                //         case "200": {
                //             var message = document.getElementById("message");
                //             message.style.color = "green";
                //             message.style.display = "block";
                //             message.innerHTML = "Аккаунт успешно создан";
                //             setTimeout(() => {
                //                 route.push({path: "/login"}).catch(() => {});
                //                 message.style.display = "none";
                //             }, 3000);
                //             break;
                //         }
                //         default:{
                //             break;
                //         }
                //     }
                // });
            } else {
                var message = document.getElementById("message");
                message.style.color = "red";
                message.style.display = "block";
                message.innerHTML = "Пароли должны совпадать";
                setTimeout(() => {
                    message.style.display = "none";
                }, 3000);
            }
        }
    }
}
</script>