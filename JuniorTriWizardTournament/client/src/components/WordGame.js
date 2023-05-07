import React, { useEffect, useState } from "react";
import step0 from "../images/gemstone5.png";
import step1 from "../images/gemstone4.png";
import step2 from "../images/gemstone3.png";
import step3 from "../images/gemstone2.png";
import step4 from "../images/gemstone1.png";
import step5 from "../images/gemstone0.png";
import { getWord } from "../modules/wordManager";
import "./Hangman.css";
import { getCurrentUser } from "../modules/userProfileManager";
import { addGamePoints, getTotalPointsByUserId } from "../modules/gameManager";
import { TotalPoints } from "./TotalPoints"

export const WordGame = () => {
    const [mistake, setMistake] = useState(0);
    const [guessed, setGuessed] = useState(new Set([]));
    const [answer, setAnswer] = useState("");
    const [user, setUser] = useState({});
    const [isGameOver, setIsGameOver] = useState(false)
    const [gameStatus, setGameStatus] = useState("playing")

    useEffect(() => {
        if (mistake > 4) {
          setGameStatus("lost");
        } else {
          const remainingLetters = answer
            .split("")
            .filter((letter) => !guessed.has(letter) && letter !== " ");
          if (remainingLetters.length === 0) {
            setGameStatus("won");
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
                setAnswer(word.name.toLowerCase());
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
        
        const answerWithoutSpaces = answer.replace(/\s/g, '');
        const correctlyGuessedNonSpaceChars = answerWithoutSpaces.split('').filter(char => guessed.has(char));
        if (correctlyGuessedNonSpaceChars.length === answerWithoutSpaces.length) {
          setGameStatus("won");
        } else if (newMistake > defaultSettings.maxWrong) {
          setGameStatus("lost");
        }
      
        if (gameStatus === "won") {
          let finalScore = Math.max(defaultSettings.maxWrong - newMistake, 0);
      
          // Wait for getCurrentUser to complete before calling addGamePoints
          const userData = await getCurrentUser();
          const addPoints = {
              userId: parseInt(userData?.id),
              totalPoints: finalScore,
          };
          addGamePoints(addPoints);
        }
      };

    useEffect(() => {
        if (gameStatus === "won") {
            let finalScore = Math.max(defaultSettings.maxWrong - mistake, 0);
            const addPoints = {
                userId: parseInt(user?.id),
                totalPoints: finalScore,
            };
            console.log("Before addGamePoints function call");
            addGamePoints(addPoints);
            console.log("After addGamePoints function call");
        }
    }, [gameStatus]);


    const generateButtons = () => {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        return alphabet
            .split("")
            .map((letter) => (
                <button
                    className="btn btn-lg btn-primary m-2"
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
        return answer.split("").map((letter) => {
            if (letter === " ") {
                return "\u00A0";
            } else {
                return guessed.has(letter) ? letter : " _ ";
            }
        }).join(""); // Join the array elements with an empty string
    };

    const resetButton = () => {
        setMistake(0);
        setGuessed(new Set([]));
        setGameStatus("playing");
        getWord().then((word) => {
            if (word.name.length) {
                setAnswer(word.name.toLowerCase());
            }
        });
    };

    return (
        <>
            <div className="hangman-container">
                <h1 className="text-center">Word Game</h1>
                <TotalPoints userId={user?.id} gameStatus={gameStatus} />
                <div className="float-right">Wrong Guesses: {mistake} of {defaultSettings.maxWrong}</div>
                <div className="gemstones">
                    <img src={defaultSettings.images[mistake]} alt=""></img>
                </div>
                <p>
                    {gameStatus === "won" ? (
                        <p>You WIN!</p>
                    ) : gameStatus === "lost" ? (
                        <div>
                            <p>YOU LOSE</p>
                            <p>Correct Word is: {answer}</p>
                        </div>
                    ) : (
                        <div>
                            <p className="Hangman-word">{guessedWord()}</p>
                            <p className="Hangman-btns">{generateButtons()}</p>
                        </div>
                    )}
                </p>
                <button className="btn btn-info" onClick={resetButton}>
                    Start New Game
                </button>
            </div>
        </>
    )
}

