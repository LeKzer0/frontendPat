import MenuOpcoes from "./MenuOpcoes";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Toaster } from "react-hot-toast";

export default function Layout() {
  return (
    <>
      <Toaster position="top-center" />
      <main>
        <MenuOpcoes />
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: 300,
              }}
            >
              <Spinner animation="border" variant="primary" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
