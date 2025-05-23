import { useState } from "react";
import "./App.css";

const App = () => {
  const carregarDados = () => {
    const dadosSalvos = localStorage.getItem("times");
    if (dadosSalvos) {
      return JSON.parse(dadosSalvos);
    }
    return [
      { nome: "Time 1", tentos: 0, pontos: 0 },
      { nome: "Time 2", tentos: 0, pontos: 0 },
    ];
  };

  const [times, setTimes] = useState(carregarDados);

  const atualizarTime = (index, tipo) => {
    setTimes((prev) => {
      let novosTimes = prev.map((time, i) => {
        let novosTentos = time.tentos;
        if (i === index) {
          if (tipo === "adicionar") novosTentos++;
          if (tipo === "subtrair" && time.tentos > 0) novosTentos--;
          if (tipo === "truco") novosTentos += 3;
        }
  
        return { ...time, tentos: novosTentos };
      });
  
      // Verifica se algum time atingiu 12 tentos
      const timeVencedorIndex = novosTimes.findIndex((time) => time.tentos >= 12);
      if (timeVencedorIndex !== -1) {
        novosTimes = novosTimes.map((time, i) => ({
          ...time,
          tentos: 0,
          pontos: i === timeVencedorIndex ? time.pontos + 1 : time.pontos,
        }));
      }
  
      localStorage.setItem("times", JSON.stringify(novosTimes));
      return novosTimes;
    });
  };

  const resetarJogo = () => {
    const novosTimes = [
      { nome: "Time 1", tentos: 0, pontos: 0 },
      { nome: "Time 2", tentos: 0, pontos: 0 },
    ];
    setTimes(novosTimes);
    localStorage.setItem("times", JSON.stringify(novosTimes));
  };

  return (
    <div className="app-container">
      <h1 className="header">Contador de Tentos - Truco</h1>

      {times.map((time, index) => (
        <div key={index} className="team">
          <h2 className="team-header">
  {time.nome}: <span className="scoreTentos">{time.tentos}</span> tentos | Pontos: <span className="scorePontos">{time.pontos}</span>
</h2>
          <div className="buttons">
            <button
              className="button add"
              onClick={() => atualizarTime(index, "adicionar")}
            >
              +
            </button>
            <button
              className="button subtract"
              onClick={() => atualizarTime(index, "subtrair")}
            >
              -
            </button>
            <button
              className="button truco"
              onClick={() => atualizarTime(index, "truco")}
            >
              Truco (+3)
            </button>
          </div>
        </div>
      ))}

      <div>
      <button className="reset-button" onClick={resetarJogo}>
  <i className="fas fa-sync-alt"></i> Resetar Jogo
</button>
      </div>
    </div>
  );
};

export default App;
