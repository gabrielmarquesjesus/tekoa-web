import { useEffect } from "react";

export default function useInputFocus(){
     useEffect(() => {
        const inputs = document.querySelectorAll("input, textarea");
        inputs.forEach((input) => {
          input.addEventListener("focus", (e) => {
            setTimeout(() => {
              (e.target as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100);
          });
        });
        return () => {
          inputs.forEach((input) => {
            input.removeEventListener("focus", () => { });
          });
        };
      }, []);
}