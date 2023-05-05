import React, { useEffect, useState } from "react"
import step0 from "../images/gemstone5.png"
import step1 from "../images/gemstone4.png"
import step2 from "../images/gemstone3.png"
import step3 from "../images/gemstone2.png"
import step4 from "../images/gemstone1.png"
import step5 from "../images/gemstone0.png"
import { getWord } from "../modules/wordManager"
import "./Hangman.css"
import { getCurrentUser, updateUserProfile } from "../modules/userProfileManager"

export const WordGame = () => {
    const [mistake, setMistake] = useState(0)
    const [guessed, setGuessed] = useState(new Set([]))
    const [answer, setAnswer] = useState("")
    const [user, setUser] = useState({})
    

    useEffect(() => {
        getCurrentUser()
            .then(userData => {
                setUser(userData)
            })
    }, [answer])

    const defaultSettings = {
        maxWrong: 5,
        images: [step0, step1, step2, step3, step4, step5]
    }

    useEffect(() => {
        getWord().then((word) => {
            if (word.name.length) {
                setAnswer(word.name.toLowerCase())
            }
        });
    }, [])

    const handleGuess = (event) => {
        let letter = event.target.value
        let copyOfGuessed = new Set(guessed)
        copyOfGuessed.add(letter)
        setGuessed(copyOfGuessed)
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
        return answer.split("").map((letter) => {
            if (letter === " ") {
                return "\u00A0";
            } else {
                return guessed.has(letter) ? letter : " _ ";
            }
        })
    };

    const resetButton = () => {
        setMistake(0)
        setGuessed(new Set([]))
        getWord().then((word) => {
            if (word.name.length) {
                setAnswer(word.name.toLowerCase());
            }
        });
    }

    let points = 5 - mistake 

    const handleGameOver = () => {
        const addPoints = {
            id: user?.id,
            firebaseUserId: user?.firebaseUserId,
            firstName: user?.firstName,
            lastName: user?.lastName,
            emailAddress: user.emailAddress,
            totalPoints: user?.totalPoints + points,
        }

        updateUserProfile(addPoints)
    }

    return (
        <>
            <div className="hangman-container">
                <h1 className="text-center">Word Game</h1>
                <div>Total Points: {user?.totalPoints}</div>

                <div className="float-right">Wrong Guesses: {mistake} of {defaultSettings.maxWrong}</div>
                <div className="gemstones">
                    <img src={defaultSettings.images[mistake]} alt=""></img>
                </div>
                <p>{guessedWord().indexOf(" _ ") == -1
                    ? <p>You WIN!{handleGameOver()}</p>
                    : (mistake > 4
                        ?
                        <div>
                            <p>YOU LOSE {handleGameOver()}</p>
                            <p>Correct Word is: {answer}</p>
                        </div>
                        :
                        <div>
                            <p className='Hangman-word'>{guessedWord()}</p>
                            <p className='Hangman-btns'>{generateButtons()}</p>
                        </div>)
                }
                </p>
                <button className="btn btn-info" onClick={resetButton}>Start New Game</button>
            </div>
        </>
    )
}

