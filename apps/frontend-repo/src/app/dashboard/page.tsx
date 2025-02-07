"use client";
import Dashboard from "@/containers/dashboard/Dashboard";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function Page() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}
