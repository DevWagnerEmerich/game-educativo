class RodaARodaGame {
  constructor() {
    this.userDatabase = [];
    this.currentTheme = null;
    this.currentWord = "";
    this.currentHint = "";
    this.startPosition = 0;
    this.usedWords = [];
    this.currentPlayer = 1;
    this.nextStartingPlayer = 1;
    this.scores = [0, 0, 0];
    this.currentPrize = 0;
    this.soundEnabled = true;
    this.currentRotation = 0;
    this.isSpinning = false;
    this.gameState = "selectingTheme";
    this.gameTitle = "Roda a Roda";
    this.timerActive = false;
    this.countdownInterval = null;
    this.countdownTime = 10;
    this.customLogo = null;

    this.gridContainer = document.getElementById("grid-container");
    this.gridItems = document.querySelectorAll("#grid-container .grid-item");
    this.hintText = document.getElementById("hint-text");
    this.themeSelector = document.getElementById("theme");
    this.scoreElements = [
      document.getElementById("score-1"),
      document.getElementById("score-2"),
      document.getElementById("score-3")
    ];
    this.scoreValueElements = [
      document.querySelector("#score-1 .score-value"),
      document.querySelector("#score-2 .score-value"),
      document.querySelector("#score-3 .score-value")
    ];
    this.spinButton = document.getElementById("spin-button");
    this.roleta = document.getElementById("roleta");
    this.soundToggle = document.getElementById("sound-toggle");
    this.spinSound = document.getElementById("spin-sound");
    this.winSound = document.getElementById("win-sound");
    this.loseSound = document.getElementById("lose-sound");
    this.letterSound = document.getElementById("letter-sound");
    this.letterRevealSound = document.getElementById("letter-reveal-sound");
    this.blockRevealSound = document.getElementById("block-reveal-sound");
    this.letterShowSound = document.getElementById("letter-show-sound");
    this.statusIndicator = document.getElementById("status-indicator");
    this.csvUpload = document.getElementById('csv-upload');
    this.loadCsvBtn = document.getElementById('load-csv');
    this.logoUpload = document.getElementById('logo-upload');
    this.loadLogoBtn = document.getElementById('load-logo');
    this.configModal = document.getElementById('config-modal');
    this.configButton = document.getElementById('config-button');
    this.startGameBtn = document.getElementById('start-game');
    this.themeChangeModal = document.getElementById('theme-change-modal');
    this.themeChangeSelect = document.getElementById('theme-change-select');
    this.cancelThemeChangeBtn = document.getElementById('cancel-theme-change');
    this.confirmThemeChangeBtn = document.getElementById('confirm-theme-change');
    this.revealButton = document.getElementById("reveal-button");
    this.passButton = document.getElementById("pass-button");
    this.revealSound = document.getElementById("reveal-sound");
    this.passSound = document.getElementById("pass-sound");
    this.loseAllSound = document.getElementById("lose-all-sound");
    this.passTurnSound = document.getElementById("pass-turn-sound");
    this.tituloRoleta = document.getElementById("titulo-roleta");
    this.gameTitleInput = document.getElementById("game-title");
    this.timerButton = document.getElementById("timer-button");
    this.countdownTimerDisplay = document.getElementById("countdown-timer");
    this.logoSpace = document.getElementById("logo-space");
    this.timerSound = document.getElementById("timer-sound");
    this.loginContainer = document.getElementById("login-container");
    this.passwordInput = document.getElementById("password");
    this.validatePasswordButton = document.getElementById("validate-password");

    this.WHEEL_SECTIONS = [
      { startAngle: 0, endAngle: 15, value: 550, type: "money", text: "R$550" },
      { startAngle: 15, endAngle: 30, value: 900, type: "money", text: "R$900" },
      { startAngle: 30, endAngle: 45, value: 450, type: "money", text: "R$450" },
      { startAngle: 45, endAngle: 60, value: 100, type: "money", text: "R$100" },
      { startAngle: 60, endAngle: 75, value: 750, type: "money", text: "R$750" },
      { startAngle: 75, endAngle: 90, value: "passou", type: "pass", text: "Passou a Vez" },
      { startAngle: 90, endAngle: 105, value: 950, type: "money", text: "R$950" },
      { startAngle: 105, endAngle: 120, value: 200, type: "money", text: "R$200" },
      { startAngle: 120, endAngle: 135, value: 350, type: "money", text: "R$350" },
      { startAngle: 135, endAngle: 150, value: 700, type: "money", text: "R$700" },
      { startAngle: 150, endAngle: 165, value: 250, type: "money", text: "R$250" },
      { startAngle: 165, endAngle: 180, value: "passou", type: "pass", text: "Passou a Vez" },
      { startAngle: 180, endAngle: 195, value: 600, type: "money", text: "R$600" },
      { startAngle: 195, endAngle: 210, value: 850, type: "money", text: "R$850" },
      { startAngle: 210, endAngle: 225, value: 500, type: "money", text: "R$500" },
      { startAngle: 225, endAngle: 240, value: 50, type: "money", text: "R$50" },
      { startAngle: 240, endAngle: 255, value: 800, type: "money", text: "R$800" },
      { startAngle: 255, endAngle: 270, value: 0, type: "lose", text: "Perdeu Tudo" },
      { startAngle: 270, endAngle: 285, value: 1000, type: "money", text: "R$1000" },
      { startAngle: 285, endAngle: 300, value: 150, type: "money", text: "R$150" },
      { startAngle: 300, endAngle: 315, value: 400, type: "money", text: "R$400" },
      { startAngle: 315, endAngle: 330, value: 650, type: "money", text: "R$650" },
      { startAngle: 330, endAngle: 345, value: 300, type: "money", text: "R$300" },
      { startAngle: 345, endAngle: 360, value: "passou", type: "pass", text: "Passou a Vez" }
    ];

    this.initEvents();
    this.initializeGrid();
    this.updateStatusIndicator();
    this.updateScores();
    this.checkLogin(); // Verifica o login e decide se mostra a tela de login ou não
  }

  checkLogin() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.loginContainer.style.display = "none";
      this.initGameConfig();
    } else {
      this.setupLogin();
    }
  }

  setupLogin() {
    this.validatePasswordButton.addEventListener("click", () => {
      const password = this.passwordInput.value;
      if (password === "EeP!&c2k25") {
        localStorage.setItem('isLoggedIn', 'true'); // Salva que o login foi feito
        this.loginContainer.style.display = "none";
        this.initGameConfig();
      } else {
        this.showToast("Senha incorreta. Tente novamente.", "error");
        this.passwordInput.value = "";
      }
    });
  }

  initGameConfig() {
    this.configButton.addEventListener("click", () => {
      this.configModal.style.display = "flex";
    });

    const closeConfigModalButton = document.getElementById('close-config-modal');
    closeConfigModalButton.addEventListener('click', () => {
      this.configModal.style.display = "none";
    });

    this.csvUpload.addEventListener("change", (event) => this.handleFileUpload(event));

    this.loadCsvBtn.addEventListener("click", () => {
      this.csvUpload.click();
    });

    this.loadLogoBtn.addEventListener("click", () => {
      this.logoUpload.click();
    });

    this.logoUpload.addEventListener("change", (event) => this.handleLogoUpload(event));

    this.themeSelector.addEventListener("change", () => {
      this.startGameBtn.disabled = this.themeSelector.value === "";
    });

    this.startGameBtn.addEventListener("click", () => {
      if (this.userDatabase.length === 0) {
        this.showToast("Carregue uma planilha antes de iniciar o jogo.", "error");
        return;
      }
      this.gameTitle = this.gameTitleInput.value || "Roda a Roda";
      this.tituloRoleta.textContent = this.gameTitle;
      this.configModal.style.display = "none";
      this.startGame();
    });
  }

  clearGameData() {
    localStorage.removeItem('rodaARoda');
  }

  initEvents() {
    document.getElementById("alphabet").addEventListener("click", (event) => {
      if (event.target.classList.contains("alphabet-letter")) {
        const letter = event.target.getAttribute("data-letter");
        this.checkLetter(letter);
      }
    });

    this.spinButton.addEventListener("click", () => this.spinWheel());

    this.soundToggle.addEventListener("click", () => {
      this.soundEnabled = !this.soundEnabled;
      this.soundToggle.textContent = this.soundEnabled ? "🔊" : "🔇";
    });

    this.revealButton.addEventListener("click", () => {
      if (this.revealButton.disabled) return;
      this.playSound(this.revealSound);
      this.revealButton.disabled = true;
      this.revealAllLetters();
    });

    this.passButton.addEventListener("click", () => {
      this.playSound(this.passSound);
      this.currentPlayer = (this.currentPlayer % 3) + 1;
      this.setActivePlayer(this.currentPlayer);
      this.gameState = "spinningWheel";
      this.updateStatusIndicator();
      this.spinButton.disabled = false;
      this.updateRevealButton();
    });

    this.loadGame();

    this.timerButton.addEventListener("click", () => this.startTimer());

    this.logoSpace.addEventListener("click", () => {
      this.spinWheel();
    });
  }

  initializeGrid() {
    this.gridContainer.innerHTML = '';
    for (let i = 0; i < 36; i++) {
      const gridItem = document.createElement('div');
      gridItem.className = 'grid-item';
      if (i === 0 || i === 11 || i === 24 || i === 35) {
        gridItem.style.visibility = 'hidden';
      }
      this.gridContainer.appendChild(gridItem);
    }
    this.gridItems = document.querySelectorAll("#grid-container .grid-item");
  }

  handleLogoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.customLogo = e.target.result;
      this.logoSpace.style.backgroundImage = `url(${this.customLogo})`;
      this.logoSpace.style.backgroundSize = 'contain';
      this.logoSpace.style.backgroundPosition = 'center';
      this.logoSpace.style.backgroundRepeat = 'no-repeat';
      this.spinButton.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }

  revealAllLetters() {
    for (let i = 0; i < this.currentWord.length; i++) {
      const gridItem = this.gridItems[this.startPosition + i];
      if (gridItem.textContent === "" && this.currentWord[i] !== " ") {
        gridItem.textContent = this.currentWord[i];
        gridItem.classList.add("revealing");

        setTimeout(() => {
          gridItem.classList.remove("revealing");
          gridItem.classList.add("empty");
        }, 1000);
      }
    }

    document.querySelectorAll(".alphabet-letter").forEach(letter => {
      letter.classList.add("disabled");
      letter.style.display = "none";
    });

    setTimeout(() => {
      this.gameState = "selectingTheme";
      this.updateStatusIndicator();
      this.startGame();
    }, 4000);
  }

  updateRevealButton() {
    if (this.gameState !== "choosingLetter") {
      this.revealButton.disabled = true;
      return;
    }

    let revealedCount = 0;
    for (let i = 0; i < this.currentWord.length; i++) {
      const gridItem = this.gridItems[this.startPosition + i];
      if (gridItem.textContent !== "" && this.currentWord[i] !== " ") {
        revealedCount++;
      }
    }

    this.revealButton.disabled = revealedCount < 2;
  }

  updateStatusIndicator() {
    this.statusIndicator.setAttribute("data-state", this.gameState);
  }

  getSelectedSection(finalRotation) {
    const normalizedRotation = (360 - (finalRotation % 360)) % 360;

    for (const section of this.WHEEL_SECTIONS) {
      if (normalizedRotation >= section.startAngle && normalizedRotation < section.endAngle) {
        return section;
      }
    }

    return this.WHEEL_SECTIONS[0];
  }

  normalizeLetter(letter) {
    const map = {
      'Ç': 'C', 'ç': 'C',
        'Á': 'A', 'À': 'A', 'Ã': 'A', 'Â': 'A', 'Ä': 'A',
        'á': 'A', 'à': 'A', 'ã': 'A', 'â': 'A', 'ä': 'A',
        'É': 'E', 'È': 'E', 'Ê': 'E', 'Ë': 'E',
        'é': 'E', 'è': 'E', 'ê': 'E', 'ë': 'E',
        'Í': 'I', 'Ì': 'I', 'Î': 'I', 'Ï': 'I',
        'í': 'I', 'ì': 'I', 'î': 'I', 'ï': 'I',
        'Ó': 'O', 'Ò': 'O', 'Õ': 'O', 'Ô': 'O', 'Ö': 'O',
        'ó': 'O', 'ò': 'O', 'õ': 'O', 'ô': 'O', 'ö': 'O',
        'Ú': 'U', 'Ù': 'U', 'Û': 'U', 'Ü': 'U',
        'ú': 'U', 'ù': 'U', 'û': 'U', 'ü': 'U'
      };

      return map[letter] || letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    }

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target.result;
            const parsedData = this.parseCSV(content);

            if (this.validateCSV(parsedData)) {
              this.userDatabase = this.transformCSVData(parsedData);
              this.updateThemeSelector();
              this.updateThemeChangeSelect();
              this.startGameBtn.disabled = false;
              this.themeSelector.disabled = false;
              this.spinButton.disabled = false;
            } else {
              this.showToast('Formato de CSV inválido. Use: Tema;Palavra;Dica', 'error');
            }
          } catch (error) {
            this.showToast('Não foi possível ler o arquivo: ' + error.message, 'error');
          }
        };
        reader.readAsText(file);
      } catch (error) {
        this.showToast('Erro ao processar o arquivo: ' + error.message, 'error');
      }
    }

    parseCSV(content) {
      try {
        const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');
        return lines.map(line => {
          const cleanLine = line.replace(/"/g, '');
          return cleanLine.split(';');
        });
      } catch (error) {
        throw new Error('Formato de CSV inválido');
      }
    }

    validateCSV(data) {
      if (data.length === 0) return false;
      return data.every(row => row.length >= 3);
    }

    transformCSVData(csvData) {
      const themesMap = {};

      csvData.forEach(row => {
        const [theme, word, hint] = row;
        if (word.length <= 12) { // Adicione esta verificação
          if (!themesMap[theme]) {
            themesMap[theme] = {
              theme: theme,
              words: []
            };
          }
          themesMap[theme].words.push({
            word: word.toUpperCase(),
            hint: hint
          });
        } else {
          console.warn(`Palavra "${word}" ignorada por ter mais de 12 caracteres.`);
        }
      });

      return Object.values(themesMap);
    }

    updateThemeSelector() {
      this.themeSelector.innerHTML = '<option value="" disabled selected>Selecione um tema</option>';

      this.userDatabase.forEach((themeData, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = themeData.theme;
        this.themeSelector.appendChild(option);
      });
    }

    updateThemeChangeSelect() {
      this.themeChangeSelect.innerHTML = '<option value="" disabled selected>Selecione um tema</option>';

      this.userDatabase.forEach((themeData, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = themeData.theme;
        this.themeChangeSelect.appendChild(option);
      });
    }

    startGame() {
      try {
        clearInterval(this.countdownInterval);
        this.countdownTimerDisplay.style.opacity = 0;
        this.timerActive = false;
        this.timerButton.disabled = false;

        const themeIndex = this.themeSelector.value;
        if (themeIndex === "") return;

        this.updateScores();
        this.gameState = "spinningWheel";
        this.updateStatusIndicator();
        this.currentTheme = this.userDatabase[themeIndex];

        if (this.usedWords.length === this.currentTheme.words.length) {
          this.usedWords = [];
          this.scores = [0, 0, 0];
          this.showToast("Você completou todas as palavras deste tema! Pontuações resetadas.", "success");
        }

        let randomWordData;
        do {
          randomWordData = this.currentTheme.words[Math.floor(Math.random() * this.currentTheme.words.length)];
        } while (this.usedWords.includes(randomWordData.word) && this.usedWords.length < this.currentTheme.words.length);

        this.usedWords.push(randomWordData.word);
        this.currentWord = randomWordData.word.toUpperCase();
        this.currentHint = randomWordData.hint;
        this.hintText.textContent = this.currentHint;
        this.initializeWordGrid();

        document.querySelectorAll(".alphabet-letter").forEach(letter => {
          letter.classList.remove("disabled");
          letter.style.display = "flex";
        });

        this.currentPlayer = this.nextStartingPlayer;
        this.nextStartingPlayer = (this.currentPlayer % 3) + 1;
        this.setActivePlayer(this.currentPlayer);
        this.spinButton.disabled = false;
        this.isSpinning = false;
        this.revealButton.disabled = true;
        this.countdownTimerDisplay.style.opacity = 0;
        this.saveGame();
      } catch (error) {
        console.error("Erro ao iniciar o jogo:", error);
        this.showToast("Ocorreu um erro ao iniciar o jogo. Por favor, tente novamente.", "error");
      }
    }

    initializeWordGrid() {
      const hiddenWordLength = this.currentWord.length;
      const gridColumns = 12;
      const gridRows = 3;
      const middleRow = Math.floor(gridRows / 2);
      const startColumn = Math.floor((gridColumns - hiddenWordLength) / 2);
      this.startPosition = middleRow * gridColumns + startColumn;

      this.gridItems.forEach(item => {
        item.textContent = "";
        item.classList.remove("empty", "highlight", "revealing");
      });

      for (let i = 0; i < hiddenWordLength; i++) {
        const gridItem = this.gridItems[this.startPosition + i];
        gridItem.classList.add("empty");

        if (this.currentWord[i] === " ") {
          gridItem.textContent = "";
          gridItem.classList.remove("empty");
        }
      }
    }

    checkLetter(letter) {
      try {
        if (this.isSpinning || this.gameState !== "choosingLetter") return;

        const letterElement = document.querySelector(`.alphabet-letter[data-letter="${letter}"]`);
        if (!letterElement || letterElement.classList.contains("disabled")) return;

        this.playSound(this.letterSound);

        let letterFound = false;
        const matchingPositions = [];

        for (let i = 0; i < this.currentWord.length; i++) {
          const normalizedWordLetter = this.normalizeLetter(this.currentWord[i]);
          const normalizedClickedLetter = this.normalizeLetter(letter);
          if (normalizedWordLetter === normalizedClickedLetter) {
            matchingPositions.push(i);
            letterFound = true;
          }
        }

        letterElement.classList.add("disabled");
        letterElement.style.display = "none";

        if (letterFound) {
          this.revealLettersSequentially(letter, matchingPositions);
        } else {
          this.currentPlayer = (this.currentPlayer % 3) + 1;
          this.setActivePlayer(this.currentPlayer);
          this.playSound(this.loseSound);
          this.gameState = "spinningWheel";
          this.updateStatusIndicator();
          this.spinButton.disabled = false;
          this.revealButton.disabled = true; // Corrected: Should be disabled after wrong guess
          this.countdownTimerDisplay.style.opacity = 0;
        }

        this.saveGame();
        this.updateRevealButton();
      } catch (error) {
        console.error("Erro ao verificar letra:", error);
      }
    }

    revealLettersSequentially(letter, positions) {
      if (positions.length === 0) {
        if (this.checkWin()) {
          this.highlightWord();
          const winner = this.currentPlayer;
          const prize = this.scores[winner - 1];
          this.showToast(`Jogador <span class="math-inline">\{winner\} ganhou R</span><span class="math-inline">\{prize\} com a palavra "</span>{this.currentWord}"!`, "success");
          this.playSound(this.winSound);

          setTimeout(() => {
            this.gameState = "selectingTheme";
            this.updateStatusIndicator();
            this.startGame();
          }, 4000);
        } else {
          this.gameState = "spinningWheel";
          this.updateStatusIndicator();
          this.spinButton.disabled = false;
          this.countdownTimerDisplay.style.opacity = 0;
        }
        return;
      }

      const currentPosition = positions.shift();
      const gridItem = this.gridItems[this.startPosition + currentPosition];

      this.playSound(this.blockRevealSound);
      this.playSound(this.letterShowSound);

      gridItem.classList.add("revealing");

      setTimeout(() => {
        gridItem.textContent = this.currentWord[currentPosition];
        this.scores[this.currentPlayer - 1] += this.currentPrize;
        this.updateScores();
      }, 500);

      setTimeout(() => {
        gridItem.classList.remove("revealing");
        gridItem.classList.add("empty");

        setTimeout(() => {
          this.revealLettersSequentially(letter, positions);
        }, 500);
      }, 1000);
    }

    checkWin() {
      for (let i = 0; i < this.currentWord.length; i++) {
        const gridItem = this.gridItems[this.startPosition + i];
        if (gridItem.textContent === "" && this.currentWord[i] !== " ") return false;
      }
      return true;
    }

    highlightWord() {
      for (let i = 0; i < this.currentWord.length; i++) {
        const gridItem = this.gridItems[this.startPosition + i];
        gridItem.classList.add("highlight");
      }
    }

    updateScores() {
      this.scoreValueElements.forEach((scoreElement, index) => {
        scoreElement.textContent = `R$${this.scores[index]}`;
      });
    }

    setActivePlayer(player) {
      this.scoreElements.forEach((scoreElement, index) => {
        if (index + 1 === player) {
          scoreElement.classList.add("active");
        } else {
          scoreElement.classList.remove("active");
        }
      });
    }

    showToast(message, type = 'info') {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
    
      const icons = {
        'success': '💰',
        'warning': '🔄',
        'error': '💥',
        'info': 'ℹ️'
      };
    
      toast.className = `toast toast-${type}`;
      // Modificação aqui: Usar template literals e escapar HTML
      toast.innerHTML = `
          <span class="toast-icon">${icons[type]}</span>
          <span class="toast-message">${this.escapeHTML(message)}</span>
      `;
    
      container.appendChild(toast);
      toast.style.animation = 'none';
      toast.offsetHeight;
      toast.style.animation = null;
    
      setTimeout(() => {
        toast.remove();
      }, 4000);
    }
    
    // Adicione esta função para escapar HTML
    escapeHTML(str) {
      let div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    playSound(sound) {
      if (this.soundEnabled) {
        sound.currentTime = 0;
        sound.play().catch(e => console.error("Erro ao reproduzir som:", e));
      }
    }

    spinWheel() {
      if (this.isSpinning || this.gameState !== "spinningWheel") {
        console.log("spinWheel: Abortando - Jogo ocupado ou estado incorreto", this.gameState, this.isSpinning);
        return;
      }

      this.isSpinning = true;
      this.spinButton.disabled = true;
      this.revealButton.disabled = true;

      this.playSound(this.spinSound);

      const spinDegrees = 1640 + Math.floor(Math.random() * 360);
      this.currentRotation += spinDegrees;
      this.roleta.style.transform = `rotate(${this.currentRotation}deg)`;

      const spinDuration = 6000;

      const finishSpin = () => {
        this.spinSound.pause();
        this.spinSound.currentTime = 0;

        const finalRotation = this.currentRotation % 360;
        const section = this.getSelectedSection(finalRotation);

        if (!section) {
          console.error("spinWheel: Nenhuma seção encontrada para rotação:", finalRotation);
          this.showToast("Ocorreu um erro na roleta. Por favor, gire novamente.", "error");
          this.resetSpinState();
          return;
        }

        this.handleWheelSection(section);
      };

      setTimeout(finishSpin, spinDuration);

      // Clear timer if active
      this.clearCountdownTimer();
    }

    handleWheelSection(section) {
      if (section.type === "pass") {
        this.handlePassTurn();
      } else if (section.type === "lose") {
        this.handleLoseTurn();
      } else {
        this.handleMoneySection(section);
      }
    }

    handlePassTurn() {
      this.currentPrize = 0;
      this.playSound(this.passTurnSound);
      setTimeout(() => {
        this.advancePlayer();
        this.showToast(`Vez do jogador ${this.currentPlayer}`, "warning");
        this.gameState = "spinningWheel";
        this.resetSpinState();
        this.updateStatusIndicator();
        this.saveGame();
      }, 5000);
    }

    handleLoseTurn() {
      this.currentPrize = 0;
      this.playSound(this.loseAllSound);
      setTimeout(() => {
        this.showToast("Você perdeu tudo!", "error");
        this.scores[this.currentPlayer - 1] = 0;
        this.updateScores();
        this.advancePlayer();
        this.gameState = "spinningWheel";
        this.resetSpinState();
        this.updateStatusIndicator();
        this.saveGame();
      }, 5000);
    }

    handleMoneySection(section) {
      this.currentPrize = parseInt(section.value);
      this.showToast(`Você parou em: ${section.text}`, "success");
      this.gameState = "choosingLetter";
      this.resetSpinState();
      this.updateRevealButton();
      this.updateStatusIndicator();
      this.saveGame();
    }

    resetSpinState() {
      this.isSpinning = false;
      this.spinButton.disabled = false;
    }

    advancePlayer() {
      this.currentPlayer = (this.currentPlayer % 3) + 1;
      this.setActivePlayer(this.currentPlayer);
    }

    clearCountdownTimer() {
      clearInterval(this.countdownInterval);
      this.countdownTimerDisplay.style.opacity = 0;
      this.timerActive = false;
      this.timerButton.disabled = false;
    }

    loadGame() {
      try {

      } catch (error) {
        console.error("Erro ao carregar o jogo:", error);
      }
    }
  
    saveGame() {
      try {
       
      } catch (error) {
        console.error("Erro ao salvar o jogo:", error);
      }
    }
  
    startTimer() {
      if (this.timerActive) return;
  
      this.timerActive = true;
      this.timerButton.disabled = true;
  
      this.countdownTime = 10;
      this.countdownTimerDisplay.textContent = this.countdownTime;
      this.countdownTimerDisplay.style.opacity = 1;
  
      this.playSound(this.timerSound);
  
      this.countdownInterval = setInterval(() => {
        this.countdownTime--;
        this.countdownTimerDisplay.textContent = this.countdownTime;
  
        if (this.countdownTime <= 0) {  // Alterado para <= 0
          clearInterval(this.countdownInterval);
          this.endTimer();
        }
      }, 1000);
    }
  
    endTimer() {
      clearInterval(this.countdownInterval);
      this.countdownTimerDisplay.textContent = "0";  // Garante que mostra 0
      this.timerButton.disabled = false;
      this.timerActive = false;
      this.countdownTimerDisplay.style.opacity = 0;
      this.showToast("Tempo esgotado!", "warning");
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    new RodaARodaGame();

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('Service Worker registrado!', reg))
          .catch(err => console.error('Erro ao registrar o SW:', err));
      });
    }
    
  });