//references to dom elements

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");

//Event Listener
prevBtn.addEventListener("click", goPrevPage); //quando clicamos no prev chama a funcao e recua de pagina
nextBtn.addEventListener("click", goNextPage);//quando clicamos no prev chama a funcao e avança a pagina


//Bussiness logic
let currentLocation = 1; //pagina que estamos
let numOfPapers = 3 ; //maximo de paginas 
let maxLocation = numOfPapers + 1 ; //localizacao maxima = numero de paginas + 1

function openBook(){ //funcao abrir o livro
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";

}

function closeBook (isAtBeinning){//funcao fechar o livro
    if(isAtBeinning){
        book.style.transform = "translateX(0%)";
    }else{
        book.style.transform = "translateX(100%)";
    }

    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage (){//funcao avancar pagina
 if(currentLocation < maxLocation) { 
    switch(currentLocation){
        case 1: 
            openBook();
            paper1.classList.add("flipped");
            paper1.style.zIndex = 1 ;
            break;
        case 2: 
            paper2.classList.add("flipped");
            paper2.style.zIndex = 2 ;
            break;
        case 3: 
            paper3.classList.add("flipped");
            paper3.style.zIndex = 3 ;
            closeBook(false);
            break;
            default:
                throw new Error ("unknow state");
    }
    currentLocation ++ ;
 }
}

function goPrevPage() {//funcao recuar pagina
 if(currentLocation>1) {
    switch(currentLocation){
        case 2:
            closeBook(true);
            paper1.classList.remove("flipped");
            paper1.style.zIndex = 3 ;
            break;

        case 3:
            paper2.classList.remove("flipped");
            paper2.style.zIndex = 2 ;
            break;

        case 4:
            openBook();
            paper3.classList.remove("flipped");
            paper3.style.zIndex = 1 ;
            break;
            default:
                throw new Error ("unknow state");
    }
    currentLocation--;
 }
}
// Adiciona listeners para eventos de toque
book.addEventListener("touchstart", handleTouchStart, false);
book.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;

// Função para registrar a posição inicial do toque
function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    xDown = firstTouch.clientX;
}

// Função para determinar a direção do gesto de deslizamento
function handleTouchMove(event) {
    if (!xDown) {
        return;
    }

    let xUp = event.touches[0].clientX;
    let xDiff = xDown - xUp;

    if (xDiff > 0) { // Desliza para a esquerda
        goNextPage();
    } else { // Desliza para a direita
        goPrevPage();
    }

    xDown = null;
}

