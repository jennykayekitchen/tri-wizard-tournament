import React, { useEffect, useState } from "react";
import step0 from "../images/5point.png";
import step1 from "../images/4point.png";
import step2 from "../images/3point.png";
import step3 from "../images/2point.png";
import step4 from "../images/1point.png";
import step5 from "../images/0point.png";
import { getWord } from "../modules/wordManager";
import { getCurrentUser } from "../modules/userProfileManager";
import { addGamePoints, getTotalPointsByUserId } from "../modules/gameManager";
import { TotalPoints } from "./TotalPoints"
import "./WordGame.css"

export const WordGame = () => {
    const [mistake, setMistake] = useState(0);
    const [guessed, setGuessed] = useState(new Set([]));
    const [answer, setAnswer] = useState(null);
    const [user, setUser] = useState({});
    const [gameStatus, setGameStatus] = useState("playing")

    useEffect(() => {
        if (answer) {
            const remainingLetters = answer
                .split("")
                .filter((letter) => !guessed.has(letter));

            if (mistake > 4) {
                setGameStatus("lost");
            } else if (remainingLetters.length === 0) {
                let finalScore = Math.max(defaultSettings.maxWrong - mistake, 0);
                const addPoints = {
                    userId: parseInt(user?.id),
                    totalPoints: finalScore,
                };

                addGamePoints(addPoints);
                setGameStatus("won")
                    ;
            } else {
                setGameStatus("playing")
            }
        }
    }, [guessed, mistake, answer]);


    useEffect(() => {
        getCurrentUser().then((userData) => {
            setUser(userData);
        });
    }, []);

    const defaultSettings = {
        maxWrong: 5,
        images: [step0, step1, step2, step3, step4, step5],
    };

    useEffect(() => {
        getWord().then((word) => {
            if (word.name.length) {
                setAnswer(word.name.toUpperCase());
            }
        });
    }, []);

    const handleGuess = async (event) => {
        event.preventDefault();
        let letter = event.target.value;
        let copyOfGuessed = new Set(guessed);
        copyOfGuessed.add(letter);
        setGuessed(copyOfGuessed);
        const newMistake = mistake + (answer.includes(letter) ? 0 : 1);
        setMistake(newMistake);

    };

    const generateButtons = () => {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return alphabet
            .split("")
            .map((letter) => (
                <button                    
                    key={letter}
                    value={letter}
                    onClick={event => handleGuess(event)}
                    disabled={guessed.has(letter)}
                >
                    {letter}
                </button>
            ));
    };

    const guessedWord = () => {
        if (answer) {
            return answer.split("").map((letter) => {
                return guessed.has(letter) ? letter : " _ ";
            }).join("");
        }
    };

    const resetButton = () => {
        setMistake(0);
        setGuessed(new Set([]));
        setGameStatus("playing");
        getWord().then((word) => {
            if (word.name.length) {
                setAnswer(word.name.toUpperCase());
            }
        });
    };

    const gameArea = () => {
        if (gameStatus === "won") {
            return <><p>You've guessed the word correctly!</p> 
            <p>{5 - mistake} points to {user?.school?.name}!</p></>
        }

        if (gameStatus === "lost") {
            return <div>
                <p>You have not guessed the correct word.</p>
                <p>No points will be awarded to {user?.school?.name}.</p>
                <p>Correct Word is: {answer}</p>
            </div>
        }

        if (gameStatus === "playing") {
            return <div>
                <p className="word-game-word">{guessedWord()}</p>
                <p className="word-game-btns">{generateButtons()}</p>
            </div>
        }
    }

    return (
        <>
            <div className="word-game-container">
                <div className="word-game-title">Words of the Wizard World!</div>
                <div className="word-game-section">{user?.firstName}'s Current Points</div>
                <TotalPoints userId={user?.id} gameStatus={gameStatus} />
                <div className="gemstones">
                    <img src={defaultSettings.images[mistake]} alt=""></img>
                </div>
                <p>
                    {gameArea()}
                </p>
                <div className="float-right">Wrong Guesses: {mistake} of {defaultSettings.maxWrong}</div>
                <button onClick={resetButton}>
                    Start New Game
                </button>
            </div>
        </>
    )
}
