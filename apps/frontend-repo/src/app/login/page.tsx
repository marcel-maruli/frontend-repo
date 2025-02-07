"use client"
import SignIn from "@/containers/SignIn";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function Page() {
  return (
    <Provider store={store}>
      <SignIn />
    </Provider>
  );
}
