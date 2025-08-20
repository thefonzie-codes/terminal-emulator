import { useState } from "react";
import "./App.css";

type CommandLine = {
  prompt: string;
  input: string;
  output: string;
}

function CommandLine(props: {
  prompt: string;
  input: string;
  output: string;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isCurrent: boolean;
}) {

  const { prompt, input, output, handleKeyDown, isCurrent } = props;
  const [currentInput, setCurrentInput] = useState(input);

  if (isCurrent) {
    return (
      <div className="command-line-container">
        <div className="command-line-input">
          <div className="prompt">{prompt}</div>
          <div className="input">
          <input
            type="text"        
            value={currentInput}
            autoFocus
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        </div>
        <div className="command-line-output">{output}</div>
      </div>
    );
  }
  return (
    <div className="command-line-container">
    <div className="command-line-input">
      <div className="prompt">{prompt}</div>
      <div className="input">{input}</div>
      </div>
      <div className="command-line-output">{output}</div>
    </div>
  )};

function CommandLineHistory(commandLineList: CommandLine[], handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void): React.ReactNode {
  if (commandLineList.length === 0) {
    return <></>;
  }
  return commandLineList.map((commandLine: CommandLine) => {
    const {prompt, input, output} = commandLine;
    const index = commandLineList.indexOf(commandLine);
    return (
    <CommandLine 
      prompt={prompt} 
      key={index}
      input={input} 
      output={output} 
      isCurrent={false}
      handleKeyDown={handleKeyDown} 
    />
    )
  });
}

function Home() {
  const [prompt, setPrompt] = useState("thefonzie-codes@vercel:~$");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [commandLineList, setCommandLineList] = useState<CommandLine[]>([]);

  function getCommand(command: string) {
    switch (command) {
      case "ls":
        return "index.html";
      case "clear":
        setCommandLineList([]);
        return "";
      default:
        return `${command} : Command not found \n`;
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      const newInput = target.value;
      const newOutput = getCommand(newInput);

      setCommandLineList(prev => [...prev, { prompt, input: newInput, output: newOutput }]);
      setInput("");
      setOutput("");
    } };
    
  return (
    <div className="terminal">
      {CommandLineHistory(commandLineList, handleKeyDown)}
      {CommandLine({prompt, input, output, handleKeyDown, isCurrent: true})}
    </div>
  );
}

export default Home;
