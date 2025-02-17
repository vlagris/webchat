import React, {useState} from "react";
import {useNavigate} from "react-router";
import {AuthInput} from "@/pages/AuthPage/components/AuthInput";
import {Ripple} from "@/components/Ripple";
import {Checkbox} from "@/pages/AuthPage/components/Checkbox";
import {Button} from "@/components/UI/Button";
import authService from "@/services/authService.ts";
import classes from "../../AuthPage.module.scss";



function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if  (password !== confirmPassword) {
      return;
    }

    setIsLoading(true);
    try {
      await authService.createUser({
        email,
        password,
        username,
        firstName,
      });
      navigate("/")
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit}
    >
      <AuthInput
        title="Ваш username"
        name="username"
        value={username}
        setValue={setUserName}
        required
      />

      <AuthInput
        title="Ваше имя"
        name="name"
        value={firstName}
        setValue={setFirstName}
        required
      />

      <AuthInput
        title="Адрес эл. почты"
        name="emailInput"
        value={email}
        setValue={setEmail}
        required
      />

      <AuthInput
        type={isShowPassword ? "text" : "password"}
        title="Пароль"
        name="password"
        value={password}
        setValue={setPassword}
        required
      />

      <AuthInput
        type={isShowPassword ? "text" : "password"}
        title="Подтвердите пароль"
        name="confPassInput"
        value={confirmPassword}
        setValue={setConfirmPassword}
        required
      />

      <label className={classes.checkbox}>
        <Ripple/>
        <Checkbox
          onChange={(e) => setIsShowPassword(e.target.checked)}
          checked={isShowPassword}
        />
        <span className={classes.checkboxText}>
          Показать пароль
        </span>
      </label>

      <Button
        variant="solid"
        type="submit"
        className={classes.buttonSubmit}
        disabled={isLoading}
      >
        {isLoading? "Загрузка" : "Зарегистрироваться"}
      </Button>

      <Button
        className={classes.link}
        as="RouterLink"
        to={"/signin"}
      >
        Уже есть аккаунт
      </Button>

    </form>
  );
}

export default Signup;