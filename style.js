class CalculadoraMerlina {
    constructor() {
        this.pantalla = document.getElementById('pantalla')
        this.audio = document.getElementById('bloodyMary')
        this.operacionActual = ''
        this.resultadoMostrado = false
        this.inicializarEventos()
    }

    inicializarEventos() {

        document.addEventListener('keydown', this.manejarTeclado.bind(this))
    }



    manejarTeclado(e) {
        const tecla = e.key;
        const teclasValidas = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/']

        if (teclasValidas.includes(tecla)) {
            e.preventDefault()
            this.agregar(tecla)
        } else if (tecla === 'Enter' || tecla === '=') {
            e.preventDefault()
            this.calcular()
        } else if (tecla === 'Backspace') {
            e.preventDefault()
            this.borrarUltimo()
        } else if (tecla === 'Escape' || tecla.toLowerCase() === 'c') {
            e.preventDefault()
            this.borrar()
        }
    }



    agregar(valor) {
        if (this.resultadoMostrado) {
            this.pantalla.value = ''
            this.resultadoMostrado = false
        }
        const ultimoCaracter = this.pantalla.value.slice(-1)
        const esOperador = ['+', '-', '*', '/'].includes(valor)
        const ultimoOperador = ['+', '-', '*', '/'].includes(ultimoCaracter)
        if (esOperador && ultimoOperador) {
            return
        }
        if (valor === '.') {
            const ultimoNumero = this.pantalla.value.split(/[+\-*/]/).pop()
            if (ultimoNumero.includes('.')) {
                return
            }
        }
        this.pantalla.value += valor
        this.pantalla.classList.remove('error')
    }

    borrar() {
        this.pantalla.value = ''
        this.operacionActual = ''
        this.resultadoMostrado = false
        this.pantalla.classList.remove('error')

    }

    borrarUltimo() {
        this.pantalla.value = this.pantalla.value.slice(0, -1)
        this.pantalla.classList.remove('error')
    }

    calcular() {
        try {
            const expresion = this.pantalla.value
            if (!expresion) return
            if (!/^[0-9+\-*/.() ]+$/.test(expresion)) {
                throw new Error('Expresión Inválida')
            }
            const resultado = Function('"use strict"; return(' + expresion + ')')()
            if (!isFinite(resultado)) {
                throw new Error('Resultado Inválido')
            }
            this.pantalla.value = Number.isInteger(resultado) ? resultado : resultado.toFixed(8).replace(/\.?0+$/, '')
            this.resultadoMostrado = true
            this.pantalla.classList.remove('error')

        } catch (error) {
            this.pantalla.value = 'Error'
            this.pantalla.classList.add('error')
            this.resultadoMostrado = true
            setTimeout(() => {
                this.borrar()
            }, 1500)
        }
    }

    reproducir() {
        const boton = document.getElementById('audioBtn')

        if (this.audio.paused) {
            this.audio.play().then(() => {
                boton.textContent = ' ⏸️ Pausar Música'
            }).catch(error => {
                console.error('Error al reproducir Música', error)
                boton.textContent = 'Audio No disponible'
            })
        } else {
            this.audio.pause()
            boton.textContent = ' 🎵 Modo Merlina'
        }
    }
}



const calculadora = new CalculadoraMerlina()

