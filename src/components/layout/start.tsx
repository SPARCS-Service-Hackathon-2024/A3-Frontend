
import { ReactNode } from "react";

export default function Main({ onLoginSuccess }: { onLoginSuccess: () => void}) {
    console.log("Main component is rendered");
    
    const handleLogin = () => {
      console.log("Login button clicked");
      onLoginSuccess();
    };  
    
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <img src={"/bomi/default.gif"} className="h-[300px] mb-8" alt="Login Image"/>
                <button className="btn btn-primary px-4 py-2 rounded-full text-white" onClick={handleLogin}>
                    카카오로 로그인
                </button>
            </div>
        );
    }
  