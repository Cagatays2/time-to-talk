import { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import TalkScreen from "./components/TalkScreen";

type Screen = "home" | "talk";

function App() {
  const [screen, setScreen] = useState<Screen>("home");

  return (
    <main className="min-h-svh bg-slate-50 text-slate-950">
      {screen === "home" ? (
        <HomeScreen onStart={() => setScreen("talk")} />
      ) : (
        <TalkScreen onBack={() => setScreen("home")} />
      )}
    </main>
  );
}

export default App;
