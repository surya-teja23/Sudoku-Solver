let board = document.querySelector("#board");
      let solvebtn = document.querySelector("#solve");
      let squares = 81;
      let submisionData = [];
      for (let i = 0; i < 81; i++) {
        let element = document.createElement("input");
        element.setAttribute("type", "number");
        element.setAttribute("min", "1");
        element.setAttribute("max", "9");
        board.appendChild(element);
      }

      function joinValues() {
        let inputs = document.querySelectorAll("input");
        inputs.forEach((input) => {
          if (input.value) {
            submisionData.push(parseInt(input.value));
          } else {
            submisionData.push(0);
          }
        });
      }

      function populateValues(response) {
        let inputs = document.querySelectorAll("input");
        inputs.forEach((input, i) => {
          input.value = response.answer[i];
          input.setAttribute("disabled", "disabled");
        });
      }

      function resultError() {
        document.querySelector("#result").innerHTML = "Error in inputs";
      }

      function solve() {
        joinValues();
        let input = `{"input":[${submisionData}]}`;
        const options = {
          method: "POST",
          url: "https://sudoku-solver3.p.rapidapi.com/sudokusolver/",
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key":
              "d24ff95c86msh128221fb5a467ccp19fea6jsn5d5a9f6da162",
            "X-RapidAPI-Host": "sudoku-solver3.p.rapidapi.com",
          },
          data: input,
        };

        axios
          .request(options)
          .then(function (response) {
            populateValues(response.data);
          })
          .catch(function (error) {
            resultError();
          });
        console.log;
      }