#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess --tuples-only -c"

echo "Enter your username:"
read USERNAME

PLAYER_ID=$($PSQL "SELECT player_id FROM players WHERE username='$USERNAME'")
if [[ -z $PLAYER_ID ]]
then
  PLAYER_INSERT_RESULT=$($PSQL "INSERT INTO players(username) VALUES('$USERNAME')")
  PLAYER_ID=$($PSQL "SELECT player_id FROM players WHERE username='$USERNAME'")
  
  echo "Welcome, $USERNAME! It looks like this is your first time here."
else
  GAMES=$($PSQL "SELECT COUNT(*), MIN(number_of_guesses) FROM games INNER JOIN players USING(player_id) WHERE player_id=$PLAYER_ID")
  echo "$GAMES" | while read GAMES_PLAYED BAR BEST_GAME
  do
    echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
  done
fi

SECRET_NUMBER=$((RANDOM % 1000 + 1))
echo "Guess the secret number between 1 and 1000:"
read GUESS

NUMBER_OF_GUESSES=1
while [[ $GUESS -ne $SECRET_NUMBER ]]
do
  if [[ ! $GUESS =~ ^[0-9]+$ ]]
  then
    echo "That is not an integer, guess again:"
  elif [[ $GUESS > $SECRET_NUMBER ]]
  then
    echo "It's lower than that, guess again:"
  else
    echo "It's higher than that, guess again:"
  fi
  read GUESS

  NUMBER_OF_GUESSES=$((NUMBER_OF_GUESSES + 1))
done

echo "You guessed it in $NUMBER_OF_GUESSES tries. The secret number was $SECRET_NUMBER. Nice job!"
GAME_INSERT_QUERY=$($PSQL "INSERT INTO games(player_id, secret_number, number_of_guesses) VALUES($PLAYER_ID, $SECRET_NUMBER, $NUMBER_OF_GUESSES)")