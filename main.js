

function playGame () {

    let count =document.querySelector('.container').children.length;

    for(let i=0;i<count;i++){    
        const c = document.querySelector('.container').children[i]

        c.setAttribute('id', 'box'+i)
      c.addEventListener("click", function() {
          updateS(i)
      }
      );
    }

    function updateS(i) {
        if(  document.getElementById('box'+i).innerHTML == "X") {
            document.getElementById('box'+i).innerHTML = "O"
        } else if ( document.getElementById('box'+i).innerHTML == "O") {
            document.getElementById('box'+i).innerHTML = "X"
        }
}

}


playGame()