import React, { useEffect, useState } from "react"
import step0 from"./images/gemstone5.png"
import step1 from"./images/gemstone4.png"
import step2 from"./images/gemstone3.png"
import step3 from"./images/gemstone4.png"
import step4 from"./images/gemstone1.png"
import step5 from"./images/gemstone0.png"

export const WordGame = () => {
    const [words, setWords] = useState()
    const [mistake, setMistake] = useState(0)
    const [guessed, setGuessed] = useState(new Set([]))
    const [answer, setAnswer] = useState(randomWord())

    const randomWord = () => {
        return words[Math.floor(Math.random() * hpWords.length)]
    }

    useEffect = () => {
        getWords()
            .then(words => {
                setWords(words)
            })
    }, [editMode]


    const defaultProps = {
        maxWrong: 5,
        images: [step0, step1, step2, step3, step4, step5]
    }

    let gameOver = mistake >= defaultProps.maxWrong

    const handleGuess = (event) => {
        let letter = event.target.value
        setGuessed(guessed.add(letter))
        setMistake(mistake + (answer.includes(letter) ? 0 : 1))
    }

    const generateButtons = () => {
        const alphabet = "abcdefghijklmnopqrstuvwxyz"
        return alphabet.split("").map(letter => (
            <button
                className='btn btn-lg btn-primary m-2'
                key={letter}
                value={letter}
                onClick={handleGuess}
                disabled={guessed.has(letter)}>
                {letter}
            </button>
        ))
    }

    const guessedWord = () => {
        return answer.split("").map(letter => (guessed.has(letter) ? letter : " _ "))
    }
    // const resetButton = () => {
    //     setMistake()
    //     setGuessed()
    //     setAnswer()
    // }

    let gameStat = generateButtons()



    return (
        <>
            <div className="hangman-container">
                <h1 className="text-center">Hangman</h1>
                <div className="float-right">Wrong Guesses: {mistake} of {defaultProps.maxWrong}</div>
                <div className="gemstones">
                    <img src={defaultProps.images[mistake]} alt=""></img>
                </div>
                <div className="text-center">Guess the spell:</div>
                <p>{!gameOver ? guessedWord() : { answer }}</p>
                <p>
                    {gameStat}
                </p>
                {/* <button className="btn btn-info" onClick={resetButton()}>Reset</button> */}
            </div>
        </>
    )
}
