import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import DragAndDrop from "@/components/DragAndDrop.jsx";
import MainPromptWrapper from "@/components/MainPromptWrapper.jsx";
import OutputWrapper from "@/components/OutputWrapper.jsx";
import {ParticlesBg} from "@/components/ParticlesBg.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <MainPromptWrapper/>
          {/*<ParticlesBg></ParticlesBg>*/}
          {/*<div className="relative z-10">*/}
          {/*    <MainPromptWrapper/>*/}
          {/*    /!* <OutputWrapper /> *!/*/}
          {/*</div>*/}
      </ThemeProvider>
  )
}

export default App
