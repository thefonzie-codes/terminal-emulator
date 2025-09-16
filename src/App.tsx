import { useState } from "react";
import "./App.css";

type CommandLine = {
  prompt: string;
  input: string;
  output: string;
  isCurrent: boolean;
  setInput?: React.Dispatch<React.SetStateAction<string>>;
}

function CommandLine(props: {
  prompt: string;
  input: string;
  setInput?: React.Dispatch<React.SetStateAction<string>>;
  output: string;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isCurrent: boolean;
}) {

  const { prompt, input, setInput, output, handleKeyDown, isCurrent } = props;

  if (isCurrent === true) {
    return (
      <div className="command-line-container">
        <div className="command-line-input">
          <div className="prompt">{prompt}</div>
          <div className="input">
            <input
              type="text"
              value={input}
              autoFocus
              onChange={(e) => setInput?.(e.target.value)}
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
  )
};

function CommandLineHistory(commandLineList: CommandLine[], handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void): React.ReactNode {
  if (commandLineList.length === 0) {
    return <></>;
  }
  return commandLineList.map((commandLine: CommandLine) => {
    const { prompt, input, output, setInput } = commandLine;
    const index = commandLineList.indexOf(commandLine);
    return (
      <CommandLine
        prompt={prompt}
        key={index}
        input={input}
        output={output}
        isCurrent={false}
        handleKeyDown={handleKeyDown}
        setInput={setInput}
      />
    )
  });
}

function Home() {
  const [prompt, setPrompt] = useState("thefonzie-codes@web:~$");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [commandLineList, setCommandLineList] = useState<CommandLine[]>([]);


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {


      switch (input) {
        case "ls":
          setOutput("index.html");
          setCommandLineList(prev => [...prev, { prompt, input, output: "index.html", isCurrent: false }]);
          setInput("");
          break;
        case "clear":
          setCommandLineList([]);
          break;
        case "pwd":
          setOutput("/home/thefonzie-codes");
          setCommandLineList(prev => [...prev, { prompt, input, output: "/home/thefonzie-codes", isCurrent: false }]);
          break;
        case "help":
          setOutput("Available commands: ls, pwd, clear, help");
          setCommandLineList(prev => [...prev, { prompt, input, output: "Available commands: ls, pwd, clear, help", isCurrent: false }]);
          break;
        default:
          setOutput(`${input} : Command not found \n`);
          setCommandLineList(prev => [...prev, { prompt, input, output: `${input} : Command not found \n`, isCurrent: false }]);
      }

      setInput("");
      setOutput("");
    }
  };

  return (
    <div className="terminal">
      {CommandLineHistory(commandLineList, handleKeyDown)}
      {CommandLine({ prompt, input, setInput: setInput, output, handleKeyDown, isCurrent: true })}
    </div>
  );
}

export default Home;
