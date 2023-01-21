import { reactive } from "vue";

/**
 *  Login that represent wheter a user is logged or not
 * @param isLog false if user is not logged, true otherwise
 */
export const Login = reactive({
  isLog: false,
  changeStateLogin() {
    this.isLog = !this.isLog;
  },
});
